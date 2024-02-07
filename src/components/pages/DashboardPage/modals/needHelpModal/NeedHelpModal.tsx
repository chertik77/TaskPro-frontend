import { Button, Field, Modal } from 'components/ui'
import { useBoard } from 'hooks/useBoard'

export const NeedHelpModal = () => {
  const { register, errors } = useBoard()

  return (
    <Modal size='sm' modalTitle='Need help'>
      <Field
        {...register('title')}
        inputName='Email'
        placeholder='Email address'
        errors={errors}
        className='mb-6'
      />
 <Field
        {...register('title')}
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
