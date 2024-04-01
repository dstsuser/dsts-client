import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, openModal } from '@/lib/redux/features/modal/modalSlice';

function SimpleModal({children}:{children:any}) {
    const {opened,title,size} = useSelector((state:any) => state.modal);
    const dispatch = useDispatch();
    console.log(opened,title,size)


    
    const handleClose = () => {
        dispatch(closeModal());
    };

  return (
    <>
      <Modal opened={opened} onClose={handleClose} centered title={title} size={size?size:'md'}>
        {
            children
        }
      </Modal>
    </>
  );
}

export default SimpleModal;