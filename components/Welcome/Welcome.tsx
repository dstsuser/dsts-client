import { Title, Text, Anchor } from '@mantine/core';
import classes from './Welcome.module.css';

export function Welcome() {
  return (
    <>
      <Title className={classes.title} ta="center" mt={100}>
        Welcome to{' '}
        <Text inherit variant="gradient" component="span" gradient={{ from: 'pink', to: 'yellow' }}>
          DSTS
        </Text>
      </Title>
      <Text c="dimmed" ta="center" size="lg" maw={580} mx="auto" mt="xl">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit voluptas commodi magnam mollitia animi illo cumque nostrum aut sed incidunt, atque aliquid non harum ea quis. Possimus ipsa dolores nesciunt amet?
      </Text>
    </>
  );
}
