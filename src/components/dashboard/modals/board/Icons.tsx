import type { BoardSchemaFields } from 'lib/schemas'
import type { ControllerRenderProps } from 'react-hook-form'

import icons from 'lib/json/board-icons.json'

type IconsProps = {
  field: ControllerRenderProps<BoardSchemaFields, 'icon'>
}

export const Icons = (props: IconsProps) => (
  <ul className='mt-default flex gap-2'>
    {icons.map(({ id }, index) => (
      <li
        key={id}
        className='inline-flex items-center justify-between text-gray-500 hover:text-gray-600
          dark:text-gray-400 dark:hover:text-gray-300'>
        <input
          type='radio'
          id={id}
          name='icon'
          value={id}
          className='peer hidden size-full'
          onChange={props.field.onChange}
          defaultChecked={index === 0 || props.field.value === id}
        />
        <label
          htmlFor={id}
          className='inline-flex cursor-pointer items-center stroke-current peer-checked:text-black
            peer-checked:opacity-100 dark:peer-checked:text-white
            dark:peer-checked:opacity-100'>
          <svg className='size-[18px] stroke-current'>
            <use href={`/icons.svg#${id}`}></use>
          </svg>
        </label>
      </li>
    ))}
  </ul>
)
