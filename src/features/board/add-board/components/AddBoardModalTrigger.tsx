import { useModal } from 'react-modal-state'

import { Icon } from '@/shared/ui'

import { AddBoardModal } from './AddBoardModal'

export const AddBoardModalTrigger = () => {
  const { open: openNewBoardModal } = useModal(AddBoardModal)

  return (
    <button
      type='button'
      aria-label='Create new board'
      className='focus-visible:styled-outline flex h-9 w-10 items-center justify-center
        rounded-lg bg-brand text-black transition-all duration-300
        violet:bg-brand-violet-soft violet:text-white hocus:bg-brand-light
        violet:hocus:bg-brand-violet-muted'
      onClick={openNewBoardModal}>
      <Icon name='plus' />
    </button>
  )
}
