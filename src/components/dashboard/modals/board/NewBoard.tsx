import type { BoardSchemaFields } from 'lib/schemas'

import { Controller } from 'react-hook-form'

import { Button, Field, Modal } from 'components/ui'

import { useAppForm } from 'hooks'
import { useAddNewBoard } from 'hooks/board/useAddNewBoard'

import { boardSchema } from 'lib/schemas'

import { BackgroundImages } from './BackgroundImages'
import { Icons } from './Icons'

export const NewBoardModal = () => {
  const { register, formState, reset, handleSubmit, control } =
    useAppForm<BoardSchemaFields>(boardSchema, {
      defaultValues: {
        icon: 'icon-project-1',
        background: 'default'
      }
    })

  const { mutateAsync, isPending } = useAddNewBoard(reset)

  const submit = (data: BoardSchemaFields) => {
    mutateAsync(data)
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
          isAddIcon
          iconName='plus'
          disabled={isPending}>
          {isPending ? 'Creating...' : 'Create'}
        </Button>
      </form>
    </Modal>
  )
}
