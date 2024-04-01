'use client'
import SimpleModal from "@/components/Modals/SimpleModal";
import { useAddMemberToCommitteeMutation, useGetCommitteeByIdQuery, useGetCommitteeListQuery, useGetCommitteePositionsQuery } from "@/lib/redux/features/committee/committeeApi";
import { closeModal, openModal } from "@/lib/redux/features/modal/modalSlice";
import { useGetAllUsersQuery } from "@/lib/redux/features/user/userApi";
import { Avatar, Box, Button, Card, Group, Select, Table, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconEye, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Page({ params }: { params: { slug: string } }) {
    const { slug } = params;

    const { data, error, isLoading,refetch } = useGetCommitteeByIdQuery(slug);
    const {data:committeePositions,isLoading:positionLoading} = useGetCommitteePositionsQuery('')
    const {data:users,isLoading:userLoading} = useGetAllUsersQuery('');
    const [addMemberToCommittee,{isLoading:addMemberLoading}] = useAddMemberToCommitteeMutation()
    const {type} = useSelector((state:any) => state.modal);
    const form = useForm();
    const dispatch = useDispatch();
    const [userId, setUserId] = useState('');
    const [positionId, setPositionId] = useState('');

    const convertToObjectArray = (inputArray:any) => {
        return inputArray?.map((item:any) => ({ value: item._id, label: item.fullName?item.fullName:item.title }));
    };

    const userList = convertToObjectArray(users?.users);
    const positionList = convertToObjectArray(committeePositions?.committeePositions);

    console.log(positionList)
    console.log(userList)

    // console.log(userList)

    const handleAddMember = () => {
        console.log(userId,positionId)
        addMemberToCommittee({id:slug,data:{userId,positionId}})
        .unwrap()
        .then((res)=>{
            notifications.show({
                title: 'Success 🎉',
                message: 'Member added successfully !',
            })
            dispatch(closeModal())
            refetch()
        })
        .catch((err)=>{
            notifications.show({
                title: 'Error 😢',
                message: 'An error occurred while adding member !'
            })
        })
    }

    let committeeInfo = <div></div>
    if (isLoading) {
        committeeInfo = <div>Loading...</div>
    }else if (error) {
        committeeInfo = <div>Error</div>
    }else if (data) {
        committeeInfo = <div>
            <h1>{data?.committee?.name}</h1>
            <table>
                <tr>
                    <td width={'300px'}>Year</td>
                    <td>{data?.committee?.year}</td>
                </tr>
                <tr>
                    <td width={'300px'}>Forming Date</td>
                    <td>{data?.committee?.formingDate?.split('T')[0]}</td>
                </tr>
                <tr>
                    <td width={'300px'}>Status</td>
                    <td>{data?.committee?.status}</td>
                </tr>
            </table>
        </div>

    }

    const rows = data?.committee?.members?.map((item:any) => {
        return (
          <Table.Tr key={item._id} >
            <Table.Td>
              <Group gap="sm">
                <Avatar size={26} src={item?.user?.avatar} radius={26} />
                <Text size="sm" fw={500}>
                  {item?.user?.fullName}
                </Text>
              </Group>
            </Table.Td>
            <Table.Td>{item?.position?.title}</Table.Td>
            <Table.Td>
                <Group>
                    <Button 
                        size='xs' 
                        variant='transparent' 
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
    if(data?.committee?.members?.length===0){
        tableContent=<div>No Member Found</div>
    }else if(data?.committee?.members?.length>0){
        tableContent=<Table miw={800} verticalSpacing="sm">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Position</Table.Th>
            <Table.Th>
                Actions
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    }
    
        return (
            <div>
                <Card shadow="sm" m={'md'}>
                    {committeeInfo}
                </Card>
                
                <Card shadow="sm" m={'md'}>
                    <div style={{display:'flex',justifyContent:"space-between", alignItems:'center',borderBottom:'1px solid gray'}}>
                        <h2>Committee Members</h2>
                        <Button onClick={()=>dispatch(openModal({title:'Add Member',type:'memberAdd',size:'md'}))}>Add Member</Button>
                    </div>
                    <hr />
                    {tableContent}
                </Card>

                {type==='memberAdd' &&
                <SimpleModal>
                    <Box mx="auto">
                        <Select
                            mb={'md'}
                            label="Member List"
                            placeholder="Pick Member"
                            data={userList}
                            searchable
                            onChange={(value:any)=>setUserId(value)}
                        />

                        <Select
                            label="Position List"
                            placeholder="Pick value"
                            data={positionList}
                            searchable
                            onChange={(value:any)=>setPositionId(value)}
                        />
                        
                        <Group justify="flex-end" mt="md">
                            <Button onClick={()=>handleAddMember()}>{addMemberLoading?'Adding':'Add'}</Button>
                        </Group>
                    </Box>
                </SimpleModal>}

            </div>
        )
  }