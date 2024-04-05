
import React from 'react'
import classes from './HeaderBanner.module.css'

const HeaderBanner = ({data}:{data:any})=>{
  return(
    <div style={{
      height:'92vh',
      display:'flex',
      justifyContent:'start',
      alignItems:'center',
      backgroundImage:`linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${data.imageLink})`,
      padding:'0px 80px',
      backgroundRepeat:'no-repeat',
      backgroundSize:'cover'
      }} 
      className={classes.card}>
      <div>
        <h1 className={classes.subTitle}>
          {data.subtitle}
        </h1>
        <h4 className={classes.title}>
          {data.title}
        </h4>
        {/* <button>
          {data.buttonText}
        </button> */}
      </div>
    </div>
  )
}

export default HeaderBanner