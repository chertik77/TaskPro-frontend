import type { AxiosError } from 'axios'

import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

import { Button } from '@/shared/ui'

import { boardQueries } from '../api/queries'

export const BoardErrorView = ({ error }: { error: AxiosError }) => {
  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const isBoardNotFound = error.response?.status === 404

  const refetchBoard = () => {
    queryClient.refetchQueries({ queryKey: boardQueries.boardKey() })
  }

  const handleGoToDashboard = () => {
    navigate({ to: '/dashboard', replace: true })
  }

  return (
    <div className='flex h-full flex-col items-center justify-center'>
      <img
        src='https://res.cloudinary.com/dmbnnewoy/image/upload/v1748648905/TaskPro/sad-cactus.png'
        className='tablet:size-[162px] size-[124px]'
        alt='Sad cactus'
      />
      {isBoardNotFound ? (
        <>
          <h3 className='mb-6 text-xl'>Board Not Found.</h3>
          <p
            className='text-md tablet:w-[400px] tablet:text-base mb-9 w-84
              text-center text-black/70 dark:text-white/50'>
            The board you are looking for doesn&apos;t exist, or you don&apos;t
            have permission to view it. It might have been deleted, or the link
            you used is incorrect.
          </p>
          <Button
            className='w-[302px]'
            onClick={handleGoToDashboard}>
            Go to Dashboard
          </Button>
        </>
      ) : (
        <>
          <h3 className='mb-6 text-xl'>
            We&apos;re sorry, something went wrong.
          </h3>
          <p
            className='text-md tablet:w-[486px] tablet:text-base mb-9 w-84
              text-center text-black/70 dark:text-white/50'>
            This might be due to a temporary glitch, a network issue, or a
            problem on our end. Please try again or refresh the page, and if the
            problem persists, contact our support team — we’re here to help.
          </p>
          <Button
            className='w-[302px]'
            onClick={refetchBoard}>
            Try again
          </Button>
        </>
      )}
    </div>
  )
}
