import { closeModal } from '@/lib/redux/features/modal/modalSlice';
import { useGetAllUsersQuery, usePatchUserByIdMutation, usePatchUserByUserMutation, usePostUserMutation } from '@/lib/redux/features/user/userApi';
import { Button, Checkbox, Grid, Group, TextInput,Box } from '@mantine/core'
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

export default function UserEditModalBody({user,refetch}:{user:any,refetch:any}) {

    const {type} = useSelector((state:any)=>state.modal)
    const form = useForm();
    const [patchUserById,{isLoading:updateLoading}] = usePatchUserByIdMutation()
    const [postUser,{isLoading:postLoading}] = usePostUserMutation()
    const [patchUserByUser, {isLoading:updateByUserLoading}] = usePatchUserByUserMutation()

    const dispatch = useDispatch();

    useEffect(()=>{ 
        form.setValues({
            primaryEmail: user.primaryEmail || '',
            primaryPhone: user.primaryPhone || '',
            fullName: user.fullName || '',
            phone: user?.contactInfo?.phone || '',
            bloodGroup: user?.bloodGroup || '',
            email: user?.contactInfo?.email || '',
            whatsapp: user?.socialMediaInfo?.whatsapp || '',
            facebook: user?.socialMediaInfo?.facebook || '',
            university: user?.educationalInfo?.university || '',
            department: user?.educationalInfo?.department || '',
            subject: user?.educationalInfo?.subject || '',
            session: user?.educationalInfo?.session || '',
            workplaceName: user?.professionalInfo?.workplaceName || '',
            workplacePosition: user?.professionalInfo?.workplacePosition || '',
            workplaceAddress: user?.professionalInfo?.workplaceAddress || '',
            isAlumni: user.isAlumni || false,
            presentAddress: user?.address?.presentAddress || '',
            permanentAddress: user?.address?.permanentAddress || ''
        })
    },[user])

    const handleEditUser = (values:any,fun:any) => {
        fun({
            id:user._id,
            data:values
        })
        .unwrap()
        .then((res:any)=>{
            if(res){
                dispatch(closeModal())
                refetch()
                notifications.show({
                    title: 'Success 🎉',
                    message: 'User updated successfully !',
                  })
            }
        })
        .catch((err:any)=>{
            console.log(err)
            notifications.show({
                title: 'Error 😢',
                message: 'Something went wrong !',
              })
        })
    }

    const handleCreateUser = (values:any) => {
        postUser(values)
        .unwrap()
        .then((res)=>{
            if(res){
                dispatch(closeModal())
                refetch()
                notifications.show({
                    title: 'Success 🎉',
                    message: 'User created successfully !',
                  })
            }
        })
        .catch((err)=>{
            console.log(err)
            notifications.show({
                title: 'Error 😢',
                message: 'Something went wrong !',
              })
        })
    }

    const handleUser = (values:any) => {
        if(type === 'editUserByUser'){
            handleEditUser(values,patchUserByUser)
        }else if(type=== 'editUser'){
            handleEditUser(values,patchUserById)
        }
        else if(type === 'createUser'){
            handleCreateUser(values)
        }
    }

    return (
        <Box mx="auto">
            <form onSubmit={form.onSubmit((values) => handleUser(values))}>
                    <TextInput
                        mb={'sm'}
                        withAsterisk={type === 'createUser'}
                        label="Full Name"
                        placeholder="Name"
                        {...form.getInputProps('fullName')}
                    />
                    <Grid mb={'sm'}>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <TextInput
                                disabled={type === 'editUser'}
                                withAsterisk={type === 'createUser'}
                                label="Primary Phone"
                                placeholder="017XXXXXXXX"
                                {...form.getInputProps('primaryPhone')}
                            />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <TextInput
                                // withAsterisk
                                label="Primary Email"
                                placeholder="example@example.com"
                                {...form.getInputProps('primaryEmail')}
                            />
                        </Grid.Col>
                    </Grid>
                    <Grid mb={'sm'}>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <TextInput
                                // withAsterisk
                                label="Phone"
                                placeholder="017XXXXXXXX"
                                {...form.getInputProps('phone')}
                            />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <TextInput
                                // withAsterisk
                                label="Email"
                                placeholder="example@example.com"
                                {...form.getInputProps('email')}
                            />
                        </Grid.Col>
                    </Grid>

                    <Grid mb={'sm'}>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <TextInput
                                // withAsterisk
                                label="Blood Group"
                                placeholder="A+"
                                {...form.getInputProps('bloodGroup')}
                            />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6 }} style={{display:'flex',alignItems:'center'}}>
                            <Checkbox
                                mt="lg"
                                label="Alumni"
                                {...form.getInputProps('isAlumni', { type: 'checkbox' })}
                            />
                        </Grid.Col>
                    </Grid>

                    <Grid mb={'sm'}>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <TextInput
                                // withAsterisk
                                label="Whatsapp Number"
                                placeholder="017XXXXXXXX"
                                {...form.getInputProps('whatsapp')}
                            />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <TextInput
                                mb={'sm'}
                                label="Facebook Profile Url"
                                placeholder="https://facebook.com/username"
                                {...form.getInputProps('facebook')}
                            />
                        </Grid.Col>
                    </Grid>

                    

                    <TextInput
                        mb={'sm'}
                        // withAsterisk
                        label="University"
                        placeholder="University Name"
                        {...form.getInputProps('university')}
                    />
                    <TextInput
                        mb={'sm'}
                        // withAsterisk
                        label="Department"
                        placeholder="Department Name"
                        {...form.getInputProps('department')}
                    />
                    <Grid mb={'sm'}>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <TextInput
                                // withAsterisk
                                label="Subject"
                                placeholder="Subject Name"
                                {...form.getInputProps('subject')}
                            />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <TextInput
                                // withAsterisk
                                label="session"
                                placeholder="2017-2018"
                                {...form.getInputProps('session')}
                            />
                        </Grid.Col>
                    </Grid>

                    <TextInput
                        mb={'sm'}
                        // withAsterisk
                        label="Workplace Name"
                        placeholder="Workplace Name"
                        {...form.getInputProps('workplaceName')}
                    />
                    
                    
                    <Grid>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <TextInput
                                mb={'sm'}
                                // withAsterisk
                                label="Designation"
                                placeholder="Designation"
                                {...form.getInputProps('workplacePosition')}
                            />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <TextInput
                                mb={'sm'}
                                // withAsterisk
                                label="Workplace Address"
                                placeholder="Address"
                                {...form.getInputProps('workplaceAddress')}
                            />
                        </Grid.Col>
                    </Grid>

                    <Grid mb={'sm'}>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <TextInput
                                // withAsterisk
                                label="Present Address"
                                placeholder="Address"
                                {...form.getInputProps('presentAddress')}
                            />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <TextInput
                                // withAsterisk
                                label="Permanent Address"
                                placeholder="Address"
                                {...form.getInputProps('permanentAddress')}
                            />
                        </Grid.Col>
                    </Grid>
                    
                    <Group justify="flex-end" mt="md">
                        {
                            type === 'editUser' &&
                            <Button type="submit">{updateLoading? 'Updating..':'Update'}</Button>
                        }
                        {
                            type === 'editUserByUser' &&
                            <Button type="submit">{updateByUserLoading? 'Updating..':'Update'}</Button>
                        }
                        {
                            type === 'createUser' &&
                            <Button type="submit">{postLoading? 'Creating':'Create'}</Button>
                        }
                    </Group>
            </form>
        </Box>
    )
}
