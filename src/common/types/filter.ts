export enum RestaurantFilter {
  'ShowMenus' = 'showMenus',
  'ShowItems' = 'showItems',
}

export interface IRestaurantFilters {
  [RestaurantFilter.ShowMenus]?: boolean
  [RestaurantFilter.ShowItems]?: boolean
}
