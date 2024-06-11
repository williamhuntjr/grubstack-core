export interface ITabPanel {
  tabs: ITab[]
  currentTab?: string
  label?: string
}

export interface ITab {
  name: string
  component: React.FC<{}>
  path?: string
}

export interface ITabPanelProps {
  children?: React.ReactNode
  name: string
  value: string|undefined
}