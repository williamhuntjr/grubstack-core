import { IMenu } from 'app/products/menus/menus.types'
import { IGrubListItem } from 'common/components/grub-list/grub-list.types'

export function normalizeMenuData(data: IMenu[]): IGrubListItem[] {
  return data.map((item) => ({
    value: item.id ?? '',
    label: `${item.name} - ${item.description}`
  }))
}