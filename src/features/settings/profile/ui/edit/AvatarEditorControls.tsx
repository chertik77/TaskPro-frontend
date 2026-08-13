import { RotateCwIcon } from 'lucide-react'

import { Slider } from '@/shared/ui'

import { MAX_SCALE, MIN_SCALE } from '../../config/avatar'

type AvatarEditorControlsProps = {
  scale: number
  onScaleChange: (scale: number) => void
  onRotate: () => void
}

export const AvatarEditorControls = ({
  scale,
  onScaleChange,
  onRotate
}: AvatarEditorControlsProps) => (
  <div className='mt-5 flex items-center gap-3'>
    <Slider
      value={scale}
      onValueChange={onScaleChange}
      min={MIN_SCALE}
      max={MAX_SCALE}
      step={0.01}
      aria-label='Zoom'
    />
    <button
      type='button'
      aria-label='Rotate avatar'
      onClick={onRotate}
      className='focus-visible:styled-outline dark:text-white-soft
        hocus:[&_svg]:opacity-100 shrink-0 cursor-pointer text-black
        [&_svg]:size-5 [&_svg]:opacity-50 [&_svg]:transition-opacity'>
      <RotateCwIcon />
    </button>
  </div>
)
