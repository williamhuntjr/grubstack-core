import { AxiosInstance } from 'axios'
import { bindAllInstanceMethods } from 'common/utils/object.utils'
import { IMediaLibraryService } from './media-library.types'

export class MediaLibraryService implements IMediaLibraryService {
  constructor(private readonly httpClient: AxiosInstance) {
    bindAllInstanceMethods(this)
  }

  public async getAll(): Promise<void> {
    await this.httpClient.get('/')
  }
}