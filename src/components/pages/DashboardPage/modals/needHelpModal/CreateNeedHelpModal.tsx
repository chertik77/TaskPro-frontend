import { Button, Field, Modal } from 'components/ui';
import { useNeedHelp } from 'hooks/useNeedHelp.ts';
import axios from 'axios';

export const CreateNeedHelpModal = () => {
  const { register, errors, isValid } = useNeedHelp();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      await axios.post('api/dashboard/help', {
        email: formData.get('email'),
        comment: formData.get('comment')
      });
      console.log('Data sent successfully');
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  return (
    <Modal size='sm' modalTitle='Need help'>
      <form onSubmit={handleSubmit}>
        <Field
          {...register('email')}
          inputName='Email'
          placeholder='Email address'
          errors={errors}
          className='mb-6'
        />
        <textarea
          {...register('comment')}
          placeholder='Comment'
          className='mb-[24px] h-[154px] w-full resize-none rounded-lg border border-brand border-opacity-40 bg-transparent px-[18px] py-[14px] text-fs-14-lh-1.28-fw-400 text-black outline-none placeholder:opacity-40 focus:border-opacity-100 violet:border-brand-secondary dark:text-white'
        />
        <Button type='submit' disabled={!isValid}>
          Send
        </Button>
      </form>
    </Modal>
  );
};
