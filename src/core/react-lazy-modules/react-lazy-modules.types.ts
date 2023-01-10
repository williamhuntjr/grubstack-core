import { ComponentType } from 'react'

export type IsNeverType<T> = [T] extends [never] ? true : false

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IModuleDefinition {
  [key: string]: any
}

export interface IModule<Definition extends IModuleDefinition = IModuleDefinition> {
  /**
   * Module name. Should be unique.
   */
  name: string
  /**
   * Module resolver, Function that returns module definition object - module exports.
   */
  resolver: () => Definition
  /**
   * Initializer is run after module and its dependencies are loaded. Can be used for services registration in IoC container.
   * @param definition - module definition returned by resolver
   */
  initializer?: (definition: Definition) => void
  /**
   * Module dependencies
   */
  dependencies: IModule<any>[]
}

export interface ILazyModule<Definition extends IModuleDefinition = IModuleDefinition> {
  name: string
  resolver: () => Promise<Definition>
  initializer?: (definition: Definition) => void | Promise<void>
  dependencies: Array<ILazyModule<any> | IModule<any>>
}

export interface ILazyRoutingModule extends ILazyModule<ComponentType> {
  path: string
}

export interface ILazyModulesService {
  loadModule(module: IModule): void
  loadAsyncModule<Definition extends IModuleDefinition>(module: ILazyModule<Definition>): Promise<Definition>
  resolveModule<Definition extends IModuleDefinition>(module: string): Definition
  resolveModule<Definition extends IModuleDefinition>(module: ILazyModule<Definition> | IModule<Definition>): Definition
}
