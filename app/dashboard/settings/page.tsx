'use client'
import { UserInfoIcons } from '@/components/UserInfo/UserInfoIcon'
import { Box, Button, Card, Container, FileInput, Grid, GridCol, Group, Table, Text } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import classes from './settings.module.css'
import { useGetUserByIdQuery, usePatchUserByUserMutation } from '@/lib/redux/features/user/userApi'
import { useDispatch, useSelector } from 'react-redux'
import { IconEdit } from '@tabler/icons-react'
import SimpleModal from '@/components/Modals/SimpleModal'
import UserEditModalBody from '@/components/Modals/UserEditModalBody'
import { openModal } from '@/lib/redux/features/modal/modalSlice'
import { useRouter } from 'next/navigation'
import useAuth from '@/hooks/useAuth'

export default function page() {

    const {user} = useSelector((state:any) => state.auth);
    const auth = useAuth();
    useEffect(()=>{
        if(!auth){
            router.push('/login')
        }
    },[auth])
    const {data,isLoading,isError,refetch} = useGetUserByIdQuery(user?._id);
    const dispatch = useDispatch();
    const {type} = useSelector((state:any) => state.modal);
    const router = useRouter()



    const openEditModal = ()=>{
        dispatch(openModal({title:'Edit User',type:'editUserByUser',size:'lg'}));
    }


  return (
    <Container size={'lg'} py={'lg'}>
        {
            isLoading ? <div>Loading...</div> :
            isError ? <div>Error...</div> :
            data ? (
                <div className={classes.wrapper}>
                    <div className={classes.userDiv}>
                        <UserInfoIcons user={data?.user} refetch={refetch}/>
                        <div>
                            <Button onClick={()=>{openEditModal()}} className={classes.editButtonText} size="sm" variant="light" color="blue">Edit Profile</Button>
                            <Button onClick={()=>{openEditModal()}} className={classes.editButtonIcon} size="sm" variant="transparent" color="blue"><IconEdit/></Button>
                        </div>
                    </div>
                    {/* <hr/> */}
                    <div className=''>
                        <Grid>
                            <Grid.Col span={{base:12,md:6,lg:6}}>
                                <Card withBorder className={classes.infoDiv}>
                                    <Text fw={'bold'}>Information</Text>
                                    <div>
                                        <Table striped>
                                            <tbody>
                                                <tr>
                                                    <td>Primary Email</td>
                                                    <td>{data?.user?.primaryEmail?
                                                        data?.user?.primaryEmail :'N/A'}</td>
                                                </tr>
                                                <tr>
                                                    <td>Primary Phone</td>
                                                    <td>{data?.user?.primaryPhone? data?.user?.primaryPhone :'N/A'}</td>
                                                </tr>
                                                <tr>
                                                    <td>Is Alumni?</td>
                                                    <td>{data?.user?.isAlumni? 'Yes':'No'}</td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </div>
                                </Card>
                            </Grid.Col>
                            <Grid.Col span={{base:12,md:6,lg:6}}>
                                <Card withBorder className={classes.infoDiv}>
                                    <Text fw={'bold'}>Information</Text>
                                    <div>
                                        <Table striped>
                                            <tbody>
                                                <tr>
                                                    <td>Blood Group</td>
                                                    <td>{data?.user?.bloodGroup? 
                                                        data?.user?.bloodGroup :'N/A'
                                                    }</td>
                                                </tr>
                                                <tr>
                                                    <td>Present Address</td>
                                                    <td>{data?.user?.address?.presentAddress?
                                                        data?.user?.address?.presentAddress :'N/A'}</td>
                                                </tr>
                                                <tr>
                                                    <td>Permanent Address</td>
                                                    <td>{data?.user?.address?.permanentAddress? data?.user?.address?.permanentAddress :'N/A'}</td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </div>
                                </Card>
                            </Grid.Col>
                            <Grid.Col span={{base:12,md:6,lg:6}}>
                                <Card withBorder className={classes.infoDiv}>
                                    <Text fw={'bold'}>Educational Info</Text>
                                    <div>
                                        <Table striped>
                                            <tbody>
                                                <tr>
                                                    <td>University</td>
                                                    <td>{data?.user?.educationalInfo?.university?
                                                        data?.user?.educationalInfo?.university :'N/A'}</td>
                                                </tr>
                                                <tr>
                                                    <td>Faculty</td>
                                                    <td>{data?.user?.educationalInfo?.department? data?.user?.educationalInfo?.department :'N/A'}</td>
                                                </tr>
                                                <tr>
                                                    <td>Department/Subject</td>
                                                    <td>{data?.user?.educationalInfo?.subject? data?.user?.educationalInfo?.subject :'N/A'}</td>
                                                </tr>
                                                <tr>
                                                    <td>Session</td>
                                                    <td>{data?.user?.educationalInfo?.session? data?.user?.educationalInfo?.session :'N/A'}</td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </div>
                                </Card>
                            </Grid.Col>
                            
                            <GridCol span={{base:12,md:6,lg:6}}>
                                <Card withBorder className={classes.infoDiv}>
                                    <Text fw={'bold'}>Professional Info</Text>
                                    <div>
                                        <Table striped>
                                            <tbody>
                                                <tr>
                                                    <td>Workplace</td>
                                                    <td>{data?.user?.professionalInfo?.workplaceName?
                                                        data?.user?.professionalInfo?.workplaceName :'N/A'}</td>
                                                </tr>
                                                <tr>
                                                    <td>Position</td>
                                                    <td>{data?.user?.professionalInfo?.workplacePosition? data?.user?.professionalInfo?.workplacePosition :'N/A'}</td>
                                                </tr>
                                                <tr>
                                                    <td>Address</td>
                                                    <td>{data?.user?.professionalInfo?.workplaceAddress? data?.user?.professionalInfo?.workplaceAddress :'N/A'}</td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </div>
                                </Card>
                            </GridCol>
                        </Grid>
                    </div>
                </div>
            ) : <div></div>
        }
            {type==='editUserByUser' &&
            <SimpleModal>
                <UserEditModalBody user={data?.user} refetch={refetch}/>
            </SimpleModal>
        }
    </Container>
  )
}
