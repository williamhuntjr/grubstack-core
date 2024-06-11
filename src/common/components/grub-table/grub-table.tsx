import React, { memo } from 'react'
import IconButton from '@mui/material/IconButton'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Pagination from '@mui/material/Pagination'
import { IGrubTable, ITableRow } from './grub-table.types'
import styles from './grub-table.module.scss'

export const GrubTable: IGrubTable = memo(({
  columns,
  data,
  onAction,
  actions,
  pages,
  page,
  onPageChange
}) => {
  const getColumnData = (row: ITableRow, field: string): string => {
    for (const [key, value] of Object.entries(row)) {
      if (key == field) {
        return value
      }
    }
    return ''
  }
  return (
    <div className={styles.grubTable}>
      <TableContainer className={styles.tableContainer}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map((column) =>
                column.hidden && column.hidden == true ? (
                  ''
                ) : (
                  <TableCell key={column.id} className={`grubTableColumn-${column.id}`}>
                    {column.headerName}
                  </TableCell>
                )
              )}
              <TableCell className={styles.actionHeader}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length > 0 &&
              data.map((row) => (
                <TableRow className={styles.tableRow} key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  {columns.map((column) =>
                    column.hidden && column.hidden == true ? (
                      ''
                    ) : (
                      <TableCell key={column.id}>{column.renderCell ? column.renderCell(row) : getColumnData(row, column.field)}</TableCell>
                    )
                  )}
                  {actions && actions.length > 0 && onAction && (
                    <TableCell className={styles.tableActionsContainer}>
                      <div className={styles.tableActions}>
                        {actions.map((action, buttonIndex) => (
                          <IconButton
                            key={buttonIndex}
                            color={action.color ?? undefined}
                            onClick={() => {
                              onAction(row, action)
                            }}
                          >
                            <action.icon />
                          </IconButton>
                        ))}
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {data.length != 0 && 
      <div className={styles.paginationContainer}>
        <Pagination count={pages} onChange={onPageChange} page={page} color="primary" />
      </div>
      }
    </div>
  )
})
