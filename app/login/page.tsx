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
import { useLoginMutation } from '@/lib/redux/features/auth/authApi';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';

  export default function Login() {


    const [login,{isLoading,isError}] = useLoginMutation();
    const [error,setError] = useState('')
    const dispatch = useDispatch();
    const router = useRouter();
    const auth = useAuth();

    console.log(error)

    const form = useForm({
      initialValues: {
        emailOrPhone: '',
        password: '',
        rememberMe: false,
      },
      validate: {
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
      if(auth){
        router.push('/')
      }
    },[auth])

    const handleSubmit = (values:any) => {
      login({emailOrPhone:values.emailOrPhone,password:values.password})
      .unwrap().then((data)=>{
        if(data.token){
          if(window.history.length>0){
            router.back()
          }
          router.push('/')
        }
      }).catch((error)=>{
        setError(error?.data?.message)
      })
    }

    return (
      <Container size={420} my={40}>
        <Title ta="center" className={classes.title}>
          Welcome back!
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Do not have an account yet?{' '}
          <Anchor size="sm" component="button" onClick={()=>router.push('/register')}>
            Create account
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">

          {isError &&
            <Alert variant="light" color="orange" my={'md'}>
              { error}
          </Alert>}

        <form onSubmit={form.onSubmit((values) =>handleSubmit(values))}>
          <TextInput 
              label="Email or Phone" 
              placeholder="Your email or phone number"
              {...form.getInputProps('emailOrPhone')}
              required 
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
            {isLoading?'Loading...':'Sign in'}
          </Button>
          </form>
        </Paper>
      </Container>
    );
}
