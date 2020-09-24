import React, { useContext } from 'react'
import { TextField } from '@material-ui/core'

import { AppContext } from '../context/App.context'


const SetRounds = (props) => {
  const [appContext, dispatch] = useContext(AppContext)
  const { rounds } = props

  const updateRounds = (event) => {
    dispatch({
      type:'setRounds',
      rounds: parseInt(event.target.value)
    })
  }
  return (
    <TextField 
    label="Rounds" 
    variant="outlined" 
    type="number"
    inputProps={{
      min:10,
      max:40
    }}
    value={rounds} onChange={updateRounds} />
  )
}

export default SetRounds

