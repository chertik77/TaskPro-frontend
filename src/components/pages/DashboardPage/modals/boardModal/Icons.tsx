import icons from 'lib/json/board-icons.json'
import { ChangeEventHandler } from 'react'

type IconProps = {
  handleIconChange?: ChangeEventHandler<HTMLInputElement>
}

export const Icons = ({ handleIconChange }: IconProps) => (
  <ul className='mt-[14px] flex gap-2'>
    {icons.map(({ id }, index) => (
      <li
        key={id}
        className='inline-flex items-center justify-between text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300'>
        <input
          type='radio'
          id={id}
          name='icon'
          value={id}
          className='peer hidden size-full'
          onChange={handleIconChange}
          defaultChecked={index === 0}
        />
        <label
          htmlFor={id}
          className='inline-flex cursor-pointer items-center peer-checked:text-black peer-checked:opacity-100 dark:peer-checked:text-white dark:peer-checked:opacity-100'>
          <svg className='size-[18px] stroke-current'>
            <use xlinkHref={`/assets/icons.svg#${id}`}></use>
          </svg>
        </label>
      </li>
    ))}
  </ul>
)
