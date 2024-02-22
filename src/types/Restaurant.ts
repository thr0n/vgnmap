export type RestaurantPosition = [number, number];

export type IRestaurant = {
  id: string;
  address: IAddress;
  name: string;
  position: RestaurantPosition;
  restaurantType: string[];
  website: string;
  menu: string[];
  locations?: IAddress[];
  multipleAddresses?: boolean;
};

export interface IAddress {
  city: string;
  country: string;
  street: string;
  zip: string;
  position?: RestaurantPosition;
}

export type RestaurantTypeLabel = 'omnivore' | 'vegetarian' | 'vegan';
