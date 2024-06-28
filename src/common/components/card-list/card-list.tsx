import React from 'react'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import Pagination from '@mui/material/Pagination'
import Divider from '@mui/material/Divider'
import { cls } from 'common/utils/utils'
import { ICardList, ICardListItem } from './card-list.types'
import styles from './card-list.module.scss'

export function CardList<TData extends ICardListItem, Action>({
  data,
  onAction,
  onClick,
  actions,
  pages,
  page,
  onPageChange,

  layout = 'horizontal',
  cols = 5,
  buttonStyle = 'contained',
  buttonColor = 'primary',
}: ICardList<TData, Action>): React.ReactElement {
  return (
    <div className={styles.cardList}>
      {data.length != 0 && (
        <div className={styles.cardListContainer}>
          {data.map((item, index) => (
            <div
              key={index}
              className={cls(
                styles.cardListItemContainer,
                cols == 2 ? styles.cardListItemContainer2 : '',
                cols == 4 ? styles.cardListItemContainer4 : '',
                cols == 5 ? styles.cardListItemContainer5 : ''
              )}
            >
              <div
                className={cls(
                  styles.cardListItemContent,
                  layout == 'vertical' ? styles.cardListItemContentVertical : '',
                  onClick ? styles.cardListClickable : ''
                )}
                onClick={onClick ? () => onClick(item) : () => {}}
                onKeyDown={onClick ? () => onClick(item) : () => {}}
                role="button"
                tabIndex={index}
              >
                {layout !== 'vertical' && (
                  <div className={styles.cardListImage}>
                    <img src={item.thumbnail_url} alt="" />
                  </div>
                )}
                <div className={styles.cardListItem}>
                  <div className={layout == 'vertical' ? styles.listItemDetailsVertical : styles.listItemDetails}>
                    <div className={styles.cardListItemDetails}>
                      {layout === 'vertical' && (
                        <div className={styles.cardListImageVertical}>
                          <img src={item.thumbnail_url} alt="" />
                        </div>
                      )}
                      <h4 className={styles.itemHeadline}>{item.name}</h4>
                      <div className={styles.itemDescription}>{item.description}</div>
                    </div>
                    {item.render && <div className={styles.itemRender}>{item.render}</div>}
                  </div>
                  {actions && actions.length > 0 && onAction && (
                    <div className={cls(styles.buttonContainer, layout == 'vertical' ? styles.buttonContainerVertical : '')}>
                      <Divider className={styles.divider} />
                      {actions.map((action, sindex) => (
                        <Tooltip title={action.label} key={sindex}>
                          <Button
                            variant={buttonStyle}
                            color={buttonColor}
                            aria-label={action.label}
                            className={styles.cardButton}
                            onClick={() => {
                              onAction(item, action as unknown as Action)
                            }}
                          >
                            <action.icon /> {action.label}
                          </Button>
                        </Tooltip>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {data.length != 0 && (
        <div className={styles.paginationContainer}>
          <Pagination count={pages} onChange={onPageChange} page={page} color="primary" />
        </div>
      )}
      {data.length == 0 && (
        <div className={styles.warningContainer}>
          <h3 className={styles.warningHeadline}>There is nothing to display.</h3>
          Please add some data to get started.
        </div>
      )}
    </div>
  )
}
