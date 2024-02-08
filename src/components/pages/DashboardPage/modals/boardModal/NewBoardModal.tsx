import { Button } from 'components/ui/button/Button'
import { Field } from 'components/ui/field/Field'
import { Modal } from 'components/ui/modal/Modal'
import { useBoard } from 'hooks/useBoard'
import type { ChangeEvent } from 'react'
import { BackgroundContainer } from './BackgroundContainer'
import { Icons } from './Icons'
import { useAddNewBoardMutation } from 'redux/api/dashboard/board'

const NewBoardModal = () => {
  const { register, errors } = useBoard()
  const [addNewBoard, { isLoading }] = useAddNewBoardMutation()

  const handleIconChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
  }

  const handleCreateBoard = () => {
    addNewBoardMutation({title:, icon: , background:})
    .unwrap()
      .then((response) => {
        console.log('Доска успешно создана:', response)
      })
      .catch((error) => {
        console.error('Ошибка при создании доски:', error)
      })
  }

  

  return (
    < size='sm' modalTitle='New board'>
      <Field
        {...register('title')}
        inputName='title'
        className={errors && 'mb-2'}
        placeholder='Title'
        errors={errors}
      />
      <p className='mt-6'>Icons</p>
      <Icons handleIconChange={handleIconChange} />
      <p className='mt-6'>Background</p>
      <BackgroundContainer />
      <Button onClick={handleCreateBoard} disabled={isLoading}>
        {isLoading ? 'Создание...' : 'Create'}
      </Button>
    </Modal>
  )
}

export default NewBoardModal
