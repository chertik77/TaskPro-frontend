import * as Popover from '@radix-ui/react-popover'
import { Root } from '@radix-ui/react-radio-group'
import { useSelector } from 'react-redux'
import { filter, selectFilter } from 'redux/user.slice'

import { RadioInput } from 'components/ui/RadioInput'

import { useAppDispatch } from 'hooks'

import items from 'lib/json/filter-items.json'

export const FilterSelect = () => {
  const filterSelector = useSelector(selectFilter)
  const dispatch = useAppDispatch()

  return (
    <Popover.Root>
      <Popover.Trigger className='flex items-center gap-2'>
        <svg className='size-4 stroke-black/80 dark:stroke-white/80'>
          <use href='/icons.svg#icon-filter' />
        </svg>
        <h2>Filters</h2>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className='w-[300px] rounded-lg bg-white-primary p-6 data-[state=open]:animate-in
            data-[state=closed]:animate-out data-[state=closed]:fade-out-0
            data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95
            data-[state=open]:zoom-in-95 dark:bg-black-fourth'
          collisionPadding={10}>
          <div className='border-b border-black/10 dark:border-white/10'>
            <h2 className='pb-default text-fs-18-lh-normal-fw-500'>Filters</h2>
          </div>
          <Popover.Close className='absolute right-default top-default focus:stroke-brand'>
            <svg className='size-[18px] stroke-black dark:stroke-white'>
              <use href='/icons.svg#icon-close' />
            </svg>
          </Popover.Close>
          <div className='my-default flex justify-between text-fs-14-lh-normal-fw-500'>
            <h3>Label color</h3>
            <button
              type='button'
              onClick={() => dispatch(filter(''))}
              className='text-fs-12-lh-normal-fw-400 underline opacity-50 focus:outline-none
                hocus:text-brand-hover hocus:no-underline hocus:opacity-100'>
              Show all
            </button>
          </div>
          <form>
            <Root
              className='flex flex-col gap-2'
              onValueChange={v => dispatch(filter(v))}>
              {items.map(({ value }) => {
                return (
                  <label
                    className='flex items-center gap-2 text-fs-12-lh-normal-fw-400 text-black/50
                      has-[:checked]:text-black hocus:text-black dark:text-white/50
                      has-[:checked]:dark:text-white hocus:dark:text-white'
                    key={value}>
                    <RadioInput
                      value={value}
                      checked={value === filterSelector}
                    />
                    {value}
                  </label>
                )
              })}
            </Root>
          </form>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
