import { Button, Field, Modal } from 'components/ui'
import { useAppForm } from 'hooks'
import {
  needHelpSchema,
  type NeedHelpSchemaFields
} from 'lib/schemas/need-help-schema'
import { useNeedHelpMutation } from 'redux/api/dashboard/dashboard.ts'

export const NeedHelpModal = () => {
  const { handleSubmit, register, errors, isValid } =
    useAppForm<NeedHelpSchemaFields>(needHelpSchema)
  const [createHelp, { isLoading }] = useNeedHelpMutation()

  const submit = (data: NeedHelpSchemaFields) => {
    createHelp(data)
  }

  return (
    <Modal size='sm' modalTitle='Need help'>
      <form onSubmit={handleSubmit(submit)}>
        <Field
          {...register('email')}
          inputName='Email'
          placeholder='Email address'
          errors={errors}
          className='mb-6 autofill:text-fill-black'
        />
        <textarea
          {...register('comment')}
          placeholder='Comment'
          className='mb-[24px] h-[154px] w-full resize-none rounded-lg border border-brand border-opacity-40 bg-transparent px-[18px] py-[14px] text-fs-14-lh-1.28-fw-400 text-black outline-none placeholder:opacity-40 focus:border-opacity-100 violet:border-brand-secondary dark:text-white'
        />
        <Button type='submit' disabled={!isValid || isLoading}>
          {isLoading ? 'Sending...' : 'Send'}
        </Button>
      </form>
    </Modal>
  )
}
