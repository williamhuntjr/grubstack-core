import { IStore, IStoreCardItem } from './stores.types'

export function normalizeData(data: IStore[]): IStoreCardItem[] {
  return data.map((item) => ({
    ...item,
    id: item.id ?? '',
    description: item.address1,
  }))
}