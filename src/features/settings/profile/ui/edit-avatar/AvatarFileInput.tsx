import type { ChangeEvent, ComponentProps } from 'react'

import { useRef } from 'react'

import { Button } from '@/shared/ui'

import { ALLOWED_AVATAR_TYPES } from '../../config/avatar'

type AvatarFileInputProps = ComponentProps<'button'> & {
  onSelectFile: (file: File) => void
}

export const AvatarFileInput = ({
  onSelectFile,
  children,
  ...props
}: AvatarFileInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const file = target.files?.[0]

    if (file) onSelectFile(file)
  }

  return (
    <>
      <Button
        onClick={() => inputRef.current?.click()}
        {...props}>
        {children}
      </Button>
      <input
        ref={inputRef}
        type='file'
        accept={ALLOWED_AVATAR_TYPES.join(',')}
        onChange={handleChange}
        className='hidden'
      />
    </>
  )
}
