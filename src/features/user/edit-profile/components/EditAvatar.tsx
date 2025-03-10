import type { UserTypes } from '@/entities/user'
import type { UseMutateFunction } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import { useRef } from 'react'

import { useGetCurrentUser } from '@/entities/user'

import { Icon } from '@/shared/ui'

type EditAvatarProps = {
  changeUserAvatar: UseMutateFunction<
    UserTypes.User,
    AxiosError,
    UserTypes.EditUserSchema
  >
}

export const EditAvatar = ({ changeUserAvatar }: EditAvatarProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const { avatar } = useGetCurrentUser()

  return (
    <div className='mb-[25px] flex justify-center'>
      <input
        id='file-input'
        type='file'
        ref={inputRef}
        accept='image/jpeg, image/png'
        className='hidden'
        onChange={e => changeUserAvatar({ avatar: e.target.files?.[0] })}
      />
      <button
        type='button'
        onClick={() => inputRef.current?.click()}
        style={{ backgroundImage: avatar && `url(${avatar})` }}
        className='focus-visible:styled-outline relative size-[68px] h-[68px] rounded-xl bg-cover
          bg-center'>
        <div
          className='absolute -bottom-3 left-[22px] flex size-6 items-center justify-center
            rounded-lg bg-brand text-black violet:bg-white-gray'>
          <Icon
            name='plus'
            className='size-5'
          />
        </div>
      </button>
    </div>
  )
}
