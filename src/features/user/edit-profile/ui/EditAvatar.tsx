import { useRef } from 'react'

import { useSessionStore } from '@/entities/session'

import { Icon, Loader } from '@/shared/ui'

import { useEditProfile } from '../api/useEditProfile'

export const EditAvatar = () => {
  const {
    user: { avatar }
  } = useSessionStore()

  const ref = useRef<HTMLInputElement>(null)

  const { mutate: changeAvatar, isPending } = useEditProfile()

  return (
    <>
      <input
        type='file'
        ref={ref}
        accept='image/jpg, image/jpeg, image/png, image/webp'
        className='hidden'
        onChange={e => changeAvatar({ avatar: e.target.files?.[0] })}
      />
      {isPending ? (
        <div
          className='bg-white-muted dark:bg-black-soft violet:bg-white-gray
            relative mx-auto mb-6 flex size-[68px] items-center justify-center
            rounded-xl'>
          <Loader />
        </div>
      ) : (
        <button
          type='button'
          onClick={() => ref.current?.click()}
          className='focus-visible:styled-outline relative mx-auto mb-6 block
            size-[68px]'>
          <img
            src={avatar}
            alt='Avatar'
            className='size-[inherit] rounded-xl object-cover'
          />
          <div
            className='bg-brand violet:bg-white-gray absolute -bottom-3
              left-[22px] flex size-6 items-center justify-center rounded-lg
              text-black'>
            <Icon
              name='plus'
              className='size-5 stroke-none'
            />
          </div>
        </button>
      )}
    </>
  )
}
