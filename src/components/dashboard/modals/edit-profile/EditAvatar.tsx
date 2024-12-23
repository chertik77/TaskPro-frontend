import type { UseMutateAsyncFunction } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import type { EditUserSchema } from 'lib/schemas'
import type { User } from 'types'

import { useRef } from 'react'

import { useAppSelector } from 'hooks/redux'

import { selectUser } from 'redux/user.slice'

type EditAvatarProps = {
  changeUserAvatar: UseMutateAsyncFunction<
    User,
    AxiosError,
    EditUserSchema,
    unknown
  >
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
        className='focus-within:styled-outline relative size-[68px] h-[68px] rounded-xl bg-cover
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
