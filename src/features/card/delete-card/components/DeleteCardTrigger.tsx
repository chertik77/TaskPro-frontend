import { Icon } from '@/shared/ui'

import { useDeleteCard } from '../hooks/useDeleteCard'

export const DeleteCardTrigger = ({ cardId }: { cardId: string }) => {
  const { mutate: deleteCard } = useDeleteCard()

  return (
    <button
      type='button'
      className='focus-visible:styled-outline hocus:[&_svg]:stroke-black
        violet:hocus:[&_svg]:stroke-black dark:hocus:[&_svg]:stroke-white-soft'
      onClick={() => deleteCard({ cardId })}
      aria-label='Delete card'>
      <Icon
        name='trash'
        className='size-4 stroke-black/50 dark:stroke-white-soft/50'
      />
    </button>
  )
}
