import { useModal } from 'react-modal-state'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'

import { Button, Field, Modal } from 'components/ui'

import { useAppForm, useAppMutation } from 'hooks'

import { selectUser } from 'redux/user.slice'

import { userService } from 'services'

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
          className='mb-6 text-black autofill:text-fill-black dark:text-white
            dark:autofill:text-fill-white'
        />
        <textarea
          {...register('comment')}
          placeholder='Comment'
          className='mb-[24px] h-[154px] w-full resize-none rounded-lg border border-brand
            border-opacity-40 bg-transparent px-[18px] py-default text-black outline-none
            placeholder:opacity-40 focus:border-opacity-100 violet:border-brand-secondary
            dark:text-white'
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
