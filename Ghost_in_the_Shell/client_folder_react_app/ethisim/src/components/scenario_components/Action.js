import React from 'react';
import {
  Button,
  TextField,
  Typography,
  Container,
  Box,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Introduction from '../Introduction';
import Title from '../Title';
import Copyright from '../Copyright';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    marginTop: theme.spacing(1),
    width: '100%',
  },
  submit: {
    marginTop: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    color: 'white',
  },
  copyright: {
    margin: theme.spacing(2),
    opacity: 0.5,
  }
}));

export default function FinalAction() {
  const classes = useStyles();
  
  return (
    <Container component="main">
      <Typography align="center" variant="h2">
        Action Component
      </Typography>
      <Title />
      <Introduction />
      <div className={classes.container}>
        <form className={classes.form}>
          <Typography align="center" variant="h6">
            Option 1
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="option 1"
            label="Input Option 1 Text"
            name="option 1"
          />
          <Typography align="center" variant="h6">
            Option 2
          </Typography>
           <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="option 2"
            label="Input Option 2 Text"
            name="option 2"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
          >
            Submit User Options
          </Button>
        </form>
      </div>
      <Box className={classes.copyright}>
        <Copyright />
      </Box>
    </Container>
  );
}