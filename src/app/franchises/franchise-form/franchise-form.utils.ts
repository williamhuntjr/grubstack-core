import { IStore } from 'app/stores/stores.types'
import { IGrubListItem } from 'core/components/grub-list/grub-list.types'

export function normalizeStoreData(data: IStore[]): IGrubListItem[] {
  return data.map((item) => ({
    value: item.id ?? '',
    label: `${item.name} - ${item.address1}`
  }))
}