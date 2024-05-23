import type { UseMutateAsyncFunction } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import type { EditUserSchema } from 'lib/schemas'
import type { ChangeEvent } from 'react'
import type { User } from 'types'

import { useRef } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'

import { Button } from 'components/ui'

import { selectUser } from 'redux/user.slice'

type EditAvatarProps = {
  changeUserAvatar: UseMutateAsyncFunction<
    { user: User },
    AxiosError,
    EditUserSchema,
    unknown
  >
}

export const EditAvatar = ({ changeUserAvatar }: EditAvatarProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const { avatarURL } = useSelector(selectUser)

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    toast.promise(changeUserAvatar({ avatar: e.target.files?.[0] }), {
      loading: 'Uploading avatar...',
      success: 'Avatar uploaded successfully!',
      error: 'An error occurred while uploading the avatar. Please try again.'
    })
  }

  return (
    <div className='mb-[25px] flex justify-center'>
      <input
        id='file-input'
        type='file'
        ref={inputRef}
        accept='image/jpeg, image/png'
        className='hidden'
        onChange={handleAvatarChange}
      />
      <Button
        type='button'
        onClick={() => inputRef.current?.click()}
        style={{ backgroundImage: `url(${avatarURL})` }}
        className='relative size-[68px] bg-cover bg-center'>
        <div
          className='absolute -bottom-3 left-[22px] size-6 rounded-lg bg-brand p-[7px]
            violet:bg-white-gray-secondary'>
          <svg className='size-[10px]'>
            <use href='/icons.svg#icon-plus-avatar' />
          </svg>
        </div>
      </Button>
    </div>
  )
}
