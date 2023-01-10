export interface IConvertedMode {
  isViewMode: boolean
  isEditMode: boolean
  isNewMode: boolean
}

export enum GSMode {
  New = 'New',
  View = 'View',
  Edit = 'Edit',  
}