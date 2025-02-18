import { Button } from '@/shared/components'

import { useDeleteCard } from '../hooks/useDeleteCard'

export const DeleteCardTrigger = ({ cardId }: { cardId: string }) => {
  const { mutate: deleteCard } = useDeleteCard()

  return (
    <Button
      onClick={() => deleteCard(cardId)}
      aria-label='Delete card'
      iconName='trash'
    />
  )
}
