import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Box, 
  Container,
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
        <Box className={classes.copyright}>
          <Copyright />
        </Box>
    </Container>
  );
}
