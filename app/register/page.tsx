'use client'
import {
    TextInput,
    PasswordInput,
    Checkbox,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Group,
    Button,
    Alert,
  } from '@mantine/core';
  import classes from './page.module.css';
import { useEffect, useState } from 'react';
import { useForm } from '@mantine/form';
import { useLoginMutation, useRegisterMutation } from '@/lib/redux/features/auth/authApi';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';

  export default function Register() {


    const [register,{isLoading,isError}] = useRegisterMutation()
    const dispatch = useDispatch();
    const router = useRouter();
    const auth = useAuth();
    const [status,setStatus] = useState(false)

    const form = useForm({
      initialValues: {
        fullName: '',
        emailOrPhone: '',
        password: '',
        rememberMe: false,
      },
      validate: {
        fullName: (value) => (value.length > 0 ? null : 'Full name is required'),
        emailOrPhone: (value) => (value.length >= 11 ? null : 'Phone number must be 11 characters'),
        password: (value) => {
          const hasUpperCase = /[A-Z]/.test(value);
          const hasNumber = /\d/.test(value);
          const isValidLength = value.length >= 6;
          if (isValidLength) {
            return null;
          }
          return 'Password must be at least 6 characters long';
        },
      },
    });

    useEffect(()=>{
      if(form.isDirty()){
        setStatus(false)
      }
    },[form.values])

    useEffect(()=>{
      if(auth){
        router.push('/')
      }
    },[auth])

    const handleSubmit = (values:any) => {
      setStatus(false)
      register({
        emailOrPhone:values.emailOrPhone,
        password:values.password,
        fullName:values.fullName
      })
      .unwrap().then((data)=>{
        if(data.status===true){
          setStatus(true)
        }
      })
    }

    return (
      <Container size={420} my={40}>
        <Title ta="center" className={classes.title}>
          Welcome back!
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Do not have an account yet?{' '}
          <Anchor size="sm" component="button">
            Create account
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          {
            status && <Alert variant="light" color="blue" my={'md'}>
              Account created!
              Please <span style={{textDecoration:'underline',cursor:'pointer'}} onClick={()=>router.push('/login')}>Login</span> to your account
          </Alert>
          }

        <form onSubmit={form.onSubmit((values) =>handleSubmit(values))}>
          <TextInput 
              label="Full Name" 
              placeholder="Your name"
              {...form.getInputProps('fullName')}
              required
          />
          <TextInput 
              label="Email or Phone" 
              placeholder="Email or Phone"
              {...form.getInputProps('emailOrPhone')}
              required 
              mt={'md'}

          />
          <PasswordInput 
              label="Password" 
              placeholder="Your password" 
              {...form.getInputProps('password')}
              required mt="md" 
          />
          <Group justify="space-between" mt="lg">
            <Checkbox label="Remember me" 
                 {...form.getInputProps('rememberMe', { type: 'checkbox' })}
            />
            <Anchor component="button" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          <Button fullWidth mt="xl" type='submit'>
            {isLoading?'Loading...':'Sign up'}
          </Button>
          </form>
        </Paper>
      </Container>
    );
}
