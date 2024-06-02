import { ErrorMessage } from '@hookform/error-message'
import { useModal } from 'react-modal-state'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'

import { Button, Field, Modal } from 'components/ui'

import { useAppForm, useAppMutation } from 'hooks'

import { selectUser } from 'redux/user.slice'

import { userService } from 'services'

import { cn } from 'lib'
import { HelpSchema } from 'lib/schemas'

export const NeedHelpModal = () => {
  const { close } = useModal(NeedHelpModal)

  const { email } = useSelector(selectUser)

  const { handleSubmit, register, formState, reset } = useAppForm<HelpSchema>(
    HelpSchema,
    { defaultValues: { email } }
  )

  const { mutateAsync, isPending } = useAppMutation<HelpSchema>({
    mutationKey: ['help'],
    mutationFn: data => userService.askForHelp(data)
  })

  const submit = (data: HelpSchema) => {
    toast.promise(mutateAsync(data), {
      loading: 'Sending...',
      success: () => {
        reset()
        close()
        return 'Your help request has been sent successfully!'
      },
      error: 'Oops! Something went wrong while sending your help request.'
    })
  }

  return (
    <Modal
      modalTitle='Need help'
      onClose={() => {
        close()
        reset()
      }}>
      <form onSubmit={handleSubmit(submit)}>
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
            `mb-6 h-[154px] w-full resize-none rounded-lg border border-brand
            border-opacity-40 bg-transparent px-[18px] py-3.5 text-black outline-none
            placeholder:opacity-40 focus:border-opacity-100 violet:border-brand-secondary
            violet:border-opacity-40 violet:focus:border-opacity-100 dark:text-white`,
            formState.errors && 'mb-[10px]'
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
          {isPending ? 'Loading...' : 'Send'}
        </Button>
      </form>
    </Modal>
  )
}
