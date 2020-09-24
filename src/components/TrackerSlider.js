import React, { useState, useCallback } from 'react'
import { Slider, TableCell } from '@material-ui/core'
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import _ from 'underscore'

const theme = createMuiTheme({
  direction: 'rtl',
});

const useStyles = makeStyles( theme => ({
  root: {
    // flexGrow: 1,
    textAlign: 'left',
    padding: "5px 14px 0",
    backgroundColor: "#FFF",
    '& .MuiSlider-thumb': {
      marginRight: -5,
    },
    '&.vertical': {
      '& .MuiSlider-thumb': {
        marginRight: 0,
      }
    }
  }
}))

const TrackerSlider = (props) => {
  const classes = useStyles()
  const { orientation, rounds, round, onChange } = props
  const [ currentValue, setCurrentValue ] = useState(rounds)

  const updateSlider =  useCallback(_.throttle((event, newValue) => {
    if(currentValue !== newValue){
      onChange(newValue)
      setCurrentValue(newValue)
    }
  }, 10),[currentValue])

  return (
    <TableCell colspan={rounds} className={`${classes.root} ${orientation} slider`}>
      <ThemeProvider theme={theme}>
        <Slider
          defaultValue={round}
          value={round}
          valueLabelDisplay="auto"
          orientation={orientation}
          step={1}
          marks
          min={1}
          max={rounds}
          track="inverted"
          onChange={updateSlider}
          style={orientation === 'horizontal' ? {width:`${(28 * (rounds-1))}px`} : {height:`${(28 * (rounds-1))}px`}}
        />
      </ThemeProvider>
    </TableCell>
  )
}

export default TrackerSlider