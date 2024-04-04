import { Container, Grid, Paper, Text } from '@mantine/core'
import React from 'react'
import classes from './AboutAndGoal.module.css'

export default function AboutAndGoal() {
  return (
    <Container size={'lg'} py={'xl'}>
        <Paper className={classes.wrapper}>
            <Grid>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <Text
                        className={classes.title}
                        >
                        About Us
                    </Text>
                    <Text className={classes.contentParagraph}>
                    Established in 1995 by A.K.M Jahangir at Dhaka University, the Dhakasto Sakhipur Thana Students Association (DSTS) unites students from Sakhipur Thana, Tangail District. Dedicated to empowering youth, DSTS provides guidance for university admissions and fosters leadership qualities. Our initiatives include community events, social engagement, scholarships, and cultural celebrations, enriching education while honoring Sakhipur's heritage. Committed to student growth and community development, DSTS continues to shape a brighter future for Sakhipur and its residents.
                    </Text>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <Text
                        className={classes.title}
                        >
                        Goal
                    </Text>
                    <Text className={classes.contentParagraph}>
                    Dhaka Sakhipur Upazila Students Association (DSTS) is to empower students and foster unity in Sakhipur Upazila, Dhaka. Through leadership development, counseling, and support, DSTS aids students in securing admission to universities and colleges in Dhaka. Community-building events like Iftar mahfil and Eid reunions strengthen bonds among students. DSTS conducts social engagement activities including blood donation drives and public awareness campaigns. Scholarship programs and cultural events enrich the educational environment while honoring Sakhipur's heritage. DSTS is dedicated to building a cohesive community and supporting students' aspirations.
                    </Text>
                </Grid.Col>
            </Grid>
        </Paper>
    </Container>
  )
}
