import { Button } from 'components/ui/button/Button'
import { Field } from 'components/ui/field/Field'
import { Modal } from 'components/ui/modal/Modal'
import { useBoard } from 'hooks/useBoard'
import type { ChangeEvent } from 'react'
import { BackgroundContainer } from './BackgroundContainer'
import { Icons } from './Icons'
import { useAddNewBoardMutation } from 'redux/api/dashboard/board'
import { useState } from 'react'
import { handleErrorToast, handleSuccessToast } from 'lib/toasts'

export const NewBoardModal = () => {
  const { register, errors } = useBoard()
  const [addNewBoard, { isLoading, data }] = useAddNewBoardMutation()

  const [formData, setFormData] = useState({
    title: '',
    icon: 'icon-project-1',
    background: ''
  })

  const handleCreateBoard = () => {
    console.log(data)
    addNewBoard({
      title: formData.title,
      icon: formData.icon,
      background: formData.background
    })
      .unwrap()
      .then(response => {
        handleSuccessToast('Board created successfully')
        console.log(response)
      })
      .catch(error => {
        handleErrorToast('Error creating board')
        console.error(error)
      })
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleIconChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedIcon = e.target.value
    setFormData({ ...formData, icon: selectedIcon })
    console.log(selectedIcon)
  }

  const handleBgChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedIcon = e.target.value
    setFormData({ ...formData, background: selectedIcon })
    console.log(selectedIcon)
  }

  return (
    <Modal size='sm' modalTitle='New board'>
      <Field
        {...register('title')}
        inputName='title'
        className={errors && 'mb-2'}
        placeholder='Title'
        errors={errors}
        value={formData.title}
        onChange={handleInputChange}
      />
      <p className='mt-6'>Icons</p>
      <Icons handleIconChange={handleIconChange} />
      <p className='mt-6'>Background</p>
      <BackgroundContainer handleBgChange={handleBgChange} />
      <Button
        isAddIcon
        iconName='plus'
        onClick={handleCreateBoard}
        disabled={isLoading}>
        {isLoading ? 'Creating...' : 'Create'}
      </Button>
    </Modal>
  )
}
