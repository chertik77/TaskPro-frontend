import type { BoardSchemaFields } from 'lib/schemas'

import { useEffect } from 'react'
import { Controller } from 'react-hook-form'
import { useModal, useModalInstance } from 'react-modal-state'
import { useEditBoardMutation } from 'redux/api/dashboard/board'
import { toast } from 'sonner'

import { Button, Field, Modal } from 'components/ui'

import { useAppForm, useBoardByLocation } from 'hooks'

import { boardSchema } from 'lib/schemas'

import { BackgroundContainer } from './BackgroundContainer'
import { Icons } from './Icons'

export const EditBoardModal = () => {
  const [editBoard, { isLoading }] = useEditBoardMutation()
  const { close } = useModal('edit-board-modal')
  const { isOpen } = useModalInstance()
  const boardId = useBoardByLocation()
  const { register, reset, handleSubmit, control, formState } =
    useAppForm<BoardSchemaFields>(boardSchema, {
      defaultValues: {
        background: 'default'
      }
    })

  const title = localStorage.getItem('edit-board-title') ?? ''

  useEffect(() => {
    if (isOpen) {
      reset({ title })
    }
  }, [isOpen, reset, title])

  const submit = (data: BoardSchemaFields) => {
    editBoard({ boardId, body: data })
      .unwrap()
      .then(() => {
        toast.info('The board has been edited successfully.')
        close()
        reset({ title: ' ' })
      })
      .catch(e => {
        toast.error(
          e.status === 409
            ? 'Conflict occurred. Board with the same title already exists.'
            : 'An error occurred while editing a board. Please try again later.'
        )
      })
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
          render={props => <BackgroundContainer {...props} />}
        />
        <Button
          type='submit'
          isAddIcon
          iconName='plus'
          disabled={!formState.isValid || isLoading}>
          {isLoading ? 'Loading...' : 'Edit'}
        </Button>
      </form>
    </Modal>
  )
}
