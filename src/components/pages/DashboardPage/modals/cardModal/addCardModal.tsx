import { Button, Field, Modal } from 'components/ui/index'
import {
  AddCardSchema,
  type AddCardSchemaFields
} from 'lib/schemas/addCard-schema'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { useForm } from 'react-hook-form'
import { useModal } from 'react-modal-state'
import { RadioPriority } from 'components/ui/field/RadioPriority'
import { handleErrorToast, handleSuccessToast } from 'lib/toasts'
import { useAddNewTaskMutation } from 'redux/api/dashboard/task'

export const AddCardModal = () => {
  const pathParts = location.pathname.split('/')
  const name = pathParts[pathParts.length - 1]



  const [addNewTask] = useAddNewTaskMutation()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid }
  } = useForm<AddCardSchemaFields>({
    resolver: valibotResolver(AddCardSchema),
    mode: 'onChange',
    defaultValues: {
      priority: 'Without priority'
    }
  })
  const { close } = useModal('add-card-modal')
  const onSubmit = (data: AddCardSchemaFields) => {
    addNewTask({
      boardName: name,
      body: data,
      columnId: JSON.parse(localStorage.getItem('idColumn') || '""')
    })
      .unwrap()
      .then(() => {
        handleSuccessToast('Task created successfully')
        close()
        reset()
      })
      .catch(() => {
        handleErrorToast("Oops! Something went wrong. Our team is already solving this problem. Please stay with us.")
      })
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
     <div className='relative'>   <textarea
          placeholder='Description'
          {...register('description')}
          className='mb-[24px] h-[154px] w-full resize-none rounded-lg border border-brand border-opacity-40 bg-transparent px-[18px] py-[14px] text-fs-14-lh-1.28-fw-400 text-black outline-none placeholder:opacity-40 focus:border-opacity-100 violet:border-brand-secondary dark:text-white'
        />
        {errors.description && (
            <span className=' absolute left-0 top-[154px] text-red-600'>
            Please enter at least 2 characters.
            </span>
          )}
        </div>
        <p className='mb-[4px] select-none text-fs-12-lh-normal-fw-400 text-black/50 violet:text-black/50 dark:text-white/50'>
          Label color
        </p>

        <div className='mb-[14px] flex gap-2'>
          <RadioPriority
            color='bg-priority-low'
            value='Low'
            {...register('priority')}
          />
          <RadioPriority
            color='bg-priority-medium'
            value='Medium'
            {...register('priority')}
          />
          <RadioPriority
            color='bg-brand'
            value='High'
            {...register('priority')}
          />
          <RadioPriority
            color='bg-black/30 dark:bg-white/30'
            value='Without priority'
            {...register('priority')}
          />
        </div>

        <p className='mb-[4px] select-none text-fs-12-lh-normal-fw-400 text-black/50 violet:text-black/50 dark:text-white/50'>
          Deadline
        </p>
        <div className='relative'>
          <input type='date' className='mb-[40px] ' {...register('deadline')} />
          {errors.deadline && (
            <span className=' absolute left-0 top-5 text-red-600'>
              Wrong date!
            </span>
          )}
        </div>
        <Button isAddIcon iconName='plus' type='submit' disabled={!isValid}>
          Add
        </Button>
      </form>
    </Modal>
  )
}
