import { Card, Grid, Text } from '@mantine/core'
import React from 'react'
const classes = require('./Brief.module.css')

export default function Brief() {
  return (
    <div>
      <h2>Faces of DSTS</h2>
        <div className={classes.wrapper}>
        
            <Card shadow='sm' mb="xs" p="xs" withBorder>
                <Grid>
                    <Grid.Col span={2}>
                    <div className={classes.noticeDate}>
                        <Text size='lg' >25</Text>
                        <Text size='xs'>March</Text>
                    </div>
                    </Grid.Col>
                    <Grid.Col span={10}>
                        <Text mt="xs" c="dimmed" m="0" size="sm">
                            Please click anywhere on this card to claim your reward, this is not a fraud, trust us
                        </Text>
                    </Grid.Col>
                </Grid>
            </Card>
            <Card shadow='sm' mb="xs" p="xs" withBorder>
                <Grid>
                    <Grid.Col span={2}>
                    <div className={classes.noticeDate}>
                        <Text size='lg'>25</Text>
                        <Text size='xs'>March</Text>
                    </div>
                    </Grid.Col>
                    <Grid.Col span={10}>
                        <Text mt="xs" c="dimmed" m="0" size="sm">
                            Please click anywhere on this card to claim your reward, this is not a fraud, trust us
                        </Text>
                    </Grid.Col>
                </Grid>
            </Card>
            <Card shadow='sm' mb="xs" p="xs" withBorder>
                <Grid>
                    <Grid.Col span={2}>
                    <div className={classes.noticeDate}>
                        <Text size='lg'>25</Text>
                        <Text size='xs'>March</Text>
                    </div>
                    </Grid.Col>
                    <Grid.Col span={10}>
                        <Text mt="xs" c="dimmed" m="0" size="sm">
                            Please click anywhere on this card to claim your reward, this is not a fraud, trust us
                        </Text>
                    </Grid.Col>
                </Grid>
            </Card>
            
        </div>
    </div>
  )
}
