import { Button } from '@/shared/components/ui'

import { useDeleteCard } from '../hooks'

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
