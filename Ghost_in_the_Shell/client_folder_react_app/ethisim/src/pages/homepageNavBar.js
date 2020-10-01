import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {AppBar, Toolbar, Typography, Button, IconButton} from '@material-ui/core/';

import MenuIcon from '@material-ui/icons/Menu';
import {spacing} from '@material-ui/system'
import { Link } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width:"100%",
    margin: theme.spacing(0),
    padding: theme.spacing(0)
  },

  title: {
    flexGrow: 1,
  },
  navButtons: {
    marginRight: theme.spacing(3),
    padding: theme.spacing(1)
  }
}));

export default function HomepageNavBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>

          <Typography variant="h5" className={classes.title}>
            Ethisim
          </Typography>


          <Button component={Link} to={"/signup"}
            linkButton={true}
            className={classes.navButtons}
            variant="contained"
            backgroundColor="white"
            >Sign Up</Button>


          <Button component={Link} to={"/login"}
            linkButton={true}
            className={classes.navButtons} variant="outlined" m={-2}>Log In</Button>


        </Toolbar>
      </AppBar>
      
    </div>
  );
}
