import icons from 'lib/json/board-icons.json'
// import type { ChangeEventHandler } from 'react'

type IconProps = {
  handleIconChange?: (selectedIcon: string) => void
}

export const Icons = ({ handleIconChange }: IconProps) => (
  <div className='mt-[14px] flex gap-2'>
    {icons.map(({ id }) => (
      <label className='relative cursor-pointer' key={id}>
        <input
          onChange={e => handleIconChange && handleIconChange(e.target.value)}
          defaultChecked={id === 'icon-project-1'}
          type='radio'
          className='absolute size-full opacity-0'
          value={id}
        />
        <svg className='size-[18px] opacity-50'>
          <use xlinkHref={`/assets/icons.svg#${id}`}></use>
        </svg>
      </label>
    ))}
  </div>
)
