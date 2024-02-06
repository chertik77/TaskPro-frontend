import { cva } from 'class-variance-authority'

export const textAreaVariants = cva(
  'w-full rounded-lg border border-brand border-opacity-40 bg-transparent px-[18px] text-fs-14-lh-1.28-fw-400 text-black outline-none placeholder:opacity-40 focus:border-opacity-100 violet:border-brand-secondary dark:text-white',
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
