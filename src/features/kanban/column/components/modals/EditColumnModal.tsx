import type { EditColumnModalProps } from 'features/kanban/column/column.types'

import { useEffect } from 'react'
import { useModalInstance } from 'react-modal-state'

import { useEditColumn } from 'features/kanban/column/hooks'
import { TitleSchema } from 'features/kanban/shared/schema'

import { Button, Field, Modal } from 'components/ui'
import { useAppForm, useIsFormReadyForSubmit } from 'hooks'

export const EditColumnModal = () => {
  const {
    data: { title, id }
  } = useModalInstance<EditColumnModalProps>()

  const { register, handleSubmit, formState, reset, watch } =
    useAppForm(TitleSchema)

  const { mutate: editColumn, isPending } = useEditColumn(reset)

  const { isFormReadyForSubmit } = useIsFormReadyForSubmit({ title }, watch)

  useEffect(() => {
    reset({ title })
  }, [reset, title])

  return (
    <Modal modalTitle='Edit column'>
      <form onSubmit={handleSubmit(data => editColumn({ columnId: id, data }))}>
        <Field
          errors={formState.errors}
          inputName='title'
          className='mb-6'
          placeholder='Title'
          {...register('title', { setValueAs: value => value.trim() })}
        />
        <Button
          type='submit'
          isPlusIcon
          shouldShowLoader={isPending}
          disabled={isPending || !isFormReadyForSubmit}>
          {!isPending && 'Edit'}
        </Button>
      </form>
    </Modal>
  )
}
