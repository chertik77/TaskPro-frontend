import { Card } from '@/entities/card'

import { DialogTrigger, Icon } from '@/shared/ui'

export const EditCardDialogTrigger = () => (
  <DialogTrigger asChild>
    <Card.ActionButton aria-label='Edit card'>
      <Icon name='pencil' />
    </Card.ActionButton>
  </DialogTrigger>
)
