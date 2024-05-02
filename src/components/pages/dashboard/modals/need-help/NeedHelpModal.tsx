import type { NeedHelpSchemaFields } from 'lib/schemas'

import { Button, Field, Modal } from 'components/ui'
import { useAppForm } from 'hooks'
import { useNeedHelp } from 'hooks/useNeedHelp'
import { needHelpSchema } from 'lib/schemas'
import { useModal } from 'react-modal-state'

export const NeedHelpModal = () => {
  const { close } = useModal('need-help-modal')

  const { handleSubmit, register, formState, reset } =
    useAppForm<NeedHelpSchemaFields>(needHelpSchema)

  const { mutate, isPending } = useNeedHelp(close, reset)

  return (
    <Modal
      size='sm'
      modalTitle='Need help'>
      <form onSubmit={handleSubmit(data => mutate(data))}>
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
            border-opacity-40 bg-transparent px-[18px] py-[14px] text-fs-14-lh-1.28-fw-400
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
