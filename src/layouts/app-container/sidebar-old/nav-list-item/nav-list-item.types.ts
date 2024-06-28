import { IRoute } from 'common/routing/routing.types'

export interface INavListItem {
  route: IRoute
  onClick(): void
}
