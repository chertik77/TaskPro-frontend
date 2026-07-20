import type { Label } from '@/shared/api'

import { format } from 'date-fns'

import { LABEL_BASE_COLOR_MAP } from '@/entities/label'

import { cn, useMediaQuery } from '@/shared/lib'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/shared/ui'

import { DeleteLabelAlertDialog } from './delete/DeleteLabelAlertDialog'
import { EditLabelDialog } from './edit/EditLabelDialog'

type LabelsTableProps = {
  labels: Label[] | undefined
}

export const LabelsTable = ({ labels }: LabelsTableProps) => {
  const isDesktop = useMediaQuery('(min-width: 1440px)')

  return (
    <Table className='mb-10 table-fixed'>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead className='desktop:table-cell hidden'>
            Description
          </TableHead>
          <TableHead className='w-28 text-right'>Created</TableHead>
          <TableHead className='w-20 text-right'>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {labels && labels.length > 0 ? (
          labels.map(({ id, name, description, color, createdAt }) => (
            <TableRow key={id}>
              <TableCell
                className='flex items-center gap-2 text-black dark:text-white'>
                <span
                  className={cn(
                    'size-3.5 shrink-0 rounded-full',
                    LABEL_BASE_COLOR_MAP[color]
                  )}
                />
                <p className='truncate'>{name}</p>
              </TableCell>
              <TableCell
                className='desktop:table-cell hidden truncate text-black
                  dark:text-white'>
                {description}
              </TableCell>
              <TableCell className='text-right'>
                {format(createdAt, 'MMM yyyy')}
              </TableCell>
              <TableCell className='flex items-center justify-end gap-3'>
                <EditLabelDialog formData={{ id, name, color, description }} />
                <DeleteLabelAlertDialog labelId={id} />
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableCell
            colSpan={isDesktop ? 4 : 3}
            className='h-15 text-center'>
            No labels yet. Add your first label to get started.
          </TableCell>
        )}
      </TableBody>
    </Table>
  )
}
