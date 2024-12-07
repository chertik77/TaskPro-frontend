import { ErrorMessage } from '@hookform/error-message'
import { useModal } from 'react-modal-state'

import { Button, Field, Loader, Modal } from 'components/ui'

import { useAppForm } from 'hooks'
import { useNeedHelp } from 'hooks/user'

import { cn } from 'lib'
import { HelpSchema } from 'lib/schemas'

export const NeedHelpModal = () => {
  const { close } = useModal(NeedHelpModal)

  const { handleSubmit, register, formState, reset } = useAppForm(HelpSchema)

  const { mutate, isPending } = useNeedHelp(reset)

  return (
    <Modal
      modalTitle='Need help'
      onClose={() => {
        close()
        reset()
      }}>
      <form onSubmit={handleSubmit(data => mutate(data))}>
        <Field
          {...register('email')}
          inputName='email'
          placeholder='Email address'
          errors={formState.errors}
          className='mb-6'
        />
        <textarea
          {...register('comment')}
          placeholder='Comment'
          className={cn(
            `mb-6 h-5xl w-full resize-none rounded-lg border border-brand border-opacity-40
            bg-transparent px-lg py-3.5 outline-none placeholder:opacity-40
            focus:border-opacity-100 violet:border-brand-secondary violet:border-opacity-40
            violet:focus:border-opacity-100`,
            formState.errors && 'mb-sm'
          )}
        />
        <ErrorMessage
          errors={formState.errors}
          name='comment'
          render={({ message }) => (
            <p className='mb-3.5 text-red-600'>{message}</p>
          )}
        />
        <Button
          type='submit'
          disabled={isPending}>
          {isPending ? <Loader /> : 'Send'}
        </Button>
      </form>
    </Modal>
  )
}
