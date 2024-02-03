import { ButtonProps } from './button-types'

export const Button = ({ isAddIcon, children, ...props }: ButtonProps) => (
  <button
    className='rounded-lg bg-brand violet:bg-brand-secondary w-full h-[49px] text-black violet:text-white'
    {...props}>
    {isAddIcon ? (
      <div className='flex items-center justify-center gap-2'>
        <svg
          width='28'
          height='28'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'>
          <path
            className='fill-black violet:fill-white'
            d='M22 0H6a6 6 0 0 0-6 6v16a6 6 0 0 0 6 6h16a6 6 0 0 0 6-6V6a6 6 0 0 0-6-6Z'
          />
          <path
            d='M14 9.917v8.166M9.916 14h8.167'
            className='stroke-white violet:stroke-brand-secondary'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
        {children}
      </div>
    ) : (
      children
    )}
  </button>
)
