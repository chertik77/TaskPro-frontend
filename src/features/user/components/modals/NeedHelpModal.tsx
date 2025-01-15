import { cn } from 'shared/lib/cn'
import { Button } from 'shared/ui/button'
import { Field } from 'shared/ui/field'
import { Loader } from 'shared/ui/loader'
import { Modal } from 'shared/ui/modal'

import { useNeedHelp } from 'features/user/hooks'
import { HelpSchema } from 'features/user/user.schema'

import { useAppForm } from 'hooks'

export const NeedHelpModal = () => {
  const { handleSubmit, register, formState, reset } = useAppForm(HelpSchema)

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
