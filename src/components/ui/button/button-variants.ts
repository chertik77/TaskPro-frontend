import { cva } from 'class-variance-authority'

export const buttonVariants = cva(
  'rounded-lg bg-brand violet:bg-brand-secondary w-full h-[49px]',
  {
    variants: {
      variant: {
        ghost: 'w-4 h-4 bg-transparent'
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        modal: 'w-full'
      }
    }
    // defaultVariants: {
    //   variant: 'default',
    //   size: 'default'
    // }
  }
)
