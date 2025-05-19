import type { Dispatch, SetStateAction } from 'react'

import { useRef } from 'react'

import { useAuthStore } from '@/shared/store'
import { Icon } from '@/shared/ui'

import { useEditProfile } from '../hooks/useEditProfile'

type EditAvatarProps = {
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
}

export const EditAvatar = ({ setIsDialogOpen }: EditAvatarProps) => {
  const {
    user: { avatar }
  } = useAuthStore()

  const { mutate: changeUserAvatar } = useEditProfile(setIsDialogOpen)

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
