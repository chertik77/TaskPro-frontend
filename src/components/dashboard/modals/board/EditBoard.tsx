import type { Icon } from 'constants/icons'

import { useEffect } from 'react'
import { useModalInstance } from 'react-modal-state'

import { Button, Field, Modal } from 'components/ui'

import { useAppForm, useSubmitDisabled } from 'hooks'
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

  const { isSubmitDisabled } = useSubmitDisabled(watch, {
    title,
    background,
    icon
  })

  const { mutate, isPending } = useEditBoard(reset)

  useEffect(() => {
    reset({ icon, title, background })
  }, [background, icon, title, reset])

  return (
    <Modal modalTitle='Edit board'>
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
          disabled={isPending || isSubmitDisabled}>
          {!isPending && 'Edit'}
        </Button>
      </form>
    </Modal>
  )
}
