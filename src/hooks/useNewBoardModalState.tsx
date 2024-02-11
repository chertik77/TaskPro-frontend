import { useState } from 'react'
import images from 'lib/json/board-bg-images.json'

export const useNewBoardModalState = () => {
  const defaultBackground = images.find(bg => bg.id === 'default')

  const [formData, setFormData] = useState({
    title: '',
    icon: 'icon-project-1',
    background: defaultBackground
      ? defaultBackground.icon?.light?.['@1x'] ||
        defaultBackground.icon?.['@1x']
      : ''
  })

  const handleInputChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value })
  }

  return { formData, handleInputChange }
}
