import React, { FC, memo } from 'react'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import { IImagePicker } from './image-picker.types'
import styles from './image-picker.module.scss'

export const ImagePicker: FC<IImagePicker> = memo(({ items, columns, rowHeight, listHeight }) => {
  return (
    <ImageList cols={columns} rowHeight={rowHeight} style={{height: listHeight}} gap={15} className={styles.imageList} >
      {items.map((item) => (
        <ImageListItem key={item.url} className={styles.imageListItem}>
          <img
            src={item.url}
            srcSet={item.url}
            alt={item.title}
            loading="lazy"
            style={{width: rowHeight, height: rowHeight}}
          />
        </ImageListItem>
      ))}
    </ImageList>
  )
})