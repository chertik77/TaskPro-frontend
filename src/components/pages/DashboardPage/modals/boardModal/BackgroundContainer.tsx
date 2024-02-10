import images from 'lib/json/board-bg-images.json'
import type { ChangeEventHandler } from 'react'

type BackgroundContainerProps = {
  handleBgChange?: ChangeEventHandler<HTMLInputElement>
}

export const BackgroundContainer = ({
  handleBgChange
}: BackgroundContainerProps) => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
    if (handleBgChange) {
      handleBgChange(event)
    }
  }

  return (
    <ul className='mb-10 mt-[14px] flex max-w-[280px] flex-wrap gap-1'>
      {images.map(bg => (
        <li
          key={bg.id}
          className='inline-flex cursor-pointer items-center justify-between'>
          <input
            type='radio'
            name='background'
            defaultChecked={bg.id === 'default'}
            value={bg.icon?.['@1x'] || bg.icon?.light?.['@1x']}
            onChange={handleChange}
            className='peer hidden size-full opacity-0'
            id={`background-${bg.id}`}
          />
          <label
            htmlFor={`background-${bg.id}`}
            className='peer-checked:border-blue-600'>
            <img
              width={28}
              height={28}
              srcSet={`${bg.icon['@1x'] || bg.icon.light?.['@1x']} 1x, ${
                bg.icon['@2x'] || bg.icon.light?.['@2x']
              } 2x`}
              src={`${bg.icon['@1x'] || bg.icon.light?.['@1x']}`}
              style={{ cursor: 'pointer' }}
              alt={bg.id}
            />
          </label>
        </li>
      ))}
    </ul>
  )
}
