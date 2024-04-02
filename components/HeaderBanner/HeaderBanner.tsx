
import React from 'react'
import classes from './HeaderBanner.module.css'

const HeaderBanner = ({data}:{data:any})=>{
  return(
    <div style={{
      height:'92vh',
      display:'flex',
      justifyContent:'start',
      alignItems:'center',
      backgroundImage:`linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${data.image})`,
      padding:'0px 80px',
      backgroundRepeat:'no-repeat',
      backgroundSize:'cover'
      }} 
      className={classes.card}>
      <div>
        <h4 className={classes.title}>
          {data.title}
        </h4>
        <h1 style={{fontSize:'90px',color:'white',margin:0}}>
          {data.subtitle}
        </h1>
        <button>
          {data.buttonText}
        </button>
      </div>
    </div>
  )
}

export default HeaderBanner