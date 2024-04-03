import React from 'react'
import classes from './CommiteeMemberCard.module.css'
import { Card, Group, Image, Text } from '@mantine/core'

export default function CommitteeMemberCard({member}:{member:any}) {
    console.log(member)
  return (
    <Card padding="lg" >
        <Card.Section>
        <Image
            radius={'lg'}
            src={member?.user?.avatar}
            height={290}
            alt={member?.user?.fullName}
        />
        </Card.Section>

        <Group py={'md'} style={{display:'flex', justifyContent:'center'}}>
            <Text size='25px' fw={500}>{member?.user?.fullName}</Text>
        </Group>
        <Group style={{display:'flex',justifyContent:'center'}} >
            <Text size="22px" fw={500} c="dimmed" >{member?.position?.title} </Text>
        </Group>
    </Card>
  )
}
