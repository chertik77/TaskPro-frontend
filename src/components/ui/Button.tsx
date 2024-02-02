import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from 'lib/utils'
import { forwardRef, type ButtonHTMLAttributes } from 'react'

const buttonVariants = cva('', {
  variants: {
    variant: {
      default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
      destructive:
        'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
      outline:
        'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
      secondary:
        'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
      ghost: 'w-4 h-4 bg-transparent'
    },
    size: {
      default: 'h-9 px-4 py-2',
      sm: 'h-8 rounded-md px-3 text-xs',
      lg: 'h-10 rounded-md px-8',
      icon: 'h-9 w-9'
    }
  },
  defaultVariants: {
    variant: 'default',
    size: 'default'
  }
})

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size }))}
        ref={ref}
        {...props}>
        {children}
      </button>
    )
  }
)
