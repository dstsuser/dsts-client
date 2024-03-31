'use client'
import SimpleModal from '@/components/Modals/SimpleModal';
import { closeModal, openModal } from '@/lib/redux/features/modal/modalSlice';
import { useGetAllUsersQuery, usePostUserMutation, useUploadProfileImageMutation } from '@/lib/redux/features/user/userApi'
import { Avatar, Box, Button, Container, FileInput, Group, Table, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';





export default function Users() {

    const {data,isLoading,isError,refetch} = useGetAllUsersQuery('user')
    const [postUser] = usePostUserMutation()
    const [uploadProfileImage] = useUploadProfileImageMutation()
    const dispatch = useDispatch();
    const [value, setValue] = useState<File | null>(null);
    const [userId, setUserId] = useState('');
    const {type} = useSelector((state:any) => state.modal);

    const form = useForm({
        initialValues: {
          primaryEmail: '',
          primaryPhone: '',
          fullName: '',
        },
      });

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
        console.log(values)
        const form = new FormData();
        form.append('avatar', values)
        uploadProfileImage({id:userId,form})
        .unwrap()
        .then((res)=>{
            if(res){
                refetch()
                dispatch(closeModal())
                setUserId('')
                setValue(null)
            }
        })
        .catch((err)=>{
            console.log(err)
            setUserId('')
            setValue(null)
        })
    }

    const openImageModal = (id:string)=>{
        setUserId(id)
        dispatch(openModal({title:'Upload Avatar',type:'uploadImage'}));
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
            <Table.Td>{item.roles?.map((item:any)=>`${item}, `)}</Table.Td>
            <Table.Td>{item.status}</Table.Td>
            <Table.Td>{item.isAlumni?'Yes':'No'}</Table.Td>
            <Table.Td>
                <Group>
                    <Text size="sm" style={{cursor:'pointer'}} color="blue" onClick={()=>{console.log('edit')}}>
                    Edit
                    </Text>
                    <Text size="sm" color="red" style={{cursor:'pointer'}} onClick={()=>{console.log('delete')}}>
                    Delete
                    </Text>
                    <Button size="xs" onClick={()=>{openImageModal(item?._id)}}>Avatar</Button>
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
                <Text size="xl" weight={700}>Users</Text>
                <Button onClick={()=>dispatch(openModal({title:'Create User',type:'createUser'}))}>Add User</Button>
            </div>
            <div style={{display:'flex', justifyContent:'center'}}>
                {tableContent}
            </div>
        </Container>
        {type==='createUser' &&
        <SimpleModal>
            <Box maw={340} mx="auto">
                <form onSubmit={form.onSubmit((values) => handleCreateUser(values))}>
                    <TextInput
                        withAsterisk
                        label="Full Name"
                        placeholder="Name"
                        {...form.getInputProps('fullName')}
                    />
                    <TextInput
                        withAsterisk
                        label="Primary Phone"
                        placeholder="017XXXXXXXX"
                        {...form.getInputProps('primaryPhone')}
                    />
                    <TextInput
                        withAsterisk
                        label="Primary Email"
                        placeholder="your@email.com"
                        {...form.getInputProps('primaryEmail')}
                    />
                    <Group justify="flex-end" mt="md">
                        <Button type="submit">Submit</Button>
                    </Group>
                </form>
            </Box>
        </SimpleModal>}
        {type==='uploadImage' &&
        <SimpleModal>
            <Box maw={340} mx="auto">
                <FileInput value={value} onChange={setValue} />
                <Group justify="flex-end" mt="md">
                    <Button onClick={()=>handleUploadImage(value)}>Submit</Button>
                </Group>
            </Box>
        </SimpleModal>}
    </>
  )
}
