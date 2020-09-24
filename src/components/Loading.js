import React from 'react'

export default (props) => (
  <div style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
    <img src={`/assets/images/lava-lamp.svg`} alt="loading indicator" width="250px" style={{width:250,height:250,margin:'auto 0'}} />
    { props.message && <span>{props.message}</span>}
  </div>
)