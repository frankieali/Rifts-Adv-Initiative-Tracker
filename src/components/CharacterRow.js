import React from 'react'
import { TableCell, TableRow, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import TrackerRow from './TrackerGrid'

const useStyles = makeStyles( theme => ({

}))

const CharacterRow = React.memo((props) => {
  const classes = useStyles()
  const { character, rounds, round, orientation, onInitChange, id } = props

  const updateInit = (event) => {
    onInitChange(parseInt(event.target.value) ,id)
  }

  const active = character.attackRounds.includes(round) ? "active" : ""

  return (
    <TableRow className={active}>
      <TableCell className='col2'>{character.name}</TableCell>
      <TableCell className='col3'>
      <TextField 
        type="number"
        inputProps={{
          min:1,
          max:40
        }}
        value={character.init} onChange={updateInit} />
      </TableCell>
      <TrackerRow character={character} rounds={rounds} />
    </TableRow>
  )
})

export default CharacterRow