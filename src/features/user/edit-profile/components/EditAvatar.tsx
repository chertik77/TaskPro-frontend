import type { UserTypes } from '@/entities/user'
import type { UserDtoTypes } from '@/shared/api/user'
import type { UseMutateFunction } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import { useRef } from 'react'

import { useAuthStore } from '@/shared/store'
import { Icon } from '@/shared/ui'

type EditAvatarProps = {
  changeUserAvatar: UseMutateFunction<
    UserTypes.UserSchema,
    AxiosError,
    UserDtoTypes.EditUserDto
  >
}

export const EditAvatar = ({ changeUserAvatar }: EditAvatarProps) => {
  const avatar = useAuthStore(state => state.user.avatar)

  const ref = useRef<HTMLInputElement>(null)

  return (
    <>
      <input
        type='file'
        ref={ref}
        accept='image/jpeg, image/png'
        className='hidden'
        onChange={e => changeUserAvatar({ avatar: e.target.files?.[0] })}
      />
      <button
        type='button'
        onClick={() => ref.current?.click()}
        style={{ backgroundImage: avatar && `url(${avatar})` }}
        className='focus-visible:styled-outline relative mx-auto mb-6 block size-[68px]
          cursor-pointer rounded-xl bg-cover bg-center'>
        <div
          className='bg-brand violet:bg-white-gray absolute -bottom-3 left-[22px] flex size-6
            items-center justify-center rounded-lg text-black'>
          <Icon
            name='plus'
            className='size-5'
          />
        </div>
      </button>
    </>
  )
}
