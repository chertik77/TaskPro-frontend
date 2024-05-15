import type { NeedHelpSchemaFields } from 'lib/schemas'

import { useModal } from 'react-modal-state'
import { toast } from 'sonner'

import { Button, Field, Modal } from 'components/ui'

import { useAppForm, useAppMutation } from 'hooks'

import { userService } from 'services'

import { needHelpSchema } from 'lib/schemas'

export const NeedHelpModal = () => {
  const { close } = useModal(NeedHelpModal)

  const { handleSubmit, register, formState, reset } =
    useAppForm<NeedHelpSchemaFields>(needHelpSchema)

  const { mutateAsync, isPending } = useAppMutation<NeedHelpSchemaFields>({
    mutationKey: ['help'],
    mutationFn: data => userService.askForHelp(data)
  })

  const submit = (data: NeedHelpSchemaFields) => {
    toast.promise(mutateAsync(data), {
      loading: 'Sending...',
      success: () => {
        reset()
        close()
        return 'Your help request has been sent successfully! Our team will get back to you shortly.'
      },
      error: () => 'Oops! Something went wrong while sending your help request.'
    })
  }

  return (
    <Modal modalTitle='Need help'>
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
            border-opacity-40 bg-transparent px-[18px] py-default text-fs-14-lh-1.28-fw-400
            text-black outline-none placeholder:opacity-40 focus:border-opacity-100
            violet:border-brand-secondary dark:text-white'
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
