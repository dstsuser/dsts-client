'use client'
import { TextInput, Textarea, SimpleGrid, Group, Title, Button, Container, Grid, Text, Paper } from '@mantine/core';
import { useForm } from '@mantine/form';

export function GetInTouch() {
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
    validate: {
      name: (value) => value.trim().length < 2,
      email: (value) => !/^\S+@\S+$/.test(value),
      subject: (value) => value.trim().length === 0,
    },
  });

  return (
    <div>
      <Container size='lg'>
        <Title
              order={2}
              size="h1"
              style={{ fontFamily: 'Greycliff CF, var(--mantine-font-family)' }}
              fw={900}
              // ta="center"
            >
              Get in touch
        </Title>
        <Grid>
          <Grid.Col span={{ base: 12, md: 8, lg: 8 }}>
          <form onSubmit={form.onSubmit(() => {})}>
          
            <SimpleGrid cols={{ base: 1, sm: 2 }} mt="xl">
              <TextInput
                label="Name"
                placeholder="Your name"
                name="name"
                variant="filled"
                {...form.getInputProps('name')}
              />
              <TextInput
                label="Email"
                placeholder="Your email"
                name="email"
                variant="filled"
                {...form.getInputProps('email')}
              />
            </SimpleGrid>

            <TextInput
              label="Subject"
              placeholder="Subject"
              mt="md"
              name="subject"
              variant="filled"
              {...form.getInputProps('subject')}
            />
            <Textarea
              mt="md"
              label="Message"
              placeholder="Your message"
              maxRows={10}
              minRows={5}
              autosize
              name="message"
              variant="filled"
              {...form.getInputProps('message')}
            />

            <Group justify="start" mt="xl">
              <Button type="submit" size="md">
                Send message
              </Button>
            </Group>
          </form>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4, lg: 4 }}>
            <Paper  mt="xl">
              <Text style={{ fontWeight: 700,fontSize:'24px' }}>Contact Info</Text>
              <Text>1234 Main St</Text>
              <Text>City, State, 12345</Text>
              <Text>Country</Text>
            </Paper>
          </Grid.Col>
        </Grid>
      </Container>
    </div>
  );
}

export default GetInTouch;