import { cva } from 'class-variance-authority'

export const modalVariants = cva(
  'm-0 shadow-none rounded-lg dark:bg-black p-6',
  {
    variants: {
      size: {
        sm: 'w-[335px]',
        default: 'w-[350px]',
        md: 'w-[400px]'
      }
    },
    defaultVariants: {
      size: 'default'
    }
  }
)
