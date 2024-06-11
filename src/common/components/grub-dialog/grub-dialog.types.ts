export interface IGrubDialog {
  title: string
  open: boolean
  className?: string
  onClose(): void
}