import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Box, 
  Container,
  Typography,
} from '@material-ui/core';
import Copyright from '../components/copyright';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(6),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  copyright: {
    marginTop: theme.spacing(2),
  }
}));

export default function Homepage() {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Typography 
        variant="h1"
        align="center"
      >
        Convenient Ethics Simulations
      </Typography>
      <Typography 
        variant="h4"
        align="center"
        >
        Ethisim allows you to easily create and assign ethics 
        simulations. Run them for a participation grade, or
        develop them further into longer discussions for class.
      </Typography>
        <Box className={classes.copyright}>
          <Copyright />
        </Box>
    </Container>
  );
}
