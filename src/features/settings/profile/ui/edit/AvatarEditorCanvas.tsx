import type { RefObject } from 'react'
import type { AvatarEditorRef, Position } from 'react-avatar-editor'

import { useRef } from 'react'
import AvatarEditor from 'react-avatar-editor'

import { useSettings } from '@/entities/setting'

import { resolveTheme } from '@/shared/config'

import { EDITOR_COLORS, EDITOR_SIZE } from '../../config/avatar'

type AvatarEditorCanvasProps = {
  ref: RefObject<AvatarEditorRef | null>
  image: File | string
  scale: number
  rotate: number
  onPositionChange: (position: Position) => void
}

export const AvatarEditorCanvas = ({
  ref,
  image,
  scale,
  rotate,
  onPositionChange
}: AvatarEditorCanvasProps) => {
  const { data: theme } = useSettings(state => state.general.theme)

  const colors = EDITOR_COLORS[resolveTheme(theme)]

  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={containerRef}
      className='mx-auto w-fit touch-none'>
      <AvatarEditor
        ref={ref}
        image={image}
        width={EDITOR_SIZE}
        height={EDITOR_SIZE}
        border={20}
        borderRadius={16}
        color={colors.mask}
        borderColor={colors.border}
        backgroundColor={colors.background}
        scale={scale}
        rotate={rotate}
        enableWheelZoom
        crossOrigin='anonymous'
        onPositionChange={onPositionChange}
        style={{ touchAction: 'none', borderRadius: 8 }}
      />
    </div>
  )
}
