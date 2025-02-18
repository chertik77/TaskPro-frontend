import type { ColumnTypes } from '@/entities/column'

import { useEffect } from 'react'
import { ColumnContracts } from '@/entities/column'
import { useModalInstance } from 'react-modal-state'

import { Button, Field, Modal } from '@/shared/components/ui'
import { useAppForm, useIsFormReadyForSubmit } from '@/shared/hooks'

import { useEditColumn } from '../hooks/useEditColumn'

export const EditColumnModal = () => {
  const {
    data: { title, id }
  } = useModalInstance<ColumnTypes.EditColumnModalProps>()

  const { register, handleSubmit, formState, reset, watch } = useAppForm(
    ColumnContracts.ColumnSchema
  )

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
