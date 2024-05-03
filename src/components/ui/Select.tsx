import type {
  SelectContentProps,
  SelectTriggerProps
} from '@radix-ui/react-select'

import { Content, Root, Trigger } from '@radix-ui/react-select'

const SelectTrigger = ({ children, className }: SelectTriggerProps) => (
  <Trigger className={className}>{children}</Trigger>
)

const SelectContent = ({ children, className }: SelectContentProps) => (
  <Content
    className={className}
    position='popper'>
    {children}
  </Content>
)

export const Select = Object.assign(Root, {
  Trigger: SelectTrigger,
  Content: SelectContent
})
