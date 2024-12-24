import type { Icon } from '../../board.constants'

import { useEffect } from 'react'
import { useModalInstance } from 'react-modal-state'
import { keyof } from 'valibot'

import { Button, Field, Modal } from 'components/ui'
import { useAppForm } from 'hooks'

import { BoardSchema } from '../../board.schema'
import { useEditBoard } from '../../hooks'
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
    f => formState.dirtyFields[f]
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
