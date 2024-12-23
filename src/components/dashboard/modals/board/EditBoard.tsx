import type { Icon } from 'constants/icons'

import { useEffect } from 'react'
import { useModalInstance } from 'react-modal-state'

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

  const { register, reset, handleSubmit, control, formState, watch } =
    useAppForm(BoardSchema, { defaultValues: { icon, background } })

  const { mutate, isPending } = useEditBoard(reset)

  useEffect(() => {
    reset({ icon, title, background })
  }, [background, icon, title, reset])

  const value = watch()

  const isFormReadyForSubmit =
    value.title?.trim() !== title ||
    value.background !== background ||
    value.icon !== icon

  return (
    <Modal modalTitle='Edit board'>
      <form onSubmit={handleSubmit(data => mutate(data))}>
        <Field
          {...register('title')}
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
