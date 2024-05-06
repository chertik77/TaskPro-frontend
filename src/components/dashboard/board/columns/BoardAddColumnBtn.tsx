import { toast } from 'sonner'

import { Button } from 'components/ui'

import { useAppMutation, useGetBoardId } from 'hooks'

import { DEFAULT_COLUMN_TITLE } from 'constants/titles'
import { columnService } from 'services'

export const BoardAddColumnBtn = () => {
  const boardId = useGetBoardId()

  const { mutateAsync, isPending } = useAppMutation({
    mutationKey: ['addColumn'],
    mutationFn: () =>
      columnService.addNewColumn(boardId, { title: DEFAULT_COLUMN_TITLE })
  })

  const handleAddColumnClick = () => {
    toast.promise(mutateAsync(), {
      loading: 'Adding column...',
      success:
        "The column has been added successfully. Let's start filling it with tasks.",
      error: 'Something went wrong while adding the column. Please try again.'
    })
  }

  return (
    <Button
      disabled={isPending}
      onClick={handleAddColumnClick}
      className='flex h-[56px] min-w-[335px] max-w-[335px] items-center gap-2 bg-white px-[79px]
        violet:bg-white violet:text-black dark:bg-black-secondary dark:text-white'>
      <svg
        className='size-7 rounded-md bg-black text-white violet:bg-brand-secondary dark:bg-white
          dark:text-black'>
        <use href='/icons.svg#icon-plus-create' />
      </svg>
      Add another column
    </Button>
  )
}
