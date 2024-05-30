import React, { FC } from 'react'
import { TabPanel } from 'core/components/tab-panel/tab-panel'
import { productTabs, ProductTab } from 'app/products/products.constants'

export const IngredientsTab: FC = () => {
  return (
    <TabPanel tabs={productTabs} currentTab={ProductTab.Ingredients} label={'Products'} />
  )
}