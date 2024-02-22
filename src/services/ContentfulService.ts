import { EntryCollection, createClient } from 'contentful';
import type {
  ContentfulAddress,
  ContentfulRestaurant
} from '../types/Contentful';
import type { IAddress, IRestaurant } from '../types/Restaurant';

const preview = process.env.CONTENTFUL_PREVIEW;

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: preview
    ? process.env.CONTENTFUL_PREVIEW_TOKEN
    : process.env.CONTENTFUL_TOKEN,
  host: preview
    ? process.env.CONTENTFUL_PREVIEW_HOST
    : process.env.CONTENTFUL_HOST
});

const hasMultipleLocations = (locations) => {
  return locations && locations.length > 1;
};

export async function getRestaurants(): Promise<IRestaurant[]> {
  const result: EntryCollection<ContentfulRestaurant> =
    await client.getEntries<ContentfulRestaurant>({
      content_type: 'restaurant'
    });

  return result.items.map((i) => {
    const { id } = i.sys;
    const { name, position, restaurantType, website, menu } = i.fields;
    const { city, country, street, zip } = i.fields.address.fields; // fails on multiple addresses

    const multipleAddresses = hasMultipleLocations(i.fields.locations);
    console.log(i.fields.locations)

    const locations: IAddress[] = multipleAddresses
      ? i.fields.locations.map((location: ContentfulAddress) => {
          const { city, country, street, zip, position } = location.fields;
          console.log(location.fields)
          console.log(location.fields.position)
          return {
            city,
            country,
            street,
            zip,
            position: [position.lat, position.lon]
          };
        })
      : null;

    return {
      id,
      address: {
        city,
        country,
        street,
        zip
      },
      locations,
      name,
      position: [position.lat, position.lon], // TODO use object
      restaurantType,
      website,
      menu,
      multipleAddresses
    };
  });
}
