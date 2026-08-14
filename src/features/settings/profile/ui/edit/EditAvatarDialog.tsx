import type { DragEvent, ReactNode } from 'react'

import { useState } from 'react'
import { ImageUpIcon } from 'lucide-react'

import { useMe } from '@/entities/user'

import { cn } from '@/shared/lib'
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  Loader
} from '@/shared/ui'

import { useUploadAvatar } from '../../api/useUploadAvatar'
import { useAvatarEditor } from '../../model/useAvatarEditor'
import { AvatarEditorCanvas } from './AvatarEditorCanvas'
import { AvatarEditorControls } from './AvatarEditorControls'
import { AvatarFileInput } from './AvatarFileInput'

type EditAvatarDialogProps = {
  children: ReactNode
}

export const EditAvatarDialog = ({ children }: EditAvatarDialogProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDraggingOver, setIsDraggingOver] = useState(false)

  const user = useMe()

  const {
    image,
    scale,
    rotate,
    isDirty,
    editorRef,
    changeScale,
    selectImage,
    rotateClockwise,
    setPosition,
    resetTo,
    getCroppedAvatar
  } = useAvatarEditor()

  const { mutate: uploadAvatar, isPending } = useUploadAvatar(() =>
    setIsDialogOpen(false)
  )

  const handleOpenChange = (isOpen: boolean) => {
    setIsDialogOpen(isOpen)

    if (isOpen) resetTo(user?.image ?? null)
  }

  const handleDrop = (event: DragEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setIsDraggingOver(false)

    const [file] = event.dataTransfer.files

    if (!file) return

    selectImage(file)
    setIsDialogOpen(true)
  }

  const handleSave = () =>
    getCroppedAvatar(avatar => uploadAvatar({ body: { avatar } }))

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={handleOpenChange}>
      <DialogTrigger
        aria-label='Edit avatar'
        onDragOver={event => {
          event.preventDefault()
          setIsDraggingOver(true)
        }}
        onDragLeave={() => setIsDraggingOver(false)}
        onDrop={handleDrop}
        className={cn(
          `focus-visible:styled-outline ring-accent/0 group hocus:ring-accent/60
          relative shrink-0 cursor-pointer rounded-xl ring-2 ring-offset-2
          ring-offset-transparent transition-all`,
          isDraggingOver && 'ring-accent scale-105'
        )}>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Edit avatar</DialogTitle>
        {!image ? (
          <>
            <DialogDescription className='mb-6'>
              Choose a .jpeg, .png, .avif or .webp image up to 5MB. You can
              crop, zoom and rotate it before saving.
            </DialogDescription>
            <AvatarFileInput onSelectFile={selectImage}>
              <ImageUpIcon className='mr-2 size-5' />
              Choose image
            </AvatarFileInput>
          </>
        ) : (
          <div className='space-y-6'>
            <AvatarEditorCanvas
              ref={editorRef}
              image={image}
              scale={scale}
              rotate={rotate}
              onScaleChange={changeScale}
              onPositionChange={setPosition}
            />
            <AvatarEditorControls
              scale={scale}
              onScaleChange={changeScale}
              onRotate={rotateClockwise}
            />
            <div className='flex gap-3'>
              <AvatarFileInput
                onSelectFile={selectImage}
                disabled={isPending}
                className='enabled:hocus:bg-black/10 border-gray-light
                  dark:enabled:hocus:bg-black-muted border bg-transparent
                  text-black dark:border-white/20 dark:text-white'>
                Replace
              </AvatarFileInput>
              <Button
                onClick={handleSave}
                disabled={isPending || !isDirty}>
                {isPending ? <Loader /> : 'Save'}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
