import type { ButtonHTMLAttributes } from 'react'

type FilterControlsProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  controlTitle: 'Label color' | 'Sort by'
  buttonTitle: 'Reset' | 'Show all'
}

export const FilterControls = ({
  controlTitle,
  buttonTitle,
  ...props
}: FilterControlsProps) => (
  <div className='my-3.5 flex justify-between'>
    <h3>{controlTitle}</h3>
    <button
      type='button'
      className='text-sm underline opacity-50 focus:outline-none hocus:text-brand-hover
        hocus:no-underline hocus:opacity-100 violet:hocus:text-brand-secondary'
      {...props}>
      {buttonTitle}
    </button>
  </div>
)
