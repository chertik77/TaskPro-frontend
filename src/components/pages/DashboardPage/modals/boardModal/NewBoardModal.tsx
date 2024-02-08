import { Button } from 'components/ui/button/Button'
import { Field } from 'components/ui/field/Field'
import { Modal } from 'components/ui/modal/Modal'
import { useBoard } from 'hooks/useBoard'
import type { ChangeEvent } from 'react'
import { BackgroundContainer } from './BackgroundContainer'
import { Icons } from './Icons'
import { useAddNewBoardMutation } from 'redux/api/dashboard/board'
import { useState } from 'react'

const NewBoardModal = () => {
  const { register, errors } = useBoard()
  const [addNewBoard] = useAddNewBoardMutation()

  const [formDataNewBoard, setformDataNewBoard] = useState({
    title: '',
    icon: '',
    background: ''
  })

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setformDataNewBoard({ ...formDataNewBoard, [name]: value })
  }
  const handleIconChange = (selectedIcon: string) => {
    setformDataNewBoard({ ...formDataNewBoard, icon: selectedIcon })
  }

  const handleBgChange = (selectedBackground: string) => {
    setformDataNewBoard({ ...formDataNewBoard, background: selectedBackground })
  }

  const handleCreateBoard = () => {
    addNewBoard({
      title: formDataNewBoard.title,
      icon: formDataNewBoard.icon, // одразу повино бути дефолтне значення
      background: formDataNewBoard.background // одразу повино бути дефолтне значення
    })
      .unwrap()
      .then(response => {
        console.log('Board created successfully:', response)
      })
      .catch(error => {
        console.error('Error creating board:', error)
      })
  }

  return (
    <Modal size='sm' modalTitle='New board'>
      <Field
        {...register('title')}
        inputName='title'
        className={errors && 'mb-2'}
        placeholder='Title'
        errors={errors}
        value={formDataNewBoard.title}
        onChange={handleInputChange}
      />
      <p className='mt-6'>Icons</p>
      <Icons handleIconChange={handleIconChange} />
      <p className='mt-6'>Background</p>
      <BackgroundContainer handleBgChange={handleBgChange} />
      <Button isAddIcon iconName='plus' onClick={handleCreateBoard}>
        Create
      </Button>
    </Modal>
  )
}

export default NewBoardModal
