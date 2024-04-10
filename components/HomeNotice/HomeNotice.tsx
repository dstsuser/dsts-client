import { openModal } from '@/lib/redux/features/modal/modalSlice';
import { useGetAllNoticesQuery } from '@/lib/redux/features/notice/noticeApi'
import { Card,Flex,Grid,Image,Text } from '@mantine/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import SimpleModal from '../Modals/SimpleModal';
const classes = require('./HomeNotice.module.css')
import noticeDsts from '../../assets/images/noticedsts.jpg'

export default function HomeNotice() {

    const {data,isLoading,isError} = useGetAllNoticesQuery('');
    const dispatch = useDispatch()
    const {type} = useSelector((state:any)=>state.modal)
    const [selectedNotice, setSelectedNotice] = React.useState<any>(null)

    function getMonthDayYear(timestamp:any) {
        const monthNames = [
            "January", "February", "March", "April", "May", "June", "July",
            "August", "September", "October", "November", "December"
        ];
        const date = new Date(timestamp);
        const monthName = monthNames[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();
        return {
            month: monthName,
            day: day,
            year: year
        };
    }
    
    const handleViewNotice = (notice:any) => {
        console.log(notice)
        setSelectedNotice(notice);
        dispatch(openModal({type:'notice', title:notice?.title,size:'xl'}))
    }
    

  return (
    <div>
        <h2 className={classes.title}>Notice</h2>
        <div className={classes.wrapper}>
            {isLoading && <div>Loading...</div>}
            {isError && <div>Error</div>}
            {data && data?.map((notice:any)=>(
                <Card key={notice?._id} shadow='sm' mb="xs" p="xs" withBorder style={{cursor:'pointer'}}>
                    <div style={{display:'flex',justifyContent:'flex-start',gap:'10px',alignItems:'center'}} onClick={()=>handleViewNotice(notice)}>
                        <div>
                            <div className={classes.noticeDate}>
                                <div>
                                    <Text size='lg' >{getMonthDayYear(notice.date).day}</Text>
                                    <Text size='xs'>{getMonthDayYear(notice.date).month}</Text>
                                </div>
                            </div>
                        </div>
                        <div>
                            <Text mt="xs" c="dimmed" m="0" size="sm">
                                {notice.title}
                            </Text>
                        </div>
                    </div>
            </Card>
            ))}    
            <div>
                <Image src={'https://res.cloudinary.com/dulrojf39/image/upload/v1712779126/noticedsts_q9s9py.jpg'} alt='notice' width='100%' height='100%'/>
            </div>
        </div>
        {type === 'notice' &&
            <SimpleModal>
                <div>
                    <div>
                        <Image src={selectedNotice?.imagesLink[0]} alt={selectedNotice?.title} height='100%' width='100%'/>
                    </div>
                </div>
            </SimpleModal>
        }
    </div>
  )
}
