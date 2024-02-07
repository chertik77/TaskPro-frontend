import { Button } from 'components/ui';
import { Modal } from 'components/ui/modal/Modal';
// import { useModalInstance } from 'react-modal-state';


export const SidebarUserSupport = () => {
  // const { isOpen, close } = useModalInstance();

  return (
    <div className='mb-6 h-[238px]   md:h-[272px] '>
      <div className='light:bg-[#F6F6F7] rounded-lg p-[14px] violet:bg-[#ECEDFD66] dark:bg-[#1F1F1F]  md:p-5'>
        <div className='mb-3.5 '>
          <picture>
            <source
              srcSet='/images/helpIcon.avif 1x, /images/helpIcon@2x.avif 2x'
            />
            <img src='/images/2.avif' alt='Need help icon' />
          </picture>
        </div>
        <p className=' mb-[18px] text-sm font-normal violet:text-white'>
          If you need help with
          <span className='text-[#BEDBB0] violet:text-[#5255BC]'> TaskPro</span>, check out our
          support resources or reach out to our customer support team.
        </p>
        <Button
          className='flex items-center gap-2 violet:text-white'
          isSmallIcon
          iconName='help'
          onClick={close}
        >
          <span className='font-medium '>Need help?</span>
        </Button>
        <Modal
          // open={isOpen}
          // onCloseModal={close}
          modalTitle='Edit profile'>
          <p></p>
        </Modal>
      </div>
    </div>
  );
};
