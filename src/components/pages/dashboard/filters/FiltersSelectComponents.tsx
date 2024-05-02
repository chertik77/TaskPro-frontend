import type { RadioProps } from 'components/ui/field/priority-types'

import { Content, Icon, Item, Root, Trigger } from '@radix-ui/react-select'
import { RadioPriority } from 'components/ui/field/RadioPriority'
import { useAppDispatch } from 'hooks'
import items from 'lib/json/filter-items.json'
import { filter } from 'redux/slices/board/board-slice'

export const Select = Root

export const SelectTrigger = () => (
  <Trigger
    className='absolute right-5 top-[14px] flex items-center gap-2 bg-transparent
      focus:outline-none tablet:right-8 tablet:top-5 desktop:right-6
      desktop:top-[14px]'>
    <Icon>
      <svg className='size-4 stroke-black/80 dark:stroke-white/80'>
        <use xlinkHref={`/assets/icons.svg#icon-filter`} />
      </svg>
    </Icon>
    <h2 className='text-fs-14-lh-normal-fw-500'>Filters</h2>
  </Trigger>
)

export const SelectContent = () => {
  const dispath = useAppDispatch()
  return (
    <Content
      className='absolute left-[-225px] top-1 flex w-[300px] rounded-lg bg-white-primary p-6
        dark:bg-black-fourth'
      position='popper'>
      <div className='relative border-b border-black/10 dark:border-white/10'>
        <h2 className='mb-[14px] text-fs-18-lh-normal-fw-500'>Filters</h2>
      </div>
      <button type='button'>
        <svg className='absolute right-[14px] top-[14px] size-[18px] stroke-black dark:stroke-white'>
          <use xlinkHref={`/assets/icons.svg#icon-close`} />
        </svg>
      </button>
      <div className='my-[14px] flex justify-between text-fs-14-lh-normal-fw-500'>
        <h3>Label color</h3>
        <button
          type='button'
          className='text-fs-12-lh-normal-fw-400 underline opacity-50 hocus:text-brand-hover
            hocus:no-underline hocus:opacity-100'
          onClick={() => dispath(filter(''))}>
          Show all
        </button>
      </div>
      <div className='flex flex-col gap-2'>
        {items.map(({ value, color }) => (
          <Item
            key={value}
            value={value}>
            <RadioPriority
              key={value}
              value={value as RadioProps['value']}
              color={color as RadioProps['color']}
              isValue
            />
          </Item>
        ))}
      </div>
    </Content>
  )
}
