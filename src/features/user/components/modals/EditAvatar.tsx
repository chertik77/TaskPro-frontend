import type { UseMutateFunction } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import type { EditUserSchema } from 'features/user/user.schema'
import type { User } from 'features/user/user.types'

import { useRef } from 'react'

import { selectUser } from 'features/user/user.slice'

import { useAppSelector } from 'hooks/redux'

type EditAvatarProps = {
  changeUserAvatar: UseMutateFunction<User, AxiosError, EditUserSchema>
}

export const EditAvatar = ({ changeUserAvatar }: EditAvatarProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const { avatar } = useAppSelector(selectUser)

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
          className='absolute -bottom-3 left-[22px] size-6 rounded-lg bg-brand p-[7px]
            violet:bg-white-gray-secondary'>
          <svg className='size-sm'>
            <use href='/icons.svg#icon-plus-avatar' />
          </svg>
        </div>
      </button>
    </div>
  )
}
