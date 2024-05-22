import { ILazyModule } from 'core/react-lazy-modules/react-lazy-modules.types'
import { Injector } from 'core/injector/injector.service'
import { httpClientToken, IHttpClient } from 'core/services/http-client'
import { Scope } from 'core/injector/injector.types'
import { CoreModule } from 'core/core.module'
import {
  reportModule,
  reportServiceToken
} from './reports.constants'
import { IReportService } from './reports.types'

export type ReportModuleDefinition = typeof import('./reports.exports')

export interface IReportModuleService {
  ReportService: IReportService
}

export const ReportModule: ILazyModule<ReportModuleDefinition> = {
  name: reportModule,
  resolver: () => import('./reports.exports'),
  initializer: ({
    ReportService
  }) => {
    const httpClient = Injector.resolve<IHttpClient>(httpClientToken)
    Injector.register<IReportService>(reportServiceToken, () => new ReportService(httpClient), Scope.Singleton)
  },
  dependencies: [CoreModule],
}
