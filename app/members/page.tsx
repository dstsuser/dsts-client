'use client'
import React, { useEffect, useState } from 'react';
import classes from './members.module.css';
import { Avatar, Button, Card, Container, Group, Table, Text, TextInput } from '@mantine/core';
import { useGetAllUsersQuery, useSearchUsersMutation } from '@/lib/redux/features/user/userApi';
import { IconClearAll, IconSearch } from '@tabler/icons-react';

export default function page() {

  const [searchUsers,{data,isLoading,isError}] = useSearchUsersMutation();
  const [value, setValue] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setDebouncedValue(value);
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [value]);

  useEffect(() => {
    
      searchUsers({ searchParam: debouncedValue });
    
  }, [debouncedValue, searchUsers]);

  useEffect(()=>{
    searchUsers({searchParam:''})
  },[])

  const rows = data?.users?.map((item:any) => {
    return (
      <Table.Tr key={item._id} >
        <Table.Td>
          <Group gap="sm">
            <Avatar size={26} src={item.avatar} radius={26} />
            <Text size="sm" fw={500}>
              {item?.fullName}
            </Text>
          </Group>
        </Table.Td>
        <Table.Td>{item?.contactInfo?.email}</Table.Td>
        <Table.Td>
          <div>
            <Text size='base' tw='500'>{item?.educationalInfo?.university}</Text>
            <Text size='xs'>{item?.educationalInfo?.department} </Text>
          </div>
        </Table.Td>
        <Table.Td>
          <div>
            <Text size='base' tw='500'>{item?.professionalInfo?.workplaceName}</Text>
            <Text size='xs'>{item?.professionalInfo?.workplacePosition}</Text>
          </div>
        </Table.Td>
      </Table.Tr>
    );
  });

  let tableContent = <div></div>;
  if (isLoading) {
    tableContent = <div>Loading...</div>;
  } else if (isError) {
    tableContent = <div>Error</div>;
  } else if (data?.users.length === 0) {
    tableContent = <div>No User Found</div>;
  } else if (data?.users.length > 0) {
    tableContent = (
      <Table miw={800} verticalSpacing="sm">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>User</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>University</Table.Th>
            <Table.Th>Workplace</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    );
  }

  return (
    <div className={classes.memberContainer}>
      <Container size={'lg'}>
        <div className={classes.headerWrapper}>
          <h1>All Members</h1>
          <div className={classes.searchbar}>
            <TextInput
            width={'100%'}
              py={4}
              value={value}
              onChange={(event) => setValue(event.currentTarget.value)}
              placeholder="Search by name"
              rightSection={<IconSearch/>}

            />
          </div>
        </div>
        <Card withBorder>
          <div>
            <Table.ScrollContainer minWidth={1050}>{tableContent}</Table.ScrollContainer>
          </div>
        </Card>
      </Container>
    </div>
  );
}
