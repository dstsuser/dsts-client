'use client'
import SimpleModal from '@/components/Modals/SimpleModal';
import UserEditModalBody from '@/components/Modals/UserEditModalBody';
import { useCreateCommitteeMutation, useCreateCommitteePositionMutation, useGetCommitteeListQuery } from '@/lib/redux/features/committee/committeeApi';
import { closeModal, openModal } from '@/lib/redux/features/modal/modalSlice';
import { Box, Button, Container, Grid, Group, Table, Text, TextInput, Textarea } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import {IconEye, IconTrash } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';


export default function Committees() {

    const {data,isLoading,isError,refetch} = useGetCommitteeListQuery('committees');
    const [createCommittee,{isLoading:createCommitteeLoading}] = useCreateCommitteeMutation()

    const dispatch = useDispatch();
    const {type} = useSelector((state:any) => state.modal);
    const form = useForm();
    const router = useRouter()


    const handleCreateCommittee = async (values:any)=>{
        createCommittee(values)
        .unwrap()
        .then((data)=>{
            notifications.show({
                title: 'Success 🎉',
             message: 'Committee created successfully !',
            })
            dispatch(closeModal())
            refetch()
        })
        .catch((error)=>{
            notifications.show({
                title: 'Error 😢',
                message: 'An error occurred while creating Committee !'
              })
        })
    }

    const rows = data?.committee?.map((item:any) => {
        return (
          <Table.Tr key={item._id} >
            <Table.Td>{item.name}</Table.Td>
            <Table.Td>{item.year}</Table.Td>
            <Table.Td>{item.formingDate?.split('T')[0]}</Table.Td>
            <Table.Td>{item.status}</Table.Td>
            <Table.Td>
                <Group>
                    <Button 
                        size='xs' 
                        variant='transparent' 
                        onClick={()=>{router.push(`/dashboard/committees/${item._id}`)}}
                    >
                        <IconEye fontSize={'12px'}/>
                    </Button>

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
    }else if(data?.committee.length===0){
        tableContent=<div>No Committee Found</div>
    }else if(data?.committee.length>0){
        tableContent=<Table miw={800} verticalSpacing="sm">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Year</Table.Th>
            <Table.Th>Forming Date</Table.Th>
            <Table.Th>Status</Table.Th>
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
                <Button onClick={()=>dispatch(openModal({title:'Create Committee',type:'createCommittee',size:'lg'}))}> Add Committee</Button>
            </div>
            <div style={{display:'flex', justifyContent:'center'}}>
                {tableContent}
            </div>
        </Container>
        {type==='createCommittee' &&
        <SimpleModal>
            <Box mx="auto">
                <form onSubmit={form.onSubmit((values) => handleCreateCommittee(values))}>
                        <TextInput
                            mb={'sm'}
                            withAsterisk
                            label="Committee Name"
                            placeholder="Name"
                            {...form.getInputProps('name')}
                        />
                        <Grid mb={'sm'}>
                            <Grid.Col span={{ base: 12, md: 6 }}>
                                <TextInput
                                    mb={'sm'}
                                    withAsterisk
                                    label="Committee Year"
                                    placeholder="Year"
                                    {...form.getInputProps('year')}
                                />
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, md: 6 }}>
                                <TextInput
                                    mb={'sm'}
                                    withAsterisk
                                    label="Forming Date"
                                    placeholder="Date"
                                    type='date'
                                    {...form.getInputProps('formingDate')}
                                />
                            </Grid.Col>
                        </Grid>
                        <Textarea
                            mb={'sm'}
                            withAsterisk
                            label="Description"
                            placeholder="Description"
                            {...form.getInputProps('description')}
                        />
                        <Group justify="flex-end" mt="md">
                            <Button type="submit">{createCommitteeLoading? 'Creating..':'Create'}</Button>
                        </Group>
                </form>
            </Box>
        </SimpleModal>}
    </>
  )
}
