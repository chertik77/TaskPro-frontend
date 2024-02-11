import { Button } from 'components/ui/button/Button'
import { Field } from 'components/ui/field/Field'
import { Modal } from 'components/ui/modal/Modal'
import { BackgroundContainer } from './BackgroundContainer'
import { Icons } from './Icons'

import { useBoard } from 'hooks/useBoard'
import { handleErrorToast, handleSuccessToast } from 'lib/toasts'
import { useState } from 'react'
import { useModal } from 'react-modal-state'
import { useDispatch } from 'react-redux'
import { useAddNewBoardMutation } from 'redux/api/dashboard/board'

import images from 'lib/json/board-bg-images.json'
import { useNavigate } from 'react-router-dom'

export const NewBoardModal = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, errors, reset } = useBoard()
  const [addNewBoard, { isLoading }] = useAddNewBoardMutation()

  const defaultBackground = images.find(bg => bg.id === 'default')
  const { close } = useModal('new-board-modal')
  const [formData, setFormData] = useState({
    title: '',
    icon: 'icon-project-1',
    background: defaultBackground
      ? defaultBackground.icon?.['@1x'] ||
        defaultBackground.icon?.light?.['@1x']
      : ''
  })

  const handleCreateBoard = () => {
    addNewBoard({
      title: formData.title,
      icon: formData.icon,
      background: formData.background
    })
      .unwrap()
      .then(response => {
        handleSuccessToast('Board created successfully')
        dispatch({ type: 'board/addNewBoardFullfilled', payload: response })
        close()
        reset()
        navigate(`/dashboard/${formData.title}`)
      })
      .catch(error => {
        handleErrorToast('Error creating board')
        console.error(error)
      })
  }

  const handleInputChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value })
  }

  return (
    <Modal size='sm' modalTitle='New board'>
      <Field
        {...register('title')}
        inputName='title'
        className={errors ? 'mb-2' : ' violet:text-black'}
        placeholder='Title'
        errors={errors}
        value={formData.title}
        onChange={e => handleInputChange('title', e.target.value)}
      />
      <p className='mt-6'>Icons</p>
      <Icons
        handleIconChange={e => handleInputChange('icon', e.target.value)}
      />
      <p className='mt-6'>Background</p>
      <BackgroundContainer
        handleBgChange={e => handleInputChange('background', e.target.value)}
      />
      <Button
        type='submit'
        isAddIcon
        iconName='plus'
        onClick={handleCreateBoard}
        disabled={isLoading}>
        {isLoading ? 'Creating...' : 'Create'}
      </Button>
    </Modal>
  )
}
