export interface IImageData {
 title: string
 url: string
}

export interface IImagePicker {
  items: IImageData[]
  columns: number
  rowHeight: number
  listHeight: number
}
