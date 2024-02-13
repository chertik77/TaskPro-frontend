import { Content, Root, Trigger } from '@radix-ui/react-select'
import { RadioPriority } from 'components/ui/field/RadioFilterPriority'

const Select = Root

const SelectTrigger = () => (
  <Trigger className='flex items-center gap-2 bg-transparent focus:outline-none'>
    <svg className='size-4 stroke-black/80 dark:stroke-white/80'>
      <use xlinkHref={`/assets/icons.svg#icon-filter`} />
    </svg>
    <h2>Filters</h2>
  </Trigger>
)

const SelectContent = () => (
  <Content
    className='relative flex w-[300px] gap-2 
    rounded-lg bg-white-primary p-6 dark:bg-black-fourth'
    position='popper'>
    <div className='border-b border-black/10 dark:border-white/10'>
      <h2 className='mb-[14px] text-fs-18-lh-normal-fw-500'>Filters</h2>
    </div>
    <svg className='absolute right-[14px] top-[14px] size-[18px] stroke-black dark:stroke-white'>
      <use xlinkHref={`/assets/icons.svg#icon-close`} />
    </svg>
    <div className='my-[14px] flex justify-between'>
      <h3>Label color</h3>
      <button
        type='button'
        className='underline opacity-50 hocus:text-brand-hover hocus:no-underline hocus:opacity-100'>
        Show all
      </button>
    </div>
    <div className='flex flex-col gap-2'>
      <RadioPriority value={'Low'} color={'bg-priority-low'} />
      <RadioPriority value={'Medium'} color={'bg-priority-medium'} />
      <RadioPriority value={'High'} color={'bg-brand'} />
      <RadioPriority
        value={'Without priority'}
        color={'bg-black/30 dark:bg-white/30'}
      />
    </div>
  </Content>
)

export { Select, SelectContent, SelectTrigger }
