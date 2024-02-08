import { Button, Field, Modal } from 'components/ui'
import { useNeedHelp } from 'hooks/useNeedHelp.ts'

export const CreateNeedHelpModal = () => {
  const { register, errors } = useNeedHelp()

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
      <Button onClick={e => console.log(e)}>
        Send
      </Button>
    </Modal>
  )
}
