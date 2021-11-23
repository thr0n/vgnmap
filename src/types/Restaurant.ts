export type RestaurantPosition = [number, number];

export interface IRestaurant {
  address: IAddress;
  name: string;
  position: RestaurantPosition;
  restaurantType: string[];
  website: string;
  menu: string[];
}

export interface IAddress {
  city: string;
  country: string;
  street: string;
  zip: string;
}
