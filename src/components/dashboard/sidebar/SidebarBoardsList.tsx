import { Item, Root } from '@radix-ui/react-radio-group'
import { useQuery } from '@tanstack/react-query'
import { useSidebar } from 'contexts/sidebar.context'
import { useModal } from 'react-modal-state'
import { useNavigate } from 'react-router-dom'

import { Loader } from 'components/ui'

import { useGetBoardId } from 'hooks/board'

import { Pages } from 'config'
import { boardService } from 'services'

import { cn } from 'lib'

import { BurgerMenu } from '../modals'
import { SidebarListActiveItem } from './SidebarListActiveItem'

export const SidebarBoardsList = () => {
  const { isSidebarOpen } = useSidebar()

  const boardId = useGetBoardId()

  const navigate = useNavigate()

  const { close: closeBurgerMenu } = useModal(BurgerMenu)

  const { data, isPending } = useQuery({
    queryKey: ['boards'],
    queryFn: () => boardService.getAllBoards()
  })

  return isPending ? (
    <div className='flex h-4xl items-center gap-2 pl-3.5 violet:text-white tablet:pl-6'>
      <Loader className='size-5' />
      Loading your boards...
    </div>
  ) : (
    <Root
      value={boardId}
      onValueChange={v => {
        navigate(`${Pages.Dashboard}/${v}`)
        closeBurgerMenu()
      }}
      className={cn(
        isSidebarOpen ? 'mb-0' : 'mb-20',
        data?.length === 0 && 'mb-auto',
        'text-base'
      )}>
      {data?.map(board => (
        <Item
          className={cn(
            `flex h-4xl w-full items-center justify-between pl-7 text-black/50 transition-all
            duration-300 ease-in-out focus:outline-none aria-checked:bg-white-gray
            aria-checked:text-black violet:text-white/50 aria-checked:violet:bg-white/50
            aria-checked:violet:text-white dark:text-white/50
            aria-checked:dark:bg-black-third aria-checked:dark:text-white`,
            isSidebarOpen && 'pl-3.5 transition-all duration-300 tablet:pl-6'
          )}
          checked={board.id === boardId}
          key={board.id}
          value={board.id}>
          <div className='flex items-center gap-1 tablet:gap-2'>
            <svg
              className={cn(
                'size-6 stroke-current transition-all duration-300 ease-in-out',
                isSidebarOpen && 'size-lg'
              )}>
              <use href={`/icons.svg#${board.icon}`} />
            </svg>
            {isSidebarOpen && (
              <p className='w-[105px] truncate text-left tablet:w-[122px]'>
                {board?.title}
              </p>
            )}
          </div>
          {board.id === boardId && <SidebarListActiveItem board={board} />}
        </Item>
      ))}
    </Root>
  )
}
