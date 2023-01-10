import { IModuleDefinition } from './react-lazy-modules.types'

export type ModuleResolver<Definition extends IModuleDefinition> = () => Definition

export function moduleHookResolver<Definition extends IModuleDefinition>(resolver: ModuleResolver<Definition>): ModuleResolver<Definition> {
  let cachedDefinition: Definition | null = null

  return () => {
    if (cachedDefinition) {
      return cachedDefinition
    }
    cachedDefinition = resolver()
    return cachedDefinition
  }
}
