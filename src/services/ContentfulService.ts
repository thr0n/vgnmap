import contentful, { EntryCollection } from "contentful";
import type { ContentfulRestaurant } from "../types/Contentful";
import type { IRestaurant } from "../types/Restaurant";

const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_TOKEN,
});

export async function getRestaurants(): Promise<IRestaurant[]> {
  const result: EntryCollection<ContentfulRestaurant> = await client.getEntries<ContentfulRestaurant>({
    content_type: "restaurant",
  });

  return result.items.map((i) => {
    const { name, position, restaurantType, website, menu } = i.fields;
    const { city, country, street, zip } = i.fields.address.fields;
    return {
      address: {
        city,
        country,
        street,
        zip,
      },
      name,
      position: [position.lat, position.lon], // TODO use object
      restaurantType,
      website,
      menu,
    };
  });
}
