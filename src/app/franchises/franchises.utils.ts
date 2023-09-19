import { IFranchise, IFranchiseCardItem } from './franchises.types'

export function normalizeData(data: IFranchise[]): IFranchiseCardItem[] {
  return data.map((item) => ({
    ...item,
    id: item.id ?? '',
    description: item.description
  }))
}