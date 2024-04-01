'use client'
import SimpleModal from '@/components/Modals/SimpleModal';
import UserEditModalBody from '@/components/Modals/UserEditModalBody';
import { useCreateCommitteePositionMutation, useGetCommitteePositionsQuery } from '@/lib/redux/features/committee/committeeApi';
import { closeModal, openModal } from '@/lib/redux/features/modal/modalSlice';
import { Box, Button, Container, Group, Table, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';


export default function Positions() {

    const {data,isLoading,isError,refetch} = useGetCommitteePositionsQuery('position')
    const [createCommitteePosition,{isLoading:createLoading}] = useCreateCommitteePositionMutation()

    const dispatch = useDispatch();
    const [user, setUser] = useState({} as any);
    const {type} = useSelector((state:any) => state.modal);
    const form = useForm();


    const openEditModal = (user:any)=>{
        setUser(user)
        dispatch(openModal({title:'Edit User',type:'editUser',size:'md'}));
    }

    const handleCreatePosition = async (values:any)=>{
        createCommitteePosition({title:values.title})
        .unwrap()
        .then((data)=>{
            notifications.show({
                title: 'Success 🎉',
             message: 'Position created successfully !',
            })
            dispatch(closeModal())
            refetch()
        })
        .catch((error)=>{
            notifications.show({
                title: 'Error',
                message: 'An error occurred while creating position !'
              })
        })
    }

    const rows = data?.committeePositions?.map((item:any) => {
        return (
          <Table.Tr key={item._id} >
            <Table.Td>{item.title}</Table.Td>
            <Table.Td>
                <Group>
                    <Button size='xs' variant='transparent' onClick={()=>{openEditModal(item)}}><IconEdit fontSize={'12px'}/></Button>
                    <Button size='xs' variant='transparent'><IconTrash color='red' fontSize={'12px'}/></Button>
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
    }else if(data?.committeePositions.length===0){
        tableContent=<div>No User Found</div>
    }else if(data?.committeePositions.length>0){
        tableContent=<Table miw={800} verticalSpacing="sm">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Position Name</Table.Th>
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
                <Text size="xl">Positions</Text>
                <Button onClick={()=>dispatch(openModal({title:'Create Position',type:'createPosition',size:'md'}))}> Add Position</Button>
            </div>
            <div style={{display:'flex', justifyContent:'center'}}>
                {tableContent}
            </div>
        </Container>
        {type==='createPosition' &&
        <SimpleModal>
            <Box mx="auto">
                <form onSubmit={form.onSubmit((values) => handleCreatePosition(values))}>
                        <TextInput
                            mb={'sm'}
                            withAsterisk
                            label="Position Name"
                            placeholder="Name"
                            {...form.getInputProps('title')}
                        />
                        <Group justify="flex-end" mt="md">
                            <Button type="submit">{createLoading? 'Creating..':'Create'}</Button>
                        </Group>
                </form>
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
