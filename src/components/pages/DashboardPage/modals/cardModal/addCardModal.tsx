import { Button, Field, Modal } from 'components/ui/index'
import {
  AddCardSchema,
  type AddCardSchemaFields
} from 'lib/schemas/addCard-schema'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { useForm } from 'react-hook-form'
import { useModal } from 'react-modal-state'

export const AddCardModal = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid }
  } = useForm<AddCardSchemaFields>({
    resolver: valibotResolver(AddCardSchema),
    mode: 'onChange'
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
          inputName='title'
          type='text'
          placeholder='Title'
          {...register('title')}
        />
        <textarea placeholder='Description' {...register('description')} />
        <p>Label color</p>
        <div className='flex'>
          <Field
            errors={errors}
            inputName='priority'
            {...register('priority')}
            type='radio'
            name='priority'
            value='Low'
          />
          <Field
            errors={errors}
            inputName='priority'
            {...register('priority')}
            type='radio'
            name='priority'
            value='Medium'
          />
          <Field
            errors={errors}
            inputName='priority'
            {...register('priority')}
            type='radio'
            name='priority'
            value='High'
          />
          <Field
            errors={errors}
            inputName='priority'
            {...register('priority')}
            type='radio'
            name='priority'
            value='Without priority'
          />
        </div>
        <Button type='submit' disabled={!isValid}>
          Add
        </Button>
      </form>
    </Modal>
  )
}
