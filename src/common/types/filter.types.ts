export enum FranchiseFilter {
  'ShowStores' = 'showStores'
}

export interface IFranchiseFilters {
  [FranchiseFilter.ShowStores]?: boolean
}

export enum StoreFilter {
  'ShowMenus' = 'showMenus',
  'ShowItems' = 'showItems'
}

export interface IStoreFilters {
  [StoreFilter.ShowMenus]?: boolean
  [StoreFilter.ShowItems]?: boolean
}