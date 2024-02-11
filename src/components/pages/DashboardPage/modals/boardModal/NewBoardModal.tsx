import { Button, Field, Modal } from 'components/ui/index'
import { BackgroundContainer } from './BackgroundContainer'
import { Icons } from './Icons'

import { useNewBoard, useNewBoardModalState } from 'hooks/index'
import type { AddNewBoard } from 'lib/schemas/newBord'
import { useModal } from 'react-modal-state'
import { handleErrorToast, handleSuccessToast } from 'lib/toasts'
import { useAddNewBoardMutation } from 'redux/api/dashboard/board'
import { useNavigate } from 'react-router-dom'

export const NewBoardModal = () => {
  const navigate = useNavigate()
  const { handleSubmit, reset, errors, register } = useNewBoard()
  const [addNewBoard, { isLoading }] = useAddNewBoardMutation()
  const { formData, handleInputChange } = useNewBoardModalState()

  const { close } = useModal('new-board-modal')
  console.log(formData)

  const submit = (data: AddNewBoard) => {
    console.log('clik', data)
    addNewBoard(data)
      .then(() => {
        handleSuccessToast('Board created successfully')
        close()
        reset({ title: '' })
        navigate(`/dashboard/${formData.title}`)
      })
      .catch(() => {
        handleErrorToast('Error creating board')
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
        <Icons
          handleIconChange={e => handleInputChange('icon', e.target.value)}
        />
        <p className='mt-6'>Background</p>
        <BackgroundContainer
          handleBgChange={e => handleInputChange('background', e.target.value)}
        />
        <Button type='submit' isAddIcon iconName='plus' disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Create'}
        </Button>
      </form>
    </Modal>
  )
}
