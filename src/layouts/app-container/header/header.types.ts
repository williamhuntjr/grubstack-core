export interface IHeaderAction {
  name: string
  label: string
  icon: string
}
export interface IHeaderStateValues {
  actions: IHeaderAction[]
}
export interface IHeaderState {
  value: IHeaderStateValues
  status: string
}
export interface IHeader {
  onToggle(): void
  sidebarOpen: boolean
}