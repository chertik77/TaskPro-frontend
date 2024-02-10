import { Button } from 'components/ui/button/Button'
import { Field } from 'components/ui/field/Field'
import { Modal } from 'components/ui/modal/Modal'
import { BackgroundContainer } from './BackgroundContainer'
import { Icons } from './Icons'

import { useState } from 'react'
import { useModal } from 'react-modal-state'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'

import { useBoard } from 'hooks/useBoard'
import { handleErrorToast, handleSuccessToast } from 'lib/toasts'
import { useEditBoardMutation } from 'redux/api/dashboard/board'

import images from 'lib/json/board-bg-images.json'

export const EditBoardModal = () => {
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  const { register, errors, reset } = useBoard()
  const [editBoard, { isLoading }] = useEditBoardMutation()
  const { close } = useModal('edit-board-modal')
  const defaultBackground = images.find(bg => bg.id === 'default')

  const [formData, setFormData] = useState({
    title: '',
    icon: 'icon-project-1',
    background: defaultBackground
      ? defaultBackground.icon?.['@1x'] ||
        defaultBackground.icon?.light?.['@1x']
      : ''
  })
  console.log(pathname)
  const pathParts = pathname.split('/')
  const boardName = pathParts[pathParts.length - 1]
  console.log(name)
  const handleInputChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value })
  }

  const handleEditBoard = () => {
    editBoard({ boardName, body: formData })
      .unwrap()
      .then(response => {
        handleSuccessToast('Board edited successfully')
        dispatch({ type: 'board/editBoardFullfilled', payload: response })
        close()
        reset()
      })
      .catch(error => {
        handleErrorToast('Error editing board')
        console.error(error)
      })
  }

  return (
    <Modal size='sm' modalTitle='Edit board'>
      <Field
        {...register('title')}
        inputName='title'
        placeholder='Title'
        value={formData.title || ''}
        errors={errors}
        onChange={e => handleInputChange('title', e.target.value)}
        className='violet:text-black'
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
        isAddIcon
        iconName='plus'
        onClick={handleEditBoard}
        disabled={isLoading}>
        {isLoading ? 'Editing...' : 'Edit'}
      </Button>
    </Modal>
  )
}
