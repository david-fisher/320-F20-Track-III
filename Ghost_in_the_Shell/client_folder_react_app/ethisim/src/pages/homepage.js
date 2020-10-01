import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid
} from '@material-ui/core';
import Copyright from '../components/copyright';
import HomepageNavBar from './homepageNavBar'

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(0),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#881c1c'
  },
  StudentAccessContainer:{
    width: 1000,
    height: 200,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  EthisimIntroContainer:{
    marginTop: theme.spacing(8),
    width: 1000,
    height: 200,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  TextField:{
    marginTop: theme.spacing(20),
    color: 'white',
  },
  AccessButton:{
    marginTop: theme.spacing(2),
    width: 225,
  },

  copyright: {
    marginTop: theme.spacing(2),
  },

}));

export default function Homepage() {
  const classes = useStyles();

  return (

    <Container className={classes.container}>
    <div>

    <HomepageNavBar/>
    <StudentAccess/>
    <EthisimIntro/>

    <Box className={classes.copyright}>
      <Copyright />
    </Box>

    </div>
    </Container>


  );
}
function StudentAccess(){
  const classes = useStyles();
  return(

    <div>
    <Container className={classes.StudentAccessContainer}>
    <form className={classes.TextField} noValidate autoComplete="off">
       <TextField
         id="Enter Class Code"
         label="Enter Class Code"
         variant="outlined"
         color="primary"
       />
     </form>

    <Button className={classes.AccessButton} variant="contained" color="primary" size="large">
     Join
    </Button>
    </Container>
    </div>
  )
}

const WhiteTextTypography = withStyles({
  root: {
    color: "#FFFFFF"
  }
})(Typography);

function EthisimIntro(){
  const classes = useStyles();
  return(
    <div className={classes.EthisimIntroContainer}>
    <WhiteTextTypography
       variant="h3"
       align="center"

     >
       Convenient Ethics Simulations
     </WhiteTextTypography>
     <WhiteTextTypography
       variant="body"
       align="center"
       className="EthisimIntro"
       >
       Ethisim allows you to easily create and assign ethics<br/>
       simulations. Run them for a participation grade, or<br/>
       develop them further into longer discussions for class.<br/>
     </WhiteTextTypography>
    </div>
  )
}
