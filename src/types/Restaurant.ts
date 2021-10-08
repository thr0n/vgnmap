export type RestaurantPosition = [number, number];

export interface RestaurantProps {
  name: string;
  position: RestaurantPosition;
  veganOnly?: boolean;
  website?: string;
  city: string;
}
