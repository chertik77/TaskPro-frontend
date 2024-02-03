import { cva } from 'class-variance-authority'

export const textAreaVariants = cva(
  'rounded-lg border border-brand border-opacity-40 violet:border-brand-secondary bg-transparent px-[18px] text-black dark:text-white placeholder:opacity-40 text-fs-14-lh-1.28-fw-400 outline-none focus:border-opacity-100 w-full',
  {
    variants: {
      size: {
        default: 'h-[154px]',
        'need-help': 'h-[120px]'
      }
    },
    defaultVariants: {
      size: 'default'
    }
  }
)
