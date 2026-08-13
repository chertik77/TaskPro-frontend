import { Slider as SliderPrimitive } from '@base-ui/react/slider'

import { cn } from '../lib'

export const Slider = <Value extends number | readonly number[]>({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: SliderPrimitive.Root.Props<Value>) => {
  const values = Array.isArray(value)
    ? value
    : Array.isArray(defaultValue)
      ? defaultValue
      : [min, max]

  return (
    <SliderPrimitive.Root
      className={cn(
        `data-[orientation=horizontal]:w-full
        data-[orientation=vertical]:h-full`,
        className
      )}
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      thumbAlignment='edge'
      {...props}>
      <SliderPrimitive.Control
        className='relative flex w-full cursor-pointer touch-none items-center
          select-none data-disabled:cursor-not-allowed data-disabled:opacity-50
          data-[orientation=vertical]:h-full
          data-[orientation=vertical]:min-h-40
          data-[orientation=vertical]:w-auto
          data-[orientation=vertical]:flex-col'>
        <SliderPrimitive.Track
          className='dark:bg-gray/15 relative grow overflow-hidden rounded-full
            bg-black/10 select-none data-[orientation=horizontal]:h-2
            data-[orientation=horizontal]:w-full
            data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2'>
          <SliderPrimitive.Indicator
            className='bg-accent select-none
              data-[orientation=horizontal]:h-full
              data-[orientation=vertical]:w-full'
          />
        </SliderPrimitive.Track>
        {values.map((_, index) => (
          <SliderPrimitive.Thumb
            key={index}
            className='bg-accent focus-visible:styled-outline relative block
              size-5 shrink-0 cursor-pointer rounded-full select-none
              after:absolute after:-inset-2 disabled:pointer-events-none
              disabled:cursor-not-allowed disabled:opacity-50'
          />
        ))}
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  )
}
