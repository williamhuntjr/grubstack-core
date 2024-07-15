import React, { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Divider from '@mui/material/Divider'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { ITabPanel, ITabPanelProps } from './tab-panel.types'
import styles from './tab-panel.module.scss'

function TabPanelContent(props: ITabPanelProps): JSX.Element {
  const { children, value, name, currentValue } = props
  return (
    <div
      role="tabpanel"
      hidden={value != currentValue}
      id={`tabpanel-${name}`}
      aria-labelledby={`tab-${name}`}
      className={styles.tabPanelContent}
    >
      {value == currentValue && children}
    </div>
  )
}

function tabProps(name: string): object {
  return {
    id: `tab-${name}`,
    'aria-controls': `tabpanel-${name}`,
  }
}

export const TabPanel: FC<ITabPanel> = ({ tabs, currentTab, label }) => {
  let navigate = useNavigate()

  const [value, setValue] = useState(0)

  const handleChange = (_event: React.SyntheticEvent, newValue: number): void => {
    setValue(newValue)
  }

  useEffect(() => {
    if (currentTab) {
      tabs.map((tab, index) => {
        if (tab.name == currentTab) {
          setValue(index)
        }
      })
    }
  // eslint-disable-next-line
  }, [])

  return (
    <div className={styles.tabPanelContainer}>
      {label != undefined && (
        <>
          <h2 className="page-header">{label}</h2>
          <Divider />
        </>
      )}
      <div className={styles.tabContainer}>
        <Tabs value={value} onChange={handleChange} aria-label="Tabs">
          {tabs.map((tab, index) =>
            tab.path ? (
              <Tab
                key={index}
                label={tab.name}
                component="a"
                onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
                  event.preventDefault()
                  if (tab.path) {
                    navigate(tab.path)
                  }
                }}
                href={tab.path}
                {...tabProps(tab.name)}
                className={styles.tab}
              />
            ) : (
              <Tab key={index} label={tab.name} {...tabProps(tab.name)} className={styles.tab} />
            )
          )}
        </Tabs>
      </div>
      {tabs.map((tab, index) => (
        <TabPanelContent value={index} currentValue={value} name={tab.name} key={index}>
          {tab.render ? tab.render : tab.component ? <tab.component /> : <></> }
        </TabPanelContent>
      ))}
    </div>
  )
}
