import {
    Text,
    Title,
    SimpleGrid,
    TextInput,
    Textarea,
    Button,
    Group,
    ActionIcon,
  } from '@mantine/core';
  import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram } from '@tabler/icons-react';
  import classes from './ContactUs.module.css';
import { ContactIconsList } from './ContactIcon';  
import { useCreateContactMessageMutation } from '@/lib/redux/features/contact/contactApi';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useGetSettingInfoQuery } from '@/lib/redux/features/setting/settingApi';
  const social = [IconBrandTwitter, IconBrandYoutube, IconBrandInstagram];
  
  export function ContactUs() {

    const {data, isLoading:contactDataLoading, isError:contactDataError} = useGetSettingInfoQuery('')
    const [createContactMessage,{isLoading}] = useCreateContactMessageMutation()
    const form = useForm({
      initialValues: {
        email: '',
        name: '',
        message: '',
      },
    });

    let contactIconContent = <div></div>
    if(contactDataLoading){
      contactIconContent = <div>Loading...</div>
    }else if(contactDataError){
      contactIconContent = <div>Error...</div>
    }else if(data){
      contactIconContent = <ContactIconsList data={data}/>
    }

    const handleSubmit = (values:any) => {
      createContactMessage(values)
      .unwrap()
      .then((data)=>{
        if(data.status==='success'){
          notifications.show({
            title: 'Success 🎉',
            message: 'Message sent !',
          })
        }
        form.values.email = ''
        form.values.name = ''
        form.values.message = ''

      }).catch((error)=>{
        notifications.show({
          title: 'Error',
          message: 'Failed to send message !',
        })
      })
    }

    const icons = social.map((Icon, index) => (
      <ActionIcon key={index} size={28} className={classes.social} variant="transparent">
        <Icon size="1.4rem" stroke={1.5} />
      </ActionIcon>
    ));
  
    return (
      <div className={classes.wrapper}>
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={50}>
          <div>
            <Title mb={30} className={classes.title}>Contact us</Title>
            {contactIconContent}
            <Group mt="xl">{icons}</Group>
          </div>
          <div className={classes.form}>
              <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                <TextInput
                  label="Email"
                  placeholder="your@email.com"
                  required
                  classNames={{ input: classes.input, label: classes.inputLabel }}
                  {...form.getInputProps('email')}
                />
                <TextInput
                  label="Name"
                  placeholder="John Doe"
                  mt="md"
                  classNames={{ input: classes.input, label: classes.inputLabel }}
                  {...form.getInputProps('name')}
                />
                <Textarea
                  required
                  label="Your message"
                  placeholder="Your message here..."
                  minRows={4}
                  mt="md"
                  classNames={{ input: classes.input, label: classes.inputLabel }}
                  {...form.getInputProps('message')}
                />
    
                <Group justify="flex-end" mt="md">
                  <Button type='submit' className={classes.control}>Send message</Button>
                </Group>
              </form>
          </div>
        </SimpleGrid>
      </div>
    );
  }