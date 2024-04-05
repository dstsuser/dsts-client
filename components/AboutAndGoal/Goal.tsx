import { Container, Paper, Text } from '@mantine/core'
import React from 'react'
import classes from './AboutAndGoal.module.css'

export default function Goal() {
  return (
    <div className={classes.goalWrapper}>
        <Container size={'lg'} py={'xl'} >
            <Paper style={{backgroundColor:'#F6F6F6'}}>
                <Text className={classes.goalTitle}>
                    Goal of <span className={classes.titlePoint}>DSTS</span>
                </Text>
                <Text className={classes.goalSubtitle}>
                "DSTS: Empowering students, fostering unity, and enriching heritage in Sakhipur Upazila, Dhaka."
                </Text>

                <Text className={classes.goalContentParagraph}>
                Dhaka Sakhipur Upazila Students Association (DSTS) is to empower students and foster unity in Sakhipur Upazila, Dhaka. Through leadership development, counseling, and support, DSTS aids students in securing admission to universities and colleges in Dhaka. Community-building events like Iftar mahfil and Eid reunions strengthen bonds among students. DSTS conducts social engagement activities including blood donation drives and public awareness campaigns. Scholarship programs and cultural events enrich the educational environment while honoring Sakhipur's heritage. DSTS is dedicated to building a cohesive community and supporting students' aspirations.
                </Text>

            </Paper>
        </Container>
    </div>
    
  )
}
