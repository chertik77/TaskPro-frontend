import { useAddColumn } from 'features/kanban/column/hooks'
import { TitleSchema } from 'features/kanban/shared/schema'

import { Button, Field, Modal } from 'components/ui'
import { useAppForm } from 'hooks'

export const AddColumnModal = () => {
  const { register, handleSubmit, formState, reset } = useAppForm(TitleSchema)

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
