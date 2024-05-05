import type { BoardSchemaFields } from 'lib/schemas'

import { Controller } from 'react-hook-form'
import { useModal } from 'react-modal-state'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { Button, Field, Modal } from 'components/ui'

import { useAppForm } from 'hooks'
import { useAddNewBoard } from 'hooks/board/useAddNewBoard'

import { boardSchema } from 'lib/schemas'

import { BackgroundImages } from './BackgroundImages'
import { Icons } from './Icons'

export const NewBoardModal = () => {
  const { close } = useModal('new-board-modal')

  const navigate = useNavigate()

  const { register, formState, reset, handleSubmit, control } =
    useAppForm<BoardSchemaFields>(boardSchema, {
      defaultValues: {
        icon: 'icon-project-1',
        background: 'default'
      }
    })

  const { mutateAsync, isPending } = useAddNewBoard()

  const submit = (data: BoardSchemaFields) => {
    toast.promise(mutateAsync(data), {
      loading: 'Creating board...',
      success: data => {
        close()
        reset()
        navigate(`/dashboard/${data._id}`)
        return 'Board successfully added to your collection!'
      },
      error: () =>
        'An error occurred while creating a board. Please try again later.'
    })
  }

  return (
    <Modal modalTitle='New board'>
      <form onSubmit={handleSubmit(submit)}>
        <Field
          {...register('title')}
          inputName='title'
          className={formState.errors ? 'mb-2' : 'violet:text-black'}
          placeholder='Title'
          errors={formState.errors}
        />
        <p className='mt-6'>Icons</p>
        <Controller
          control={control}
          name='icon'
          render={props => <Icons {...props} />}
        />
        <p className='mt-6'>Background</p>
        <Controller
          control={control}
          name='background'
          render={props => <BackgroundImages {...props} />}
        />
        <Button
          type='submit'
          isPlusIcon
          disabled={isPending}>
          {isPending ? 'Creating...' : 'Create'}
        </Button>
      </form>
    </Modal>
  )
}
