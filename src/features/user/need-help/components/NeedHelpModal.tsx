import { UserContracts } from '@/entities/user'

import { useAppForm } from '@/shared/hooks'
import { cn } from '@/shared/lib/cn'
import { Button, Field, Loader, Modal } from '@/shared/ui'

import { useNeedHelp } from '../hooks/useNeedHelp'

export const NeedHelpModal = () => {
  const { handleSubmit, register, formState, reset } = useAppForm(
    UserContracts.HelpSchema
  )

  const { mutate: sendHelpRequest, isPending } = useNeedHelp(reset)

  return (
    <Modal modalTitle='Need help'>
      <form onSubmit={handleSubmit(data => sendHelpRequest(data))}>
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
            `mb-6 block h-[154px] w-full resize-none rounded-lg border border-brand/40
            bg-transparent px-4.5 py-3.5 outline-none placeholder:opacity-40
            focus:border-brand violet:border-brand-violet/40
            violet:focus:border-brand-violet`,
            formState.errors.comment && 'mb-2'
          )}
        />
        {formState.errors.comment && (
          <p className='mb-3.5 text-red'>{formState.errors.comment.message}</p>
        )}
        <Button
          type='submit'
          disabled={isPending}>
          {isPending ? <Loader /> : 'Send'}
        </Button>
      </form>
    </Modal>
  )
}
