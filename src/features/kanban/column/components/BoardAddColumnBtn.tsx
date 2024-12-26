import { useAddColumn } from 'features/kanban/column/hooks'

import { Button, Loader } from 'components/ui'

export const BoardAddColumnBtn = () => {
  const { mutate: addColumn, isPending } = useAddColumn()

  return (
    <Button
      disabled={isPending}
      onClick={() => addColumn()}
      className='mr-5 flex h-3xl min-w-8xl max-w-8xl items-center justify-center gap-2 bg-white
        px-[79px] -outline-offset-2 disabled:opacity-100 violet:bg-white
        violet:text-black dark:bg-black-secondary dark:text-white desktop:mr-6'>
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