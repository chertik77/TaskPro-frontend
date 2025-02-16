import type { ColumnTypes } from '@/shared/api/column'

import { DeleteColumnTrigger } from '@/features/column/delete-column/components'
import { EditColumnTrigger } from '@/features/column/edit-column/components'

import { cn } from '@/shared/lib'

type ColumnListItemActionsProps = {
  column: ColumnTypes.Column
}

export const ColumnListItemActions = ({
  column
}: ColumnListItemActionsProps) => (
  <div
    className={cn(
      `mb-3.5 flex h-3xl min-w-8xl items-center justify-center rounded-lg bg-white px-5
      py-lg dark:bg-black`
    )}>
    {column.title}
    <EditColumnTrigger column={column} />
    <DeleteColumnTrigger columnId={column.id} />
  </div>
)
