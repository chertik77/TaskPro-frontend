import type { BoardSchemaFields } from 'lib/schemas'

import { Button, Field, Modal } from 'components/ui'
import { useAppForm } from 'hooks'
import { boardSchema } from 'lib/schemas'
import { handleErrorToast, handleSuccessToast } from 'lib/toasts'
import { Controller } from 'react-hook-form'
import { useModal } from 'react-modal-state'
import { useNavigate } from 'react-router-dom'
import { useAddNewBoardMutation } from 'redux/api/dashboard/board'

import { BackgroundContainer } from './BackgroundContainer'
import { Icons } from './Icons'

export const NewBoardModal = () => {
  const navigate = useNavigate()
  const [addNewBoard, { isLoading }] = useAddNewBoardMutation()
  const { close } = useModal('new-board-modal')
  const { register, formState, reset, handleSubmit, control } =
    useAppForm<BoardSchemaFields>(boardSchema, {
      defaultValues: {
        icon: 'icon-project-1',
        background: 'default'
      }
    })

  const submit = (data: BoardSchemaFields) => {
    addNewBoard(data)
      .unwrap()
      .then(r => {
        handleSuccessToast('Board successfully added to your collection!')
        close()
        reset()
        navigate(`/dashboard/${r._id}`)
      })
      .catch(e => {
        handleErrorToast(
          e.status === 409
            ? 'Conflict occurred. Board with the same title already exists.'
            : 'An error occurred while creating a board. Please try again later.'
        )
      })
  }

  return (
    <Modal
      size='sm'
      modalTitle='New board'>
      <form onSubmit={handleSubmit(submit)}>
        <Field
          {...register('title')}
          inputName='title'
          className={formState.errors ? 'mb-2' : 'violet:text-black'}
          placeholder='Title'
          errors={formState.errors}
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
          {isLoading ? 'Loading...' : 'Create'}
        </Button>
      </form>
    </Modal>
  )
}
