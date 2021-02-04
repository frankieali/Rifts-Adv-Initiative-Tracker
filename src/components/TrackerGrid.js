import React from 'react'
import { TableCell } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles( theme => ({
  square: {
      width: 28,
      minWidth: 28,
      height: 28,
      minHeight: 28,
      lineHeight: '26px',
      padding: 1,
      textAlign: 'center',
      '&:last-child': {
        paddingRight: 1
      }
  }
}))

export const TrackerColumns = React.memo((props) => {
  const { rounds, round } = props
  return (
    <colgroup>
      {/* The +2 here accounts for character and init columns, init may become configurable */}
      {Array.from(Array(rounds+2)).map((el, i) => <col key={i} className={round === rounds-i+2 ? "active" : ""} />)}
    </colgroup>
  )
})

export const TrackerHeader = React.memo((props) => {
  const classes = useStyles()
  const { rounds } = props

  return (
    <>
      {Array.from(Array(rounds).keys()).reverse().map((round, i) => <TableCell key={i} className={classes.square}>{round+1}</TableCell>)}
    </>
  )
})

const TrackerRow = React.memo((props) => {
  const classes = useStyles()
  const { character: {attackRounds}, rounds } = props

  return (
    <>
      {
        Array.from(Array(rounds).keys()).reverse().map((round, i) => <TableCell key={i} className={classes.square}>{attackRounds.includes(round+1) ? "X" : ""}</TableCell>)
      }
    </>
  )
})

export default TrackerRow