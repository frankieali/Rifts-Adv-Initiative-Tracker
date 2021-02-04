import React from 'react'
import { CircularProgress } from '@material-ui/core'

export default (props) => (
  <div style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center', height:'70vh'}}>
    {/* <img src={`/assets/images/lava-lamp.svg`} alt="loading indicator" width="250px" style={{width:250,height:250,margin:'auto 0'}} />
    { props.message && <span>{props.message}</span>} */}
    <CircularProgress size='9rem' />
  </div>
)