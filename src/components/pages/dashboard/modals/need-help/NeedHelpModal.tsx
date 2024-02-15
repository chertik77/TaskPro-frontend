import { Button, Field, Modal } from 'components/ui'
import { useAppForm } from 'hooks'
import { needHelpSchema, type NeedHelpSchemaFields } from 'lib/schemas'
import { handleErrorToast, handleSuccessToast } from 'lib/toasts'
import { cn } from 'lib/utils'
import { useModal } from 'react-modal-state'
import { useNeedHelpMutation } from 'redux/api/dashboard/dashboard'

export const NeedHelpModal = () => {
  const [createHelp, { isLoading }] = useNeedHelpMutation()
  const { close } = useModal('need-help-modal')
  const { handleSubmit, register, errors, isValid, reset } =
    useAppForm<NeedHelpSchemaFields>(needHelpSchema)

  const submit = (data: NeedHelpSchemaFields) => {
    createHelp(data)
      .unwrap()
      .then(() => {
        reset()
        close()
        handleSuccessToast(
          'Your help request has been sent successfully! Our team will get back to you shortly.'
        )
      })
      .catch(() => {
        handleErrorToast(
          'Oops! Something went wrong while sending your help request. Please try again.'
        )
      })
  }

  return (
    <Modal size='sm' modalTitle='Need help'>
      <form onSubmit={handleSubmit(submit)}>
        <Field
          {...register('email')}
          inputName='email'
          placeholder='Email address'
          errors={errors}
          className='mb-6 autofill:text-fill-bltext-black dark:text-white'
        />
        <textarea
          {...register('comment')}
          placeholder='Comment'
          className={cn(
            'mb-[24px] h-[154px] w-full resize-none rounded-lg border border-brand border-opacity-40 bg-transparent px-[18px] py-[14px] text-fs-14-lh-1.28-fw-400 text-black outline-none placeholder:opacity-40 focus:border-opacity-100 violet:border-brand-secondary dark:text-white'
          )}
        />
        <Button type='submit' disabled={!isValid || isLoading}>
          {isLoading ? 'Loading...' : 'Send'}
        </Button>
      </form>
    </Modal>
  )
}
