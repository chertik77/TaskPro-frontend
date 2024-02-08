import arr from 'lib/json/board-bg-images.json'
import type { ChangeEventHandler } from 'react'

type BackgroundContainerProps = {
  handleBgChange?: ChangeEventHandler<HTMLInputElement>
}

export const BackgroundContainer = ({
  handleBgChange
}: BackgroundContainerProps) => {
  return (
    <ul className='mb-10 mt-[14px] flex max-w-[280px] flex-wrap gap-1'>
      {arr.map((bg, i) => (
        <li
          key={i}
          className='inline-flex cursor-pointer items-center justify-between'>
          <input
            type='radio'
            name='background'
            defaultChecked={i === 0}
            value={bg.icon['@1x'] || bg.icon.light?.['@1x']}
            onChange={handleBgChange}
            className='peer hidden size-full opacity-0'
            id={`background-${i}`}
          />
          <label
            htmlFor={`background-${i}`}
            className='peer-checked:border-blue-600'>
            <img
              width={28}
              height={28}
              srcSet={`${bg.icon['@1x'] || bg.icon.light?.['@1x']} 1x, ${bg.icon['@2x'] || bg.icon.light?.['@2x']} 2x`}
              src={`${bg.icon['@1x'] || bg.icon.light?.['@1x']}`}
              style={{ cursor: 'pointer' }}
            />
          </label>
        </li>
      ))}
    </ul>
  )
}
