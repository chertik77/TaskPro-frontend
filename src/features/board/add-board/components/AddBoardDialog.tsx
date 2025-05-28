import type { ReactNode } from 'react'

import { useEffect, useRef, useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle
} from '@/shared/ui'

import { AddBoardForm } from './AddBoardForm'

type AddBoardDialogProps = {
  children: ReactNode
}

export const AddBoardDialog = ({ children }: AddBoardDialogProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const formContainerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleResize = () => {
      if (formContainerRef.current) {
        formContainerRef.current.style.setProperty(
          'bottom',
          `env(safe-area-inset-bottom)`
        )
      }
    }

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleResize)
      handleResize() // Initial call in case the keyboard is already open
    }

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleResize)
      }
    }
  }, [])

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={setIsDialogOpen}>
      {children}
      <DialogContent
        ref={formContainerRef}
        className='min-h-[70vh]'>
        <DialogTitle>New board</DialogTitle>
        <DialogDescription className='sr-only'>
          You can create a new board here by adding a title, icon and
          background.
        </DialogDescription>
        <AddBoardForm setIsDialogOpen={setIsDialogOpen} />
      </DialogContent>
    </Dialog>
  )
}
