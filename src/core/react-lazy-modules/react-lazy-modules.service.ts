// eslint-disable-next-line max-classes-per-file
import { nanoid } from 'nanoid'
import { ILazyModule, IModuleDefinition, ILazyModulesService, IModule } from './react-lazy-modules.types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface IRetrievedModuleToLoad<Module extends IModule<any> | ILazyModule<any>> {
  module: Module
  order: number
}

class LoadedModule {
  constructor(public readonly name: string, public readonly definition: IModuleDefinition) {}
}

// TODO cover with unit tests
class Service implements ILazyModulesService {
  public readonly ID: string = nanoid() // TODO remove me
  private readonly loadedModules: Map<string, LoadedModule> = new Map<string, LoadedModule>()

  public loadModule<Definition extends IModuleDefinition>(module: IModule<Definition>): Definition {
    const loadedModule = this.loadedModules.get(module.name)
    if (loadedModule) {
      return loadedModule.definition as Definition
    }
    return this.loadModuleWithDependencies(module)
  }

  public async loadAsyncModule<Definition extends IModuleDefinition>(module: ILazyModule<Definition>): Promise<Definition> {
    const loadedModule = this.loadedModules.get(module.name)
    if (loadedModule) {
      return loadedModule.definition as Definition
    }
    return this.loadAsyncModuleWithDependencies<Definition>(module)
  }

  public resolveModule<Definition extends IModuleDefinition>(module: ILazyModule<Definition> | IModule<Definition> | string): Definition {
    const name = this.isModule<Definition>(module) ? module.name : module
    const loadedModule = this.loadedModules.get(name)
    if (!loadedModule) {
      throw new Error(`Module ${name} is not loaded yet.`)
    }
    return loadedModule.definition as Definition
  }

  /**
   * Loads a module with all its dependencies
   * @param module - module to load
   * @private
   * @return definition [Definition] - returns module definition
   */
  private loadModuleWithDependencies<Definition extends IModuleDefinition>(module: IModule<Definition>): Definition {
    const retrievedModules = this.retrieveModulesToLoad<IModule<Definition>, Definition>(module)

    const rootModule = retrievedModules[retrievedModules.length - 1][0]

    for (let i = 0; i < retrievedModules.length - 1; i++) {
      retrievedModules[i].forEach((retrievedModule) => {
        const definition = retrievedModule.resolver()
        if (typeof retrievedModule.initializer === 'function') {
          retrievedModule.initializer(definition)
        }
        this.loadedModules.set(retrievedModule.name, new LoadedModule(retrievedModule.name, definition))
      })
    }
    const definition = rootModule.resolver()
    if (typeof rootModule.initializer === 'function') {
      rootModule.initializer(definition)
    }
    this.loadedModules.set(rootModule.name, new LoadedModule(rootModule.name, definition))
    return definition
  }

  /**
   * Loads a module with all its dependencies
   * @param module - module to load
   * @private
   * @return definition [Definition] - returns module definition
   */
  private async loadAsyncModuleWithDependencies<Definition extends IModuleDefinition>(
    module: ILazyModule<Definition>
  ): Promise<Definition> {
    const retrievedModules = this.retrieveModulesToLoad<ILazyModule<Definition>, Definition>(module)

    const rootModule = retrievedModules[retrievedModules.length - 1][0]

    for (let i = 0; i < retrievedModules.length - 1; i++) {
      // eslint-disable-next-line no-await-in-loop
      await Promise.all(
        retrievedModules[i].map(async (retrievedModule) => {
          const definition = await retrievedModule.resolver()
          if (typeof retrievedModule.initializer === 'function') {
            await retrievedModule.initializer(definition)
          }
          this.loadedModules.set(retrievedModule.name, new LoadedModule(retrievedModule.name, definition))
        })
      )
    }
    const definition = await rootModule.resolver()
    if (typeof rootModule.initializer === 'function') {
      await rootModule.initializer(definition)
    }
    this.loadedModules.set(rootModule.name, new LoadedModule(rootModule.name, definition))
    return definition
  }

  /**
   * Parses module dependencies tree to define modules to load and the most efficient loading order.
   * Returns array that defines the loading order (ascending). Each element in the array is array of modules to be loaded.
   * The idea is to find all modules that can be loaded simultaneously to increase the loading time.
   * Example:
   * Module A depends on modules B, C, F and Q: A ->  [B, C, F, Q]
   * Module B depends on D and C: B -> [D, C]
   * Module C depends on D and E: C -> [D, E]
   * Module D depends on F: D -> [F]
   * Module Q depends on E: Q -> [E]
   * As the function result we should get the following: [[F, E], [D, Q], [C], [B], [A]]
   * Module
   * @param module - root module to be loaded
   * @private
   * @return modulesArray [Array<Array<ILazyModule>>] -
   */
  private retrieveModulesToLoad<Module extends ILazyModule<Definition> | IModule<Definition>, Definition extends IModuleDefinition>(
    module: Module
  ): Array<Array<Module>> {
    const retrievedModules = new Map()
    this.resolveModuleDependencies<Module, Definition>(module, retrievedModules)
    return Array.from(retrievedModules.values()).reduce((res, value) => {
      if (Array.isArray(res[value.order])) {
        res[value.order].push(value.module)
      } else {
        res[value.order] = [value.module]
      }
      return res
    }, [])
  }

  /**
   * Parses module dependencies tree to define modules to load and the most efficient loading order.
   * Order 0 means that module will be loaded first and so on.
   * For example, modules in the tree that have no dependencies will be loaded first (order = 0), then modules that depends on them and so on.
   * @param module - root module to be loaded
   * @param retrievedModules - Map structure that contains all the modules needed to be loaded and the loading order. The parameter is mutated during function execution.
   * @private
   */
  private resolveModuleDependencies<Module extends ILazyModule<Definition> | IModule<Definition>, Definition extends IModuleDefinition>(
    module: Module,
    retrievedModules: Map<string, IRetrievedModuleToLoad<Module>>
  ): number {
    const retrievedModule = retrievedModules.get(module.name)
    if (retrievedModule) {
      return retrievedModule.order
    }
    // If a module doesn't have any dependencies, it's added with highest loading priority to be loaded first.
    if (!module.dependencies.length) {
      retrievedModules.set(module.name, { module, order: 0 })
      return 0
    }
    let maxDepth = 0
    let allDepsLoaded = true
    module.dependencies.forEach((dependency) => {
      if (this.isLoadedModule(dependency)) {
        return
      }
      allDepsLoaded = false
      const dependencyModuleDepth = this.resolveModuleDependencies(dependency, retrievedModules)
      maxDepth = Math.max(maxDepth, dependencyModuleDepth)
    })
    // We should set the order to "0" in case all the module dependencies have been already loaded.
    // Otherwise we increment maxDepth to correctly set the loading order.
    const order = allDepsLoaded ? 0 : maxDepth + 1
    retrievedModules.set(module.name, { module, order })
    return order
  }

  private isLoadedModule<Definition extends IModuleDefinition>({ name }: ILazyModule<Definition> | IModule<Definition>): boolean {
    return this.loadedModules.has(name)
  }

  private isModule<Definition extends IModuleDefinition>(
    module: ILazyModule<Definition> | IModule<Definition> | string
  ): module is ILazyModule<Definition> | IModule<Definition> {
    return typeof module === 'object' && 'name' in module && 'resolver' in module
  }
}

export const LazyModulesService: ILazyModulesService = new Service()
