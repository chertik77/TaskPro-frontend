import { Button, Field, Modal } from 'components/ui'
import { useAppForm, useBoardNameByLocation } from 'hooks'
import { boardSchema, type BoardSchemaFields } from 'lib/schemas/board-schema'
import { handleErrorToast, handleInfoToast } from 'lib/toasts'
import { Controller } from 'react-hook-form'
import { useModal } from 'react-modal-state'
import { useNavigate } from 'react-router-dom'
import { useEditBoardMutation } from 'redux/api/dashboard/board'
import { BackgroundContainer } from './BackgroundContainer'
import { Icons } from './Icons'

export const EditBoardModal = () => {
  const navigate = useNavigate()
  const { register, errors, reset, handleSubmit, control, isValid } =
    useAppForm<BoardSchemaFields>(boardSchema, {
      defaultValues: {
        icon: 'icon-project-1',
        background: 'default'
      }
    })
  const [editBoard, { isLoading }] = useEditBoardMutation()
  const { close } = useModal('edit-board-modal')
  const boardName = useBoardNameByLocation()

  const submit = (data: BoardSchemaFields) => {
    editBoard({ boardName, body: data })
      .unwrap()
      .then(() => {
        handleInfoToast('The board has been edited successfully.')
        close()
        reset({ title: ' ' })
        navigate(`/dashboard/${data.title}`)
      })
      .catch(e => {
        handleErrorToast(
          e.status === 409
            ? 'Conflict occurred. Board with the same title already exists.'
            : 'An error occurred while editing a board. Please try again later.'
        )
      })
  }

  return (
    <Modal size='sm' modalTitle='Edit board'>
      <form onSubmit={handleSubmit(submit)}>
        <Field
          {...register('title')}
          inputName='title'
          placeholder='Title'
          errors={errors}
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
          disabled={!isValid || isLoading}>
          {isLoading ? 'Editing...' : 'Edit'}
        </Button>
      </form>
    </Modal>
  )
}
