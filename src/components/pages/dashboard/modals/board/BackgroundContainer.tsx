import { useImageBg } from 'hooks'
import images from 'lib/json/board-bg-images.json'
import type { ControllerRenderProps } from 'react-hook-form'

type BackgroundProps = {
  field: ControllerRenderProps<
    { icon: string; title: string; background: string },
    'background'
  >
}

export const BackgroundContainer = (props: BackgroundProps) => {
  return (
    <ul className='mb-10 mt-[14px] flex max-w-[280px] flex-wrap gap-1'>
      {images.map(bg => {
        const srcset = useImageBg(bg.id)?.srcset

        return (
          <li
            key={bg.id}
            className='inline-flex cursor-pointer items-center justify-between'>
            <input
              type='radio'
              name='background'
              defaultChecked={bg.id === 'default'}
              value={srcset}
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
                srcSet={`${bg.icon['@1x'] || bg.icon.light?.['@1x']} 1x, ${
                  bg.icon['@2x'] || bg.icon.light?.['@2x']
                } 2x`}
                src={`${bg.icon['@1x'] || bg.icon.light?.['@1x']}`}
                style={{ cursor: 'pointer' }}
                alt={bg.id}
              />
            </label>
          </li>
        )
      })}
    </ul>
  )
}
