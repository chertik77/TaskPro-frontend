import type { ColumnTypes } from '@/entities/column'

import { useEffect } from 'react'
import { useModalInstance } from 'react-modal-state'

import { ColumnContracts } from '@/entities/column'

import { useAppForm, useIsFormReadyForSubmit } from '@/shared/hooks'
import { Field, Modal, PlusButton } from '@/shared/ui'

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
        <PlusButton
          type='submit'
          shouldShowLoader={isPending}
          disabled={isPending || !isFormReadyForSubmit}>
          Edit
        </PlusButton>
      </form>
    </Modal>
  )
}
