import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Container,
} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  textfields: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
  buttons: {
    '& > *':{
    margin: theme.spacing(1),
    width: '100%',
  },
  },
  subdiv: {
    marginTop: theme.spacing(1),
    width: '500px',
    '@media (max-width:750px)': {
      width: '100%',
    },
  },
}));

export default function Logistics(props) {
  const classes = useStyles();
  const { name, className, authors } = props;
  
  let handleChangeTitle = (event) => {
    //TODO Implement
    console.log(event.target.value);

  };

  
  let handleChangeClassName = (event) => {
    //TODO Implement
    console.log(event.target.value);

  };

  let handleChangeAuthor = (event) => {
    //TODO Implement
    console.log(event.target.value);

  };

  return (
    <Container component="main">
      <Typography align="center" variant="h2">
        Logistics
      </Typography >
        <Typography align = "left" variant="h6">
          <form className={classes.textfields} noValidate autoComplete="off">
            Simulation Title
          <TextField 
            margin="normal"
            fullWidth
            id="simulationTitle"
            label="Simulation Title"
            name="Simulation Title"
            value={name}
            onChange={handleChangeTitle}
          />
            Class Name
          <TextField 
            margin="normal"
            fullWidth
            id="className"
            label="Class Name"
            name="Class Name"
            value={className}
            onChange={handleChangeClassName}
          />
            Authors
          <TextField 
            margin="normal"
            fullWidth
            id="authorName"
            label="Author Name"
            name="Author Name"
            onChange={handleChangeAuthor}
          />
          Scenario ID:
          1342431
          </form>
          Shareable Link:
          wwww.ethisim.com
        </Typography>
      <div className = {classes.subdiv}>
        <form className={classes.buttons} noValidate autoComplete="off">
          <Button variant="contained" >
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
    </Container>
  );
}
