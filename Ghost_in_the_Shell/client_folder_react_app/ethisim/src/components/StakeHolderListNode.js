
import React, {useState} from 'react';
import {
  makeStyles,
  withStyles
} from '@material-ui/core/styles';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Avatar,
  Grid,
} from '@material-ui/core';
import Copyright from '../components/Copyright';

const useStyles = makeStyles((theme) => ({

}));

export default function StakeHoldeListNode({id,name}){

  return(
    <Grid
      container
      direction="row"
      justify = "flex-start"
      allignItems="center"
    >


        <Grid item xs={1}>
          <Avatar
            alt={`${id}`}
            src={`/static/images/avatar/${id}.jpg`}
          />
          <Typography variant="h6">
            {name}
          </Typography>
        </Grid>


        <Grid item xs={6}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="bio"
            label="Biography"
            name="bio"
            autoComplete="Does this guy even exist?"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="conversation entry"
            label="Conversation Entry"
            name="conversation entry"
            autoComplete="hello? anybody there?"
            autoFocus
          />
          <Button>yellow</Button>
        </Grid>


    </Grid>
  )
}
