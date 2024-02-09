import { Button } from 'components/ui/button/Button'
import { Field } from 'components/ui/field/Field'
import { Modal } from 'components/ui/modal/Modal'
import { BackgroundContainer } from './BackgroundContainer'
import { Icons } from './Icons'

import { useBoard } from 'hooks/useBoard'
import { useEditBoardMutation } from 'redux/api/dashboard/board'
import { handleErrorToast, handleSuccessToast } from 'lib/toasts'
import type { Board } from 'redux/slices/board/board-types'
import { useState, useEffect } from 'react'
import { useGetBoardByNameQuery } from 'redux/api/dashboard/board'

export const EditBoardModal = ({ boardName }: { boardName: string }) => {
  const [formData, setFormData] = useState<Partial<Board>>({})
  const { data } = useGetBoardByNameQuery(boardName)
  const { register, errors } = useBoard()
  const [editBoard, { isLoading }] = useEditBoardMutation()

  useEffect(() => {
    if (data) {
      setFormData(data)
    }
  }, [data])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedIcon = e.target.value
    setFormData({ ...formData, icon: selectedIcon })
    console.log(selectedIcon)
  }

  const handleBgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedBg = e.target.value
    setFormData({ ...formData, background: selectedBg })
    console.log(selectedBg)
  }

  const handleEditBoard = () => {
    editBoard(formData)
      .unwrap()
      .then(response => {
        handleSuccessToast('Board edited successfully')
        console.log(response)
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
        onChange={handleInputChange}
      />
      <p className='mt-6'>Icons</p>
      <Icons handleIconChange={handleIconChange} />
      <p className='mt-6'>Background</p>
      <BackgroundContainer handleBgChange={handleBgChange} />
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
