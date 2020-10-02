import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Box,  
  Container,
  Typography,
} from '@material-ui/core';
import Copyright from '../components/Copyright';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center'
  },
  copyright: {
    marginTop: theme.spacing(2),
  }
}));

export default function Login(props) {
  const classes = useStyles();
  
  return (
    <Container component="main" maxWidth="lg">
      <Typography className={classes.title} variant="h4">
        Scenario Editor: {props.location.scenarioData.scenarioName} | {props.location.scenarioData.className}
      </Typography>
      <Box className={classes.copyright}>
        <Copyright />
      </Box>
    </Container>
  );
}
