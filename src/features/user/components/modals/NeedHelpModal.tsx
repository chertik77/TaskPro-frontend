import { UserContracts } from 'shared/api/user'
import { Button, Field, Loader, Modal } from 'shared/components/ui'
import { useAppForm } from 'shared/hooks'
import { cn } from 'shared/lib'

import { useNeedHelp } from 'features/user/hooks'

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
            `mb-6 block h-5xl w-full resize-none rounded-lg border border-brand
            border-opacity-40 bg-transparent px-lg py-3.5 outline-none
            placeholder:opacity-40 focus:border-opacity-100 violet:border-brand-secondary
            violet:border-opacity-40 violet:focus:border-opacity-100`,
            formState.errors.comment && 'mb-2'
          )}
        />
        {formState.errors.comment && (
          <p className='mb-3.5 text-red-600'>
            {formState.errors.comment.message}
          </p>
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
