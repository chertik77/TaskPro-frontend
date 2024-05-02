import type { ChangeEvent } from 'react'

import { useEffect } from 'react'
import { Button } from 'components/ui'
import { handleErrorToast, handleSuccessToast } from 'lib/toasts'
import { useSelector } from 'react-redux'
import { useUserMutation } from 'redux/api/user'
import { selectUser } from 'redux/slices/user/user-slice'

export const EditAvatar = () => {
  const { avatarURL } = useSelector(selectUser)
  const [mutateUser, { isError, isSuccess, error }] = useUserMutation()

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
        await mutateUser(formData)
      }
    } catch (error) {
      handleErrorToast('Something went wrong. Please try again.')
    }
  }

  useEffect(() => {
    if (isSuccess) {
      handleSuccessToast('Congrats! Avatar changed successfully')
    }
    if (isError && error) {
      handleErrorToast('Something went wrong. Please try again.')
    }
  }, [isError, isSuccess, error])

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
