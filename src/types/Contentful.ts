export interface ContentfulRestaurant {
  address: ContentfulAddress;
  name: string;
  position: { lon: number; lat: number };
  restaurantType: string[];
  website: string;
}

export interface ContentfulAddress {
  fields: {
    city: string;
    country: string;
    street: string;
    zip: string;
  };
}
