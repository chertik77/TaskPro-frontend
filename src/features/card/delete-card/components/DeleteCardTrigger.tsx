import { Card } from '@/entities/card'

import { Icon } from '@/shared/ui'

import { useDeleteCard } from '../hooks/useDeleteCard'

export const DeleteCardTrigger = ({ cardId }: { cardId: string }) => {
  const { mutate: deleteCard } = useDeleteCard()

  return (
    <Card.ActionButton
      onClick={() => deleteCard({ cardId })}
      aria-label='Delete card'>
      <Icon name='trash' />
    </Card.ActionButton>
  )
}
