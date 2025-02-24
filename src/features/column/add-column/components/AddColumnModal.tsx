import { ColumnContracts } from '@/entities/column'

import { useAppForm } from '@/shared/hooks'
import { Field, Modal, PlusButton } from '@/shared/ui'

import { useAddColumn } from '../hooks/useAddColumn'

export const AddColumnModal = () => {
  const { register, handleSubmit, formState, reset } = useAppForm(
    ColumnContracts.ColumnSchema
  )

  const { mutate: addColumn, isPending } = useAddColumn(reset)

  return (
    <Modal modalTitle='Add column'>
      <form onSubmit={handleSubmit(data => addColumn(data))}>
        <Field
          errors={formState.errors}
          className='mb-6'
          inputName='title'
          placeholder='Title'
          {...register('title')}
        />
        <PlusButton
          type='submit'
          shouldShowLoader={isPending}
          disabled={isPending}>
          Add
        </PlusButton>
      </form>
    </Modal>
  )
}
