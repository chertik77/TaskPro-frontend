import type { AvatarEditorRef, Position } from 'react-avatar-editor'

import { useRef, useState } from 'react'
import { useMotionValue, useMotionValueEvent, useSpring } from 'motion/react'

import { toast } from '@/shared/lib'

import {
  ALLOWED_AVATAR_TYPES,
  MAX_AVATAR_SIZE,
  MAX_SCALE,
  MIN_SCALE
} from '../config/avatar'

const CENTERED_POSITION: Position = { x: 0.5, y: 0.5 }

export const useAvatarEditor = () => {
  const [image, setImage] = useState<File | string | null>(null)
  const [isImageReplaced, setIsImageReplaced] = useState(false)
  const [scale, setScale] = useState(MIN_SCALE)
  const [quarterTurns, setQuarterTurns] = useState(0)
  const [position, setPosition] = useState(CENTERED_POSITION)
  const [rotate, setRotate] = useState(0)

  const editorRef = useRef<AvatarEditorRef>(null)

  const targetRotate = useMotionValue(0)
  const rotateSpring = useSpring(targetRotate, { stiffness: 200, damping: 25 })

  useMotionValueEvent(rotateSpring, 'change', setRotate)

  const isDirty =
    isImageReplaced ||
    scale !== MIN_SCALE ||
    quarterTurns % 4 !== 0 ||
    position.x !== CENTERED_POSITION.x ||
    position.y !== CENTERED_POSITION.y

  const resetTransforms = () => {
    setScale(MIN_SCALE)
    setQuarterTurns(0)
    setPosition(CENTERED_POSITION)
    targetRotate.jump(0)
    rotateSpring.jump(0)
    setRotate(0)
  }

  const resetTo = (nextImage: File | string | null) => {
    setImage(nextImage)
    setIsImageReplaced(false)
    resetTransforms()
  }

  const selectImage = (file: File) => {
    if (!ALLOWED_AVATAR_TYPES.includes(file.type)) {
      return toast.error('Avatar must be a .jpeg, .png or .webp image.')
    }

    if (file.size > MAX_AVATAR_SIZE) {
      return toast.error('Avatar must be 5MB or less.')
    }

    resetTo(file)
    setIsImageReplaced(true)
  }

  const changeScale = (nextScale: number) => setScale(nextScale)

  const zoomBy = (delta: number) =>
    setScale(prevScale =>
      Math.min(MAX_SCALE, Math.max(MIN_SCALE, prevScale + delta))
    )

  const rotateClockwise = () => {
    setQuarterTurns(prevTurns => prevTurns + 1)
    targetRotate.set(targetRotate.get() + 90)
  }

  const getCroppedAvatar = (onCropped: (avatar: Blob) => void) =>
    editorRef.current?.getImageScaledToCanvas().toBlob(blob => {
      if (!blob) {
        return toast.error('We couldn’t process this image. Please try again.')
      }

      onCropped(blob)
    }, 'image/webp')

  return {
    image,
    scale,
    rotate,
    isDirty,
    editorRef,
    changeScale,
    zoomBy,
    selectImage,
    rotateClockwise,
    setPosition,
    resetTo,
    getCroppedAvatar
  }
}
