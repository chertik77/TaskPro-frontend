import { Button, Loader } from 'components/ui'

import { useAddColumn } from 'hooks/column'

export const BoardAddColumnBtn = () => {
  const { mutate, isPending } = useAddColumn()

  return (
    <Button
      disabled={isPending}
      onClick={() => mutate()}
      className='flex h-3xl min-w-8xl max-w-8xl items-center justify-center gap-2 bg-white
        px-[79px] disabled:opacity-100 violet:bg-white violet:text-black
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
