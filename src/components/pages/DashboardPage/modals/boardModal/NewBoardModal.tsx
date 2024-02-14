import { Button, Field, Modal } from 'components/ui/index'
import { useNewBoard } from 'hooks'
import { AddNewBoard } from 'lib/schemas/newBoardModal'
import { handleErrorToast, handleSuccessToast } from 'lib/toasts'
import { Controller } from 'react-hook-form'
import { useModal } from 'react-modal-state'
import { useNavigate } from 'react-router-dom'
import { useAddNewBoardMutation } from 'redux/api/dashboard/board'
import { BackgroundContainer } from './BackgroundContainer'
import { Icons } from './Icons'

export const NewBoardModal = () => {
  const navigate = useNavigate()
  const { register, errors, reset, handleSubmit, control, isValid } =
    useNewBoard()
  const [addNewBoard, { isLoading }] = useAddNewBoardMutation()
  const { close } = useModal('new-board-modal')

  const submit = (data: AddNewBoard) => {
    addNewBoard(data)
      .then(() => {
        handleSuccessToast('Board successfully added to your collection')
        close()
        reset()
        navigate(`/dashboard/${data.title}`)
      })
      .catch(error => {
        let errorMessage = 'Error creating board'
        if (error.response) {
          switch (error.response.status) {
            case 401:
              errorMessage =
                'Unauthorized access. Please login to create a board.'
              break
            case 403:
              errorMessage = 'You do not have permission to create a board.'
              break
            case 409:
              errorMessage =
                'Conflict occurred. Board with the same title already exists.'
              break
            default:
              errorMessage =
                'An error occurred while creating a board. Please try again later.'
              break
          }
        }
        handleErrorToast(errorMessage)
      })
  }

  return (
    <Modal size='sm' modalTitle='New board'>
      <form onSubmit={handleSubmit(submit)}>
        <Field
          {...register('title')}
          inputName='title'
          className={errors ? 'mb-2' : 'violet:text-black'}
          placeholder='Title'
          errors={errors}
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
          {isLoading ? 'Creating...' : 'Create'}
        </Button>
      </form>
    </Modal>
  )
}
