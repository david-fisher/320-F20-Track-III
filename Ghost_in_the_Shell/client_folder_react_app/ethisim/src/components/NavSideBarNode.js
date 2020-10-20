import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Button,
  Avatar,
  Grid,
  TextField,
} from '@material-ui/core';
import SunEditor from "suneditor-react";
import htmlToText from 'html-to-text';

const useStyles = makeStyles((theme) => ({
}));

export default function StakeHoldeListNode({id,name}){
  const classes = useStyles();

  let handleChangeName = (event) => {
    console.log(event.target.value);
  }

  let handleChangeBiography = (content) => {
    //TODO Implement
    console.log(content);
    console.log(htmlToText.fromString(content));
  };

  let handleChangeConversationEntry = (content) => {
    //TODO Implement
    console.log(content);
    console.log(htmlToText.fromString(content));
  };

  return(
    <Grid
      container
      direction="row"
      justify = "flex-start"
      onClick={}
    >
      <Grid  item xs={9}>
        <Avatar
          className={classes.avatar}
          alt={`${id}`}
          src={`/static/images/avatar/${id}.jpg`}
        />
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
        >
          Point Selection
        </Button>
      </Grid>

      <Grid item xs={3}>

      </Grid>
    </Grid>
  )
}
