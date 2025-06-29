import type { EditUserMutateFunction } from '../model/types'

import { useRef } from 'react'

import { useSessionStore } from '@/entities/session'

import { cn } from '@/shared/lib'
import { Icon } from '@/shared/ui'

type EditAvatarProps = {
  changeUserAvatar: EditUserMutateFunction
  isPending: boolean
}

export const EditAvatar = ({
  changeUserAvatar,
  isPending
}: EditAvatarProps) => {
  const {
    user: { avatar }
  } = useSessionStore()

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
        style={{ backgroundImage: avatar ? `url(${avatar})` : undefined }}
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
            className='size-5 stroke-none'
          />
        </div>
      </button>
    </>
  )
}
