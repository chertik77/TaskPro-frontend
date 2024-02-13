import { Button, Field, Modal } from 'components/ui'
import { useEditBoard } from 'hooks/index'
import { EditBoard } from 'lib/schemas/editBoardModal'
import { handleErrorToast, handleSuccessToast } from 'lib/toasts'
import { Controller } from 'react-hook-form'
import { useModal } from 'react-modal-state'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEditBoardMutation } from 'redux/api/dashboard/board'
import { BackgroundContainer } from './BackgroundContainer'
import { Icons } from './Icons'

export const EditBoardModal = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { register, errors, reset, handleSubmit, control, isValid } =
    useEditBoard()
  const [editBoard, { isLoading }] = useEditBoardMutation()
  const { close } = useModal('edit-board-modal')

  const pathParts = pathname.split('/')
  const boardName = pathParts[pathParts.length - 1]

  const submit = (data: EditBoard) => {
    console.log(data)
    editBoard({ boardName, body: data })
      .then(() => {
        handleSuccessToast('Board edited successfully')
        close()
        reset({ title: ' ' })
        navigate(`/dashboard/${data.title}`)
      })
      .catch(() => {
        handleErrorToast('Error editing board')
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
          defaultValue={boardName}
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
