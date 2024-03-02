import { createClient, type EntryCollection, type Entry } from 'contentful';
import type {
  ContentfulAddress,
  ContentfulRestaurant
} from '../types/Contentful.js';
import type { IAddress, IRestaurant } from '../types/Restaurant.js';

const deriveToken = (preview: boolean): string => {
  const accessToken = preview
    ? import.meta.env.VITE_CONTENTFUL_PREVIEW_TOKEN
    : import.meta.env.VITE_CONTENTFUL_TOKEN;
  return accessToken;
};

const hasMultipleLocations = (locations: any) => {
  return locations && locations.length > 1;
};

const preview = import.meta.env.VITE_CONTENTFUL_PREVIEW;
const accessToken = deriveToken(preview);

const host = preview
  ? import.meta.env.VITE_CONTENTFUL_PREVIEW_HOST
  : import.meta.env.VITE_CONTENTFUL_HOST;

const client = createClient({
  space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
  accessToken,
  host
});

export async function getRestaurants(): Promise<IRestaurant[]> {
  const result: EntryCollection<ContentfulRestaurant> =
    await client.getEntries<ContentfulRestaurant>({
      content_type: 'restaurant'
    });

  return result.items.map((i: Entry<ContentfulRestaurant>) => {
    const { id } = i.sys;
    const { name, position, restaurantType, website, menu } = i.fields;
    const { city, country, street, zip } = i.fields.address.fields; // fails on multiple addresses

    const multipleAddresses = hasMultipleLocations(i.fields.locations);

    const locations: IAddress[] = multipleAddresses
      ? i.fields.locations.map((location: ContentfulAddress) => {
          const { city, country, street, zip, position } = location.fields;
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
