import React, { FC, ChangeEvent, useCallback, useState, useEffect } from 'react'
import { Loading } from 'core/components/loading/loading'
import { IPaginationData } from 'common/common.types'
import { CardList } from 'core/components/card-list/card-list'
import { useCoreModule } from 'core/core-module-hook'
import { useProductModule } from 'app/products/products-module-hook'
import { BuilderTypes } from 'app/builder/builder.constants'
import { IItem } from 'app/products/items/items.types'
import { IMenu } from 'app/products/menus/menus.types'
import { IIngredient } from 'app/products/ingredients/ingredients.types'
import { IBuilderDialog, IBuilderDialogState } from './builder-dialog.types'
import { defaultBuilderDialogState, builderDialogPageSize } from './builder-dialog.constants'
import styles from './builder-dialog.module.scss'

export const BuilderDialog: FC<IBuilderDialog> = ({ builderType, onClick }) => {
  const [state, setState] = useState<IBuilderDialogState>(defaultBuilderDialogState)

  const { ItemService, MenuService, IngredientService, VarietyService } = useProductModule()
  const { ErrorHandler } = useCoreModule()

  const onPageChange = (event: ChangeEvent<unknown>, newPage: number): void => {
    setState((prevState) => ({ ...prevState, page: newPage, event: event }))
  }

  const fetchData = useCallback(async(): Promise<void> => {
    setState((prevState) => ({ ...prevState, isLoading: true }))
    try {
      let resp:IPaginationData<IItem>|IPaginationData<IMenu>|IPaginationData<IIngredient>
      if (builderType === BuilderTypes.Item) {
        resp = await ItemService.getAll({limit: builderDialogPageSize, page: state.page})
      }
      if (builderType === BuilderTypes.Ingredient) {
        resp = await IngredientService.getAll({limit: builderDialogPageSize, page: state.page})
      }
      if (builderType === BuilderTypes.Menu) {
        resp = await MenuService.getAll({limit: builderDialogPageSize, page: state.page})
      }
      if (builderType === BuilderTypes.Variety) {
        resp = await VarietyService.getAll({limit: builderDialogPageSize, page: state.page})
      }
      setState((prevState) => ({ ...prevState, data: resp.data, total: resp.total, pages: Math.ceil(resp.total / builderDialogPageSize )}))
    } catch (e) {
      ErrorHandler.handleError(e as Error)
    }
    setState((prevState) => ({ ...prevState, isLoading: false }))
  }, [state.page, ErrorHandler, ItemService, MenuService, IngredientService, builderType, VarietyService])

  // eslint-disable-next-line
  useEffect(() => void fetchData(), [])


  useEffect(() => {
    void fetchData()
  // eslint-disable-next-line
  }, [state.page])

  return (
    <div className={styles.builderDialogContainer}>
      {state.isLoading &&  <Loading />}
      {!state.isLoading &&        
        <CardList 
          data={state.data}
          onClick={onClick}
          pages={state.pages} 
          page={state.page}
          onPageChange={(event: ChangeEvent<unknown>, page: number) => onPageChange(event, page)}
          layout="vertical"
          buttonColor="secondary"
          cols={4}
        />
      }
    </div>
  )
}