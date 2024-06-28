export enum ItemFormField {
  Price = 'price',
  SalePrice = 'sale_price',
  OnSale = 'is_onsale',
}

export enum ItemFormLabel {
  Price = 'Item Price',
  SalePrice = 'Sale Price',
  OnSale = 'Item is currently on sale',
}

export const defaultItemFormData = {
  [ItemFormField.Price]: 0.0,
  [ItemFormField.SalePrice]: 0.0,
  [ItemFormField.OnSale]: false,
}
