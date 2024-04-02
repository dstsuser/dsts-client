'use client'
import SimpleModal from '@/components/Modals/SimpleModal';
import UserEditModalBody from '@/components/Modals/UserEditModalBody';
import { closeModal, openModal } from '@/lib/redux/features/modal/modalSlice';
import { useGetAllUsersQuery, usePostUserMutation, useUploadProfileImageMutation } from '@/lib/redux/features/user/userApi'
import { Avatar, Box, Button, Checkbox, Container, FileInput, Grid, Group, Table, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconCamera, IconEdit, IconTrash } from '@tabler/icons-react';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';


export default function Users() {

    const {data,isLoading,isError,refetch} = useGetAllUsersQuery('user')
    const [postUser] = usePostUserMutation()
    const [uploadProfileImage,{isLoading:avatarUploading}] = useUploadProfileImageMutation()
    const dispatch = useDispatch();
    const [value, setValue] = useState<File | null>(null);
    const [user, setUser] = useState({} as any);
    const {type} = useSelector((state:any) => state.modal);

    const form = useForm();

    const handleCreateUser = (values:any)=>{
        postUser(values)
        .unwrap()
        .then((res)=>{
            if(res){
                refetch()
                dispatch(closeModal())
            }
        })
        .catch((err)=>{
            console.log(err)
        })
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
                setUser('')
                setValue(null)
                notifications.show({
                    title: 'Success 🎉',
                    message: 'Avatar upload successfully !',
                  })
            }
        })
        .catch((err)=>{
            console.log(err)
            setUser('')
            setValue(null)
            notifications.show({
                title: 'Error',
                message: 'Failed to upload avatar !',
              })
        })
    }

    const openImageModal = (user:any)=>{
        setUser(user)
        dispatch(openModal({title:'Upload Avatar',type:'uploadImage'}));
    }

    const openEditModal = (user:any)=>{
        setUser(user)
        dispatch(openModal({title:'Edit User',type:'editUser',size:'lg'}));
    }

    const rows = data?.users?.map((item:any) => {
        return (
          <Table.Tr key={item._id} >
            <Table.Td>
              <Group gap="sm">
                <Avatar size={26} src={item.avatar} radius={26} />
                <Text size="sm" fw={500}>
                  {item.fullName}
                </Text>
              </Group>
            </Table.Td>
            <Table.Td>{item.primaryPhone}</Table.Td>
            <Table.Td>{item.roles?.map((item:any)=>`${item} `)}</Table.Td>
            <Table.Td>{item.status}</Table.Td>
            <Table.Td>{item.isAlumni?'Yes':'No'}</Table.Td>
            <Table.Td>
                <Group>
                    <Button size='xs' variant='transparent' onClick={()=>{openEditModal(item)}}><IconEdit fontSize={'12px'}/></Button>
                    <Button size='xs' variant='transparent'><IconTrash color='red' fontSize={'12px'}/></Button>
                    <Button variant='transparent' size="xs" onClick={()=>{openImageModal(item)}}>
                        <IconCamera fontSize={'12px'}/>
                    </Button>
                </Group>
            </Table.Td>
          </Table.Tr>
        );
      });

    let tableContent:any=<div></div>;
    if(isLoading){
        tableContent=<div>Loading...</div>
    }else if(isError){
        tableContent=<div>Error</div>
    }else if(data?.users.length===0){
        tableContent=<div>No User Found</div>
    }else if(data?.users.length>0){
        tableContent=<Table miw={800} verticalSpacing="sm">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>User</Table.Th>
            <Table.Th>Phone</Table.Th>
            <Table.Th>Role</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Is Alumni</Table.Th>
            <Table.Th>
                Actions
            </Table.Th>

          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    }

  return (
    <>
        <Container size='xl' py="md">
            <div style={{display:'flex',justifyContent:'space-between'}}>
                <Text size="xl">Users</Text>
                <Button onClick={()=>dispatch(openModal({title:'Create User',type:'createUser',size:'lg'}))}> Add User</Button>
            </div>
            <div style={{display:'flex', justifyContent:'center'}}>
                {tableContent}
            </div>
        </Container>
        {type==='createUser' &&
        <SimpleModal>
            <UserEditModalBody user={''}/>
        </SimpleModal>}
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

        {type==='editUser' &&
        <SimpleModal>
            <UserEditModalBody user={user} />
        </SimpleModal>
        }
    </>
  )
}
