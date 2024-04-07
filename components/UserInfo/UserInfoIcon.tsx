import { Avatar, Text, Group, FileInput, Box, Button } from '@mantine/core';
import { IconPhoneCall, IconAt, IconBrandWhatsapp, IconBrandFacebook, IconCamera } from '@tabler/icons-react';
import classes from './UserInfoIcon.module.css';
import { closeModal, openModal } from '@/lib/redux/features/modal/modalSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import SimpleModal from '../Modals/SimpleModal';
import { useUploadProfileImageMutation } from '@/lib/redux/features/user/userApi';
import { notifications } from '@mantine/notifications';

export function UserInfoIcons({user,refetch}:{user:any,refetch:any}) {

  const dispatch = useDispatch();
  const [value, setValue] = useState<File | null>(null);
  const {type} = useSelector((state:any) => state.modal);
  const [uploadProfileImage,{isLoading:avatarUploading}] = useUploadProfileImageMutation()

  const openImageModal = ()=>{
    dispatch(openModal({title:'Upload Avatar',type:'uploadImage'}));
}

const handleUploadImage = (values:any)=>{
  const form = new FormData();
  form.append('avatar', values)
  uploadProfileImage({id:user._id,form})
  .unwrap()
  .then((res)=>{
      if(res){
          refetch()
          dispatch(closeModal())
          setValue(null)
          notifications.show({
              title: 'Success 🎉',
              message: 'Avatar upload successfully !',
            })
      }
  })
  .catch((err)=>{
      setValue(null)
      notifications.show({
          title: 'Error',
          message: 'Failed to upload avatar !',
        })
  })
}


  return (
    <div>
      <Group wrap="nowrap" className={classes.group}>
        <div className={classes.profilePhoto}>
          <Avatar
            src={user?.avatar}
            size={94}
            radius="md"
          />
          <div className={classes.uploadImageDiv} onClick={()=>openImageModal()}>
            <span><IconCamera style={{paddingTop:'3px'}} size={15}/> Change</span>
          </div>
        </div>
        <div>
          <Text fz="lg" fw={500} className={classes.name}>
            {user?.fullName}
          </Text>

          <Group wrap="nowrap" gap={10} mt={3}>
            <IconAt stroke={1.5} size="1rem" className={classes.icon} />
            <Text fz="xs" c="dimmed">
              {user?.contactInfo?.email? user?.contactInfo?.email : 'N/A'}
            </Text>
          </Group>

          <Group wrap="nowrap" gap={10} mt={5}>
            <IconPhoneCall stroke={1.5} size="1rem" className={classes.icon} />
            <Text fz="xs" c="dimmed">
              {user?.contactInfo?.phone ? user?.contactInfo?.phone : 'N/A'}
            </Text>
          </Group>

          <Group wrap="nowrap" gap={10} mt={5}>
            <IconBrandWhatsapp stroke={1.5} size="1rem" className={classes.icon} />
            <Text fz="xs" c="dimmed">
              {user?.socialMediaInfo?.whatsapp ? user?.socialMediaInfo?.whatsapp : 'N/A'}
            </Text>
          </Group>

          <Group wrap="nowrap" gap={10} mt={5}>
            <IconBrandFacebook stroke={1.5} size="1rem" className={classes.icon} />
            <Text fz="xs" c="dimmed">
              {user?.socialMediaInfo?.facebook ? user?.socialMediaInfo?.facebook : 'N/A'}
            </Text>
          </Group>
        </div>
      </Group>
      {type==='uploadImage' &&
            <SimpleModal>
                <Box mx="auto">
                    <FileInput value={value} onChange={setValue} />
                    <Group justify="flex-end" mt="md">
                        <Button onClick={()=>handleUploadImage(value)}>{
                            avatarUploading?'Uploading...':'Upload'
                        }</Button>
                    </Group>
                </Box>
            </SimpleModal>}
    </div>
  );
}