import type { InputHTMLAttributes } from 'react'

export type RadioProps = InputHTMLAttributes<HTMLInputElement> & {
  value: 'Low' | 'Medium' | 'High' | 'Without priority'
  color:
    | 'bg-priority-low'
    | 'bg-priority-medium'
    | 'bg-brand'
    | 'bg-black/30 dark:bg-white/30'
}
