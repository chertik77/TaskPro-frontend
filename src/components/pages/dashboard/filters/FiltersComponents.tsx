import { Content, Root, Trigger } from '@radix-ui/react-select'
import { RadioPriority } from 'components/ui/field/RadioPriority'
import { valibotResolver } from '@hookform/resolvers/valibot'
import {
  filterSchema,
  type filterSchemaFields
} from 'lib/schemas/filter-schema'
import { useForm } from 'react-hook-form'

export const Select = Root

export const SelectTrigger = () => (
  <Trigger className='flex items-center gap-2 bg-transparent focus:outline-none'>
    <svg className='size-4 stroke-black/80 dark:stroke-white/80'>
      <use xlinkHref={`/assets/icons.svg#icon-filter`} />
    </svg>
    <h2>Filters</h2>
  </Trigger>
)

export const SelectContent = () => {
  const { register, handleSubmit } = useForm<filterSchemaFields>({
    resolver: valibotResolver(filterSchema),
    mode: 'onChange'
  })
  const onChangeFilter: (data: filterSchemaFields) => void = (
    data: filterSchemaFields
  ) => {
    console.log(data)
  }

  return (
    <Content
      className='relative flex w-[300px] gap-2 
    rounded-lg bg-white-primary p-6 dark:bg-black-fourth'
      position='popper'>
      <div className='border-b border-black/10 dark:border-white/10'>
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
          className='text-fs-12-lh-normal-fw-400 underline opacity-50 hocus:text-brand-hover hocus:no-underline hocus:opacity-100'>
          Show all
        </button>
      </div>
      <form onSubmit={handleSubmit(onChangeFilter)}>
        <div className='flex flex-col gap-2'>
          <RadioPriority
            value={'Without priority'}
            color={'bg-black/30 dark:bg-white/30'}
            isValue={true}
            {...register('priority')}
          />
          <RadioPriority
            value={'Low'}
            color={'bg-priority-low'}
            isValue={true}
            {...register('priority')}
          />
          <RadioPriority
            value={'Medium'}
            color={'bg-priority-medium'}
            isValue={true}
            {...register('priority')}
          />
          <RadioPriority
            value={'High'}
            color={'bg-brand'}
            isValue={true}
            {...register('priority')}
          />
        </div>
      </form>
    </Content>
  )
}
