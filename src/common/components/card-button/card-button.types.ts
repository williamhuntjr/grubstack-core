export interface ICardButton {
  onClick(): void
  title: string
  description: string
  icon: JSX.Element
  responsive?: boolean
}