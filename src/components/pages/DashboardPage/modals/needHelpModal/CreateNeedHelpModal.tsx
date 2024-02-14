import { Button, Field, Modal } from 'components/ui'
import { useAppForm } from 'hooks'
import {
  needHelpSchema,
  type NeedHelpModal
} from 'lib/schemas/needHelpModal-schema'

export const CreateNeedHelpModal = () => {
  const { register, errors } = useAppForm<NeedHelpModal>(needHelpSchema)

  return (
    <Modal size='sm' modalTitle='Need help'>
      <Field
        {...register('email')}
        inputName='Email'
        placeholder='Email address'
        errors={errors}
        className='mb-6'
      />
      <Field
        {...register('comment')}
        inputName='Comment'
        placeholder='Comment'
        errors={errors}
        className='mb-6'
      />
      <Button onClick={e => console.log(e)}>Send</Button>
    </Modal>
  )
}
