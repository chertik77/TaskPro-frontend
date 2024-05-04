import type { ChangeEvent } from 'react'

import { useSelector } from 'react-redux'
import { selectUser } from 'redux/user.slice'
import { toast } from 'sonner'

import { Button } from 'components/ui'

export const EditAvatar = () => {
  const { avatarURL } = useSelector(selectUser)

  const handleFileSelect = () => {
    const fileInput = document.getElementById('file-input')
    if (fileInput) {
      fileInput.click()
    }
  }

  const handleAvatarChange = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0]
      if (file) {
        const formData = new FormData()
        formData.append('avatar', file)
        // await mutateUser(formData)
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.')
    }
  }

  // useEffect(() => {
  //   if (isSuccess) {
  //     toast.success('Congrats! Avatar changed successfully')
  //   }
  //   if (isError && error) {
  //     toast.error('Something went wrong. Please try again.')
  //   }
  // }, [isError, isSuccess, error])

  return (
    <>
      <input
        id='file-input'
        type='file'
        accept='image/jpeg, image/png'
        style={{ display: 'none' }}
        onChange={handleAvatarChange}
      />
      <Button
        type='button'
        isAddIcon
        iconName='icon-plus-avatar'
        onClick={handleFileSelect}
        style={{ backgroundImage: `url(${avatarURL?.url})` }}
        className='relative size-[68px] rounded-lg bg-cover bg-center fill-black'>
        <div className='absolute bottom-[-12px] left-[22px] size-6 rounded-lg bg-brand p-[7px]'>
          <svg className='size-[10px]'>
            <use xlinkHref={`/assets/icons.svg#icon-plus-avatar`} />
          </svg>
        </div>
      </Button>
    </>
  )
}