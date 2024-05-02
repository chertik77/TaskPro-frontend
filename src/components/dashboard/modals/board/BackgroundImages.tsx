import type { BoardSchemaFields } from 'lib/schemas'
import type { ControllerRenderProps } from 'react-hook-form'

import { useTheme } from 'next-themes'

import images from 'lib/json/board-bg-images.json'

type BackgroundImagesProps = {
  field: ControllerRenderProps<BoardSchemaFields, 'background'>
}

export const BackgroundImages = (props: BackgroundImagesProps) => {
  const { theme } = useTheme()

  const getIconUrl = (icon: string | Record<string, string>) => {
    if (typeof icon === 'string') {
      return icon
    } else if (typeof icon === 'object') {
      return theme === 'dark' ? icon.dark : icon.light
    }
  }

  return (
    <ul className='mb-10 mt-[14px] flex max-w-[280px] flex-wrap gap-2'>
      {images.map(bg => (
        <li
          key={bg.id}
          className='inline-flex cursor-pointer items-center justify-between'>
          <input
            type='radio'
            name='background'
            defaultChecked={bg.id === 'default'}
            onChange={props.field.onChange}
            className='peer hidden size-full opacity-0'
            id={`background-${bg.id}`}
          />
          <label
            htmlFor={`background-${bg.id}`}
            className='peer-checked:*:scale-125'>
            <img
              width={28}
              height={28}
              className='cursor-pointer'
              src={getIconUrl(bg.icon)}
              alt={bg.id}
            />
          </label>
        </li>
      ))}
    </ul>
  )
}
