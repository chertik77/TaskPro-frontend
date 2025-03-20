import type { UserTypes } from '@/entities/user'
import type { UseMutateFunction } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import { useAuthStore } from '@/entities/auth'

import { Icon } from '@/shared/ui'

type EditAvatarProps = {
  changeUserAvatar: UseMutateFunction<
    UserTypes.User,
    AxiosError,
    UserTypes.EditUserSchema
  >
}

export const EditAvatar = ({ changeUserAvatar }: EditAvatarProps) => {
  const avatar = useAuthStore(state => state.user.avatar)

  return (
    <label
      htmlFor='file-input'
      style={{ backgroundImage: avatar && `url(${avatar})` }}
      className='relative mx-auto mb-6 block size-[68px] cursor-pointer rounded-xl bg-cover
        bg-center'>
      <input
        id='file-input'
        type='file'
        accept='image/jpeg, image/png'
        className='hidden'
        onChange={e => changeUserAvatar({ avatar: e.target.files?.[0] })}
      />
      <div
        className='absolute -bottom-3 left-[22px] flex size-6 items-center justify-center
          rounded-lg bg-brand text-black violet:bg-white-gray'>
        <Icon
          name='plus'
          className='size-5'
        />
      </div>
    </label>
  )
}
