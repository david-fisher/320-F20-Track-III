import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Button';
import Box from '@material-ui/core/Button';
import View from '@material-ui/core/Button';
import Copyright from '../Copyright';

const useStyles = makeStyles((theme) => ({
  textfields: {
    '& > *': {
      margin: theme.spacing(1),
      width: '110ch',
    },
  },
  buttons: {
    '& > *':{
    margin: theme.spacing(1),
    width: '50ch',
  },
  },
  subdiv: {
    '@media (min-height:500px)': {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center',
      bottom: '15px',
      //width: '100%',
      position: 'absolute',
    },
  },
  copyright: {
    color: 'white',
    paddingBottom: theme.spacing(2),
    '@media (min-height:500px)': {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center',
      bottom: '0px',
      width: '100%',
      position: 'absolute',
    }
  },
}));

export default function Logistics() {
  const classes = useStyles();
  return (
    <div>
          <Typography align="center" variant="h2">
            Logistics
          </Typography >
            <Typography align = "left" variant="h6">
              <form className={classes.textfields} noValidate autoComplete="off">
                Simulation Title
              <TextField id="Simulation Title" label="" />
                Course Name
              <TextField id="Course Name" label="" />
                Authors
              <TextField id="Author" label="" />
              Scenario ID:
              1342431
              </form>
              Shareable Link:
              wwww.ethisim.com
            </Typography>
          <div className = {classes.subdiv}>
            <form className={classes.buttons} noValidate autoComplete="off">
              <Button variant="contained" color="grey" >
               View Student Responses
              </Button>
              <Button variant="contained" color="primary" >
              Delete Scenario
              </Button>
              <Button variant="contained" color="primary" >
              View Version History
              </Button>
            </form>
           </div>
    </div>

  );
}
