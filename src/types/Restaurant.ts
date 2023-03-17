export type RestaurantPosition = [number, number];

export class IRestaurant {
  id: string;
  address: IAddress;
  name: string;
  position: RestaurantPosition;
  restaurantType: string[];
  website: string;
  menu: string[];
  locations?: IAddress[];
  multipleAddresses?: boolean = false;
}

export interface IAddress {
  city: string;
  country: string;
  street: string;
  zip: string;
  position?: RestaurantPosition;
}

export type RestaurantTypeLabel = 'omnivore' | 'vegetarian' | 'vegan';
