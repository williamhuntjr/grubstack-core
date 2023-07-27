import { appConfig } from 'common/config'
import { IMediaLibraryFile } from './media-library.types'

export function generateMediaFileUrl(file: IMediaLibraryFile): string {
  return `${appConfig.cdnUrl}/${appConfig.tenantId}/${file.name}`
}