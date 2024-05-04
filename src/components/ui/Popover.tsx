import { Root, Trigger } from '@radix-ui/react-popover'

export const Popover = Root

export const PopoverTrigger = () => {
  return (
    <Trigger>
      <svg className='size-4 stroke-black/80 dark:stroke-white/80'>
        <use xlinkHref={`/assets/icons.svg#icon-filter`} />
      </svg>
      <h2>Filters</h2>
    </Trigger>
  )
}
