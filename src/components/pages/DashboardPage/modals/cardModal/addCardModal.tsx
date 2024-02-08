import { Button, Field, Modal } from 'components/ui/index'
import {
  AddCardSchema,
  type AddCardSchemaFields
} from 'lib/schemas/addCard-schema'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { useForm } from 'react-hook-form'
import { useModal } from 'react-modal-state'
import { Calendar } from './calendar'

export const AddCardModal = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid }
  } = useForm<AddCardSchemaFields>({
    resolver: valibotResolver(AddCardSchema),
    mode: 'onChange',
    defaultValues: { priority: 'Without priority' }
  })
  const { close } = useModal('add-card-modal')

  const onSubmit = (data: AddCardSchemaFields) => {
    console.log('data:', data)
    close()
    reset()
  }
  return (
    <Modal modalTitle='Add card'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field
          errors={errors}
          className='mb-[14px]'
          inputName='title'
          type='text'
          placeholder='Title'
          {...register('title')}
        />
        <textarea
          placeholder='Description'
          {...register('description')}
          className='mb-[24px] h-[154px] w-full resize-none rounded-lg border border-brand border-opacity-40 bg-transparent px-[18px] py-[14px] text-fs-14-lh-1.28-fw-400 text-black outline-none placeholder:opacity-40 focus:border-opacity-100 violet:border-brand-secondary dark:text-white'
        />
        <p className='mb-[4px] text-fs-12-lh-normal-fw-400 text-black/50 violet:text-black/50 dark:text-white/50'>
          Label color
        </p>
        <input
          className='bg-black'
          {...register('priority')}
          type='radio'
          name='priority'
          value='Low'
        />
        <input
          className=''
          {...register('priority')}
          type='radio'
          name='priority'
          value='Medium'
        />
        <input
          {...register('priority')}
          type='radio'
          name='priority'
          value='High'
        />
        <input
          className='mb-[14px]'
          {...register('priority')}
          type='radio'
          name='priority'
          value='Without priority'
        />
        <p className='mb-[4px] text-fs-12-lh-normal-fw-400 text-black/50 violet:text-black/50 dark:text-white/50'>
          Deadline
        </p>
        <input type='date' {...register('deadline')} />
        <Calendar />
        <Button isAddIcon iconName='plus' type='submit' disabled={!isValid}>
          Add
        </Button>
      </form>
    </Modal>
  )
}
