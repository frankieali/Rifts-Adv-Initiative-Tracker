import React, { useContext } from 'react'
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { AppContext } from '../context/App.context'
import SetRounds from './SetRounds'
import CharacterRow from './CharacterRow'
import { TrackerColumns, TrackerHeader } from './TrackerGrid'
import TrackerSlider from './TrackerSlider'
import AddCharacter from './ResponsiveDialog'

const useStyles = makeStyles( theme => ({
  // mainTable: {
  //   display: 'flex',
  //   flexDirection: 'column',
  //   '& .col1': {
  //     width: 75,
  //     minWidth: 75,
  //     // height: 28
  //   },
  //   '& .col2': {
  //     width: 120,
  //     minWidth: 120,
  //     // height: 28
  //   },
  //   '& .col3': {
  //     width: 60,
  //     minWidth: 60,
  //     // height: 28
  //   },
  //   '&.vertical': {
  //     flexDirection: 'row',
  //   },
  //   // [`& .square:nth-child(${props.round})`]: {
  //   //   backgroundColor: '#ccc'
  //   // }
  // },
  // header: {
  //   display: 'flex',
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   '&.vertical': {
  //     flexDirection: 'column',
  //   },
  //   '& > div': {
  //     padding: theme.spacing(.5)
  //   }
  // },
  // footer: {
  //   display: 'flex',
  //   flexDirection: 'row',
  //   '&.vertical': {
  //     flexDirection: 'column',
  //   },
  //   '& > div': {
  //     padding: theme.spacing(.5)
  //   }
  // },
  root: {
    display: "inline-block"
  },
  tableContainer: {
    display: "inline-block",
    position: 'relative',
    // '& .slider': {
    //   position: 'absolute',
    //   top: 0
    // }
  },
  table: {
    minWidth: 650,
    overflow: "hidden",
    '& .active': {
      backgroundColor: 'rgba(0, 140, 203, 0.2)'
    }
  },


}))

/* TODO: 
 *    auto add negative rounds - 5 attacks and init is 2 then attacks on 2,1,0,-1,-2 :: don't know if I like the idea of negative rounds. I think it's better if characters lose actions on very low initiative. Make it a configurable option
 *    add character to favorite list - saved to local storage (seperate from app state)
 *    sort rows by initiative
 *    Make name a Chip component
 *    Add Popover component to name Chip to show additional stats - health, conditions, bonus/penalty
 *    Make rows drag and droppable - also, lock rows
 *    Save all context data to local storage and make it retrieveable
 *    Make multiple different sessions restorable - new/load landing screen
 *    Vertical display - from button or orientation change
 *    keyboard controls
 *    make init column configurable show/hide
 *    freeze header
 *    put slider over header - check that it shows when sliding
 *    change loading indicator to Progress component
 * 
 *  Chip
 *    remove character
 *    disable character
 *    status
 *    init
 *    turns
 *    init bonus
 *    conditions (same as status)
 *    configurable numerical trackers (perhaps with selectable icons) - add or remove as many as you need
 * 
 *  Configurations
 *    dark mode
 *    custom background
 *    show init
 *    make turn "X" a toggle button - configurable option
 *    allow negative rounds
 *    freeze header / turn tooltip
 */

const Tracker = (props) => {
  const [appContext, dispatch] = useContext(AppContext)
  const { characters, orientation, round, rounds } = appContext
  const classes = useStyles()

  const handleAddCharacter = (character) => {
    dispatch({
      type: 'addCharacter',
      character
    })
  }

  const handleSlider = (round) => {
      dispatch({
        type: 'setRound',
        round
    })
  }

  const handleInitChange = (init = 1,id) => {
    init = isNaN(init) ? "" : parseInt(init)

    dispatch({
      type: 'updateInit',
      id,
      init
    })
  }

  const toggleOrientation = () => {
    dispatch({
      type: "toggleOrientation",
    })
  }

  return (
    <Box m={5} className={classes.root}>
      <SetRounds rounds={rounds} />
      <TableContainer component={Paper} className={`${classes.tableContainer} ${orientation}`}>
        <Table className={classes.table} size="small">
          <TrackerColumns rounds={rounds} round={round} />
          <TableHead>
            <TableRow>
              <TableCell>Character</TableCell>
              <TableCell>Init</TableCell>
              <TrackerHeader rounds={rounds} />
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(characters).map((key,i) => 
              <CharacterRow 
                key={i} 
                id={key} 
                character={characters[key]} 
                rounds={rounds} 
                round={round} 
                orientation={orientation} 
                onInitChange={handleInitChange} 
              />
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell></TableCell>
              <TableCell><Button variant="contained">Reset</Button></TableCell>
              <TrackerSlider
                rounds={rounds} 
                round={round}
                orientation={orientation} 
                onChange={handleSlider}
              />
            </TableRow>
          </TableFooter>
        </Table>

      </TableContainer>
      <div>Round: {round}</div>
      <AddCharacter addCharacter={handleAddCharacter} max={rounds} min={1} />
      <div><Button onClick={toggleOrientation}>{orientation === "horizontal" ? "vertical" : "hotizontal"}</Button></div>
    </Box>
  )
}

export default Tracker
