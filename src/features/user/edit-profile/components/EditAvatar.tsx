import type { UserDtoTypes } from '@/shared/api/user'
import type { UseMutateFunction } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import type { EditUserSchema } from '../edit-profile.contract'

import { useRef } from 'react'

import { cn } from '@/shared/lib/cn'
import { useAuthStore } from '@/shared/store'
import { Icon } from '@/shared/ui'

type EditAvatarProps = {
  changeUserAvatar: UseMutateFunction<
    EditUserSchema,
    AxiosError,
    UserDtoTypes.EditUserDto
  >
  isPending: boolean
}

export const EditAvatar = ({
  changeUserAvatar,
  isPending
}: EditAvatarProps) => {
  const {
    user: { avatar }
  } = useAuthStore()

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
        disabled={isPending}
        onClick={() => ref.current?.click()}
        style={{ backgroundImage: avatar && `url(${avatar})` }}
        className={cn(
          `focus-visible:styled-outline relative mx-auto mb-6 block size-[68px] rounded-xl
          bg-cover bg-center`,
          isPending && 'cursor-not-allowed'
        )}>
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
