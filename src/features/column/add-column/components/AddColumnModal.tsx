import { ColumnContracts } from '@/shared/api/column'
import { Button, Field, Modal } from '@/shared/components/ui'
import { useAppForm } from '@/shared/hooks'

import { useAddColumn } from '../hooks'

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
        <Button
          isPlusIcon
          type='submit'
          shouldShowLoader={isPending}
          disabled={isPending}>
          {!isPending && 'Add'}
        </Button>
      </form>
    </Modal>
  )
}
