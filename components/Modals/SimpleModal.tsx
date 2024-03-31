import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, openModal } from '@/lib/redux/features/modal/modalSlice';

function SimpleModal({children}:{children:any}) {
    const {opened,title} = useSelector((state:any) => state.modal);
    const dispatch = useDispatch();

    
    const handleClose = () => {
        dispatch(closeModal());
    };

  return (
    <>
      <Modal opened={opened} onClose={handleClose} centered title={title}>
        {
            children
        }
      </Modal>
    </>
  );
}

export default SimpleModal;