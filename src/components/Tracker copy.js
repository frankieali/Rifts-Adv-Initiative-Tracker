import React, { useEffect, useState, useContext, useCallback } from 'react'
import { Box, Button, Container, TextField, Slider } from '@material-ui/core'
import { makeStyles, styled } from '@material-ui/core/styles'
import _ from 'underscore'

import { AppContext } from '../context/App.context'
import SetRounds from './SetRounds'
import Player from './Player'
import { TrackerHeader } from './TrackerGrid'
import TrackerSlider from './TrackerSlider'
import AddPlayer from './ResponsiveDialog'

const useStyles = makeStyles( theme => ({
  mainTable: {
    display: 'flex',
    flexDirection: 'column',
    '& .col1': {
      width: 75,
      minWidth: 75,
      // height: 28
    },
    '& .col2': {
      width: 120,
      minWidth: 120,
      // height: 28
    },
    '& .col3': {
      width: 60,
      minWidth: 60,
      // height: 28
    },
    '&.vertical': {
      flexDirection: 'row',
    },
    // [`& .square:nth-child(${props.round})`]: {
    //   backgroundColor: '#ccc'
    // }
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    '&.vertical': {
      flexDirection: 'column',
    },
    '& > div': {
      padding: theme.spacing(.5)
    }
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    '&.vertical': {
      flexDirection: 'column',
    },
    '& > div': {
      padding: theme.spacing(.5)
    }
  },

}))

/* TODO: auto add negative rounds - 5 attacks and init is 2 then attacks on 2,1,0,-1,-2
 * TODO: add character to favorite list - saved to local storage
 * TODO: if init is higher than rounds then up the rounds
 * TODO: switch to table elements with <col />
 */

const Tracker = (props) => {
  const [appContext, dispatch] = useContext(AppContext)
  const { orientation, round, rounds } = appContext
  const classes = useStyles()
  const [players, setPlayers] = useState([])

  // useEffect(() => {
  //   document.querySelectorAll(`.square.active`).forEach((el) => el.classList.remove('active'))
  //   document.querySelectorAll(`.square:nth-child(${rounds-round+1})`).forEach((el) => {el.classList.add('active')})
  // },[round])

  const handleAddPlayer = (data) => {
    setPlayers(prev => [
      ...prev,
      data
    ])
  }

  const toggleOrientation = () => {
    dispatch({
      type: "toggleOrientation",
    })
  }

  // const updateSlider = useCallback(_.throttle((event, newValue) => {
  //   console.log(newValue)
  // }, 200),[])

  return (
    <Box>
      <Container>
        <SetRounds />
        <Box component="div" className={`${classes.mainTable} ${orientation}`}>
          {/* HEADER */}
          <div className={`${classes.header} ${orientation}`}>
            <div className='col1'>Status</div>
            <div className='col2'>Character</div>
            <div className='col3'>Init</div>
            <TrackerHeader rounds={rounds} round={round} />
          </div>
          {/* END HEADER */}

          {players.map((player,i) => <Player key={i} player={player} rounds={rounds} round={round} orientation={orientation} />)}

          {/* FOOTER */}
          <div className={`${classes.footer} ${orientation}`}>
            <div className='col1'>Reset</div>
            <div className='col2'></div>
            <div className='col3'>Reset</div>
            <TrackerSlider />
          </div>
          {/* END FOOTER */}
        </Box>
      {/* <Slider 
        defaultValue={1}
        valueLabelDisplay="auto"
        step={1}
        marks
        min={1}
        max={31}
        onChange={updateSlider}
      /> */}
      </Container>
      <div>Round: {round}</div>
      <AddPlayer addPlayer={handleAddPlayer} max={rounds} min={1} />
      <div><Button onClick={toggleOrientation}>{orientation === "horizontal" ? "vertical" : "hotizontal"}</Button></div>
    </Box>
  )
}

export default Tracker
