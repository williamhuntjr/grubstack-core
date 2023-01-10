export interface IBuilderService {
  updateIngredients(sid: string): Promise<void>
}