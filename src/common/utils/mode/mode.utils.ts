import { IConvertedMode, GSMode } from './mode.types'

export function convertMode(mode: GSMode): IConvertedMode {
  const isNewMode = mode === GSMode.New
  const isEditMode = mode === GSMode.Edit
  const isViewMode = mode === GSMode.View
  return { isViewMode, isEditMode, isNewMode }
}
