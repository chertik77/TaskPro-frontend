import { Button } from 'components/ui';
import { Modal } from 'components/ui/modal/Modal';
import { useModal } from 'hooks/useModal';

export const SidebarUserSupport = () => {
  const { isModalOpen, toggleModal } = useModal();

  return (
    <div className='mb-6 h-[238px] rounded-lg bg-[#F6F6F7] md:h-[272px]'>
      <div className='p-[14px] md:p-5'>
        <div className='mb-3.5 '>
          <picture>
            <source
              srcSet='/images/helpIcon.avif 1x, /images/helpIcon@2x.avif 2x'
            />
            <img src='/images/2.avif' alt='Need help icon' />
          </picture>
        </div>
        <p className=' mb-[18px] text-sm font-normal'>
          If you need help with
          <span className='text-[#BEDBB0]'> TaskPro</span>, check out our
          support resources or reach out to our customer support team.
        </p>
        <Button
          className='flex items-center gap-2'
          isSmallIcon
          iconName='help'
          onClick={toggleModal}
        >
          <span className='font-medium'>Need help?</span>
        </Button>
        <Modal
          isModalOpen={isModalOpen}
          onCloseModal={toggleModal}
          modalTitle='Edit profile'>
          <p></p>
        </Modal>
      </div>
    </div>
  );
};
