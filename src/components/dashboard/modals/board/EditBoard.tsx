import type { BoardSchemaFields } from 'lib/schemas'

import { useEffect } from 'react'
import { Controller } from 'react-hook-form'
import { useModalInstance } from 'react-modal-state'

import { Button, Field, Modal } from 'components/ui'

import { useAppForm } from 'hooks'
import { useEditBoard } from 'hooks/board/useEditBoard'

import { boardSchema } from 'lib/schemas'

import { BackgroundImages } from './BackgroundImages'
import { Icons } from './Icons'

export const EditBoardModal = () => {
  const { data } = useModalInstance<{ title: string; icon: string }>()

  const { register, reset, handleSubmit, control, formState, setValue } =
    useAppForm<BoardSchemaFields>(boardSchema, {
      defaultValues: { background: 'default' }
    })

  useEffect(() => {
    if (data) {
      setValue('title', data.title)
      setValue('icon', data.icon)
    }
  }, [data, setValue])

  const { mutateAsync, isPending } = useEditBoard(reset)

  const submit = (data: BoardSchemaFields) => {
    mutateAsync(data)
  }

  return (
    <Modal
      size='sm'
      modalTitle='Edit board'>
      <form onSubmit={handleSubmit(submit)}>
        <Field
          {...register('title')}
          inputName='title'
          placeholder='Title'
          errors={formState.errors}
          className='violet:text-black'
        />
        <p className='mt-6'>Icons</p>
        <Controller
          control={control}
          name='icon'
          render={props => <Icons {...props} />}
        />
        <p className='mt-6'>Background</p>
        <Controller
          control={control}
          name='background'
          render={props => <BackgroundImages {...props} />}
        />
        <Button
          type='submit'
          isAddIcon
          iconName='plus'
          disabled={isPending}>
          {isPending ? 'Editing...' : 'Edit'}
        </Button>
      </form>
    </Modal>
  )
}
