import { Overwrite } from 'utility-types'
import { Injector } from 'core/injector/injector.service'
import { moduleHookResolver } from 'core/react-lazy-modules/react-lazy-modules.utils'
import { LazyModulesService } from 'core/react-lazy-modules/react-lazy-modules.service'
import { 
  IReportModuleService,
  ReportModule,
  ReportModuleDefinition
} from './reports.module'
import { reportServiceToken } from './reports.constants'
import { IReportService } from './reports.types'

function resolveReportModule(): Overwrite<ReportModuleDefinition, IReportModuleService> {
  const ReportService = Injector.resolve<IReportService>(reportServiceToken)

  const module = LazyModulesService.resolveModule<ReportModuleDefinition>(ReportModule)

  return {
    ...module,
    ReportService,
  }
}

export const useRestaurantModule = moduleHookResolver(resolveReportModule)
