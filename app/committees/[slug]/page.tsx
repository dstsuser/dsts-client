'use client'
import { useGetCommitteeByPropertyQuery } from '@/lib/redux/features/committee/committeeApi';
import { Box, Container, Grid, Paper, Text } from '@mantine/core';
import React from 'react'
import classes from './committee.module.css';
import CommitteeMemberCard from '@/components/CommiteeMemberCard/CommiteeMemberCard';

export default function page({ params }: { params: { slug: string } }) {
    const { slug } = params;

    const {data,isLoading,isError} = useGetCommitteeByPropertyQuery({key:'slug',value:slug})

    console.log(data)

  return (
    <Container size={'lg'}>
        <Paper>
            <Box>
                <Text className={classes.title} >{data?.committee?.name}</Text>
            </Box>
            <Box style={{display:'flex',justifyContent:'center'}}>
                {
                    data?.committee?.members?.filter((member:any)=>member.position.slug === 'president').map((member:any)=>(
                        <CommitteeMemberCard key={member._id} member={member} />
                    ))
                }
            </Box>

            <Box mt={'xl'}>
                <Grid 
                    gutter={{ base: 5, xs: 'md', md: 70, xl: 70 }}
                >
                    {
                        data?.committee?.members?.filter((member:any)=>member.position.slug === 'vice-president').map((member:any)=>(
                            <Grid.Col span={{ base: 12, md: 6, lg: 4 }} key={member._id}>
                                <CommitteeMemberCard member={member} />
                            </Grid.Col>
                        ))
                    }
                </Grid>
            </Box>


            <Box mt={'xl'} style={{display:'flex',justifyContent:'center'}}>
                {
                    data?.committee?.members?.filter((member:any)=>member.position.slug === 'general-secretary').map((member:any)=>(
                        <CommitteeMemberCard key={member._id} member={member} />
                    ))
                }
            </Box>

            <Box mt={'xl'}>
                <Grid 
                    gutter={{ base: 5, xs: 'md', md: 70, xl: 70 }}
                >
                    {
                        data?.committee?.members?.filter((member:any)=>member.position.slug === 'joint-secretary').map((member:any)=>(
                            <Grid.Col span={{ base: 12, md: 6, lg: 4 }} key={member._id}>
                                <CommitteeMemberCard member={member} />
                            </Grid.Col>
                        ))
                    }
                </Grid>
            </Box>

        </Paper>
    </Container>
  )
}
