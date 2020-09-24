import React, { useState } from 'react'
import { AppBar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Tab, Tabs, TextField, Typography, useMediaQuery } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'


const useStyles = makeStyles( theme => ({
  form: {
    display: "flex",
    flexDirection: "column",
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    }
  }
}))
const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component='div'>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}

export default function ResponsiveDialog(props) {
  const classes = useStyles()
  const { addCharacter, min, max } = props
  const [open, setOpen] = useState(false)
  const [tabValue, setTabValue] = React.useState(0);
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  /* TODO: validate numbers are withing allowed range if entered manually - may have to switch to controlled inputs with state */

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleAdd = (event, stuff) => {
    event.preventDefault()
    const name = event.target.name.value || "mob" //default name
    addCharacter({
      name,
      attacks: parseInt(event.target.attacks.value),
      init: parseInt(event.target.init.value)
    })
    event.target.reset()
    event.target.name.focus()
  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add Character
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <AppBar position="static" color="default">
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="New Mob" {...a11yProps(0)} />
            <Tab label="Favorite" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <Box>
          <TabPanel value={tabValue} index={0} dir={theme.direction}>
            <form 
              id="newCharacter"
              className={classes.form}
              noValidate
              autoComplete="off"
              onSubmit={handleAdd}
            >
              <TextField
                required
                name="name"
                label="Name"
                variant="outlined"
                autoFocus={true}
              />
              <TextField 
                name="attacks" 
                label="Number of attacks" 
                variant="outlined"
                type="number"
                defaultValue={1}
                inputProps={{
                  min:1,
                  max:max
                }}
              />
              <TextField 
                name="init" 
                label="Initiative" 
                variant="outlined"
                type="number"
                defaultValue={1}
                inputProps={{
                  min:min,
                  max:max
                }}
              />
              <Box>
                <Button 
                  color="primary"
                  type="submit"
                  form="newCharacter"
                >
                  Add
                </Button>
                <Button
                  onClick={handleClose}
                  color="primary"
                >
                  Close
                </Button>
              </Box>
            </form>
          </TabPanel>
          <TabPanel value={tabValue} index={1} dir={theme.direction}>
            Favorite List
          </TabPanel>
        </Box>
      </Dialog>
    </div>
  )
}