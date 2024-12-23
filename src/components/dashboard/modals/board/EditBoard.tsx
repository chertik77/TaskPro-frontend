import type { Icon } from 'constants/icons'

import { useEffect } from 'react'
import { useModalInstance } from 'react-modal-state'
import { keyof } from 'valibot'

import { Button, Field, Modal } from 'components/ui'

import { useAppForm } from 'hooks'
import { useEditBoard } from 'hooks/board'

import { BoardSchema } from 'lib/schemas'

import { RadioInputBgImages } from './RadioInputBgImages'
import { RadioInputIcons } from './RadioInputIcons'

export const EditBoardModal = () => {
  const {
    data: { background, title, icon }
  } = useModalInstance<{
    background: string
    title: string
    icon: Icon
  }>()

  const { register, reset, handleSubmit, control, formState } = useAppForm(
    BoardSchema,
    { defaultValues: { icon, background } }
  )

  const { mutate, isPending } = useEditBoard(reset)

  useEffect(() => {
    reset({ icon, title, background })
  }, [background, icon, title, reset])

  const isFormReadyForSubmit = keyof(BoardSchema).options.some(
    field => formState.dirtyFields[field] && formState.isValid
  )

  return (
    <Modal
      modalTitle='Edit board'
      onAnimationEnd={reset}>
      <form onSubmit={handleSubmit(data => mutate(data))}>
        <Field
          {...register('title', { setValueAs: value => value.trim() })}
          inputName='title'
          placeholder='Title'
          errors={formState.errors}
        />
        <RadioInputIcons control={control} />
        <RadioInputBgImages control={control} />
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
