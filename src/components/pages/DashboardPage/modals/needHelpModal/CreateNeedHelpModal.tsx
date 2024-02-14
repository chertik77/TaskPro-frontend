import { Button, Field, Modal } from 'components/ui'
import { useNeedHelp } from 'hooks/useNeedHelp.ts'

export const CreateNeedHelpModal = () => {
  const { register, errors,isValid } = useNeedHelp()

  return (
    <Modal size='md' modalTitle='Need help'>
      <Field
        {...register('email')}
        inputName='email'
        placeholder='Email address'
        errors={errors}
        className=''
      />
  <div className='relative mt-[14px] mb-6'>
          <textarea
            placeholder='Comment'
            {...register('comment')}
            className='h-[120px] w-full resize-none rounded-lg border border-brand border-opacity-40 bg-transparent px-[18px] py-[14px] text-fs-14-lh-1.28-fw-400 text-black outline-none placeholder:opacity-40 focus:border-opacity-100 violet:border-brand-secondary dark:text-white'
          />
          {errors.comment && (
            <span className=' text-red-600'>
              Please enter at least 5 characters.
            </span>
          )}
        </div>
      <Button  onClick={e => console.log(e)}  disabled={!isValid}>
        Send
      </Button>
    </Modal>
  )
}
