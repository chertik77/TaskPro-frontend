import icons from 'lib/json/board-icons.json'
import type { ChangeEventHandler } from 'react'

type IconProps = {
  handleIconChange: ChangeEventHandler<HTMLInputElement>
}

export const Icons = ({ handleIconChange }: IconProps) => (
  <div className='mt-[14px] flex gap-2'>
    {icons.map(({ id }) => (
      <label className='relative cursor-pointer' key={id}>
        <input
          onChange={handleIconChange}
          defaultChecked={id === 'icon-project-1'}
          type='radio'
          className='peer absolute size-full opacity-0'
          value={id}
        />
        <svg className='size-[18px] opacity-50 peer-checked:stroke-black'>
          <use xlinkHref={`/assets/icons.svg#${id}`}></use>
        </svg>
      </label>
    ))}
  </div>
)
