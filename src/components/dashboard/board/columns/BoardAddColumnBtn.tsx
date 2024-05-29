import { Button, Loader } from 'components/ui'

import { useAppMutation, useGetBoardId } from 'hooks'

import { DEFAULT_COLUMN_TITLE } from 'constants/titles'
import { columnService } from 'services'

export const BoardAddColumnBtn = () => {
  const boardId = useGetBoardId()

  const { mutate, isPending } = useAppMutation({
    mutationKey: ['addColumn'],
    mutationFn: () =>
      columnService.addNewColumn(boardId!, { title: DEFAULT_COLUMN_TITLE }),
    toastErrorMessage:
      'Unexpected error during column addition. We apologize for the inconvenience. Please try again later.'
  })

  return (
    <Button
      disabled={isPending}
      onClick={() => mutate()}
      className='flex h-[56px] min-w-[335px] max-w-[335px] items-center justify-center gap-2
        bg-white px-[79px] disabled:opacity-100 violet:bg-white violet:text-black
        dark:bg-black-secondary dark:text-white'>
      {isPending ? (
        <>
          <Loader />
          Adding...
        </>
      ) : (
        <>
          <svg
            className='size-7 rounded-md bg-black text-white violet:bg-brand-secondary dark:bg-white
              dark:text-black'>
            <use href='/icons.svg#icon-plus-create' />
          </svg>
          Add another column
        </>
      )}
    </Button>
  )
}
