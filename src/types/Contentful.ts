export type ContentfulRestaurant = {
  fields: any;
  contentTypeId: any;
  address: ContentfulAddress;
  locations: ContentfulAddress[];
  name: string;
  position: { lon: number; lat: number };
  restaurantType: string[];
  website: string;
  menu: string[];
  multipleAddresses: boolean;
  sys: {
    id: string;
  };
};

export interface ContentfulAddress {
  fields: {
    city: string;
    country: string;
    street: string;
    zip: string;
    position: { lon: number; lat: number };
  };
}
