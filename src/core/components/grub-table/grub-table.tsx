import React, { memo } from 'react'
import IconButton from '@mui/material/IconButton'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { IGrubTable, ITableRow } from './grub-table.types'

export const GrubTable: IGrubTable = memo(({ 
  columns,
  data,
  onAction,
  actions
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
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((column) =>
              column.hidden && column.hidden == true ? '' : <TableCell key={column.id}>{column.headerName}</TableCell>
            )}
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => 
            <TableRow 
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {columns.map((column) => 
                column.hidden && column.hidden == true ? '' :
                <TableCell key={column.id}>
                  {column.renderCell ? column.renderCell(row) : getColumnData(row, column.field)}
                </TableCell>
              )}
              {actions && actions.length > 0 && onAction && 
              <TableCell>
                {actions.map((action, buttonIndex) => 
                  <IconButton key={buttonIndex} color={action.color ?? "primary"} onClick={() => {
                    onAction(row, action)
                  }}><action.icon /></IconButton>
                )}
              </TableCell>
              }
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
})