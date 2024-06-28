import { AxiosInstance } from 'axios'
import { bindAllInstanceMethods } from 'common/utils/object.utils'
import { IPaginationData, IPaginationParams, IPaginationResponse } from 'common/types'
import { prepareRequestParams } from 'common/utils/request.utils'
import { IMediaLibraryFile, IMediaLibraryService } from './media-library.types'

export class MediaLibraryService implements IMediaLibraryService {
  constructor(private readonly httpClient: AxiosInstance) {
    bindAllInstanceMethods(this)
  }

  public async getAll(paginationParams: IPaginationParams): Promise<IPaginationData<IMediaLibraryFile>> {
    const params = prepareRequestParams(paginationParams)
    const {
      data: { data, status },
    } = await this.httpClient.get<IPaginationResponse<IMediaLibraryFile>>('/media-library', { params })
    return {
      data: Array.isArray(data) ? data : [],
      total: status.totalrowcount,
      pages: status.totalpages,
    }
  }

  public async uploadFiles(fileList: FileList): Promise<void> {
    for (const file of Object.values(fileList)) {
      const formData = new FormData()
      formData.append('file', file)
      await this.httpClient.post('/media-library', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    }
  }

  public async delete(fileId: string): Promise<void> {
    await this.httpClient.delete<Promise<void>>(`/media-library/${fileId}`)
  }
}
