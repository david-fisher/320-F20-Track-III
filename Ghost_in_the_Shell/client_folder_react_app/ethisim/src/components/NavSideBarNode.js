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
  pageButton : {
    width: "100%",
    minHeight: "100px",
  },
  deleteButton:{
    width:"100%",
    mingHeight: "100px",
  }
}));

export default function NavSideBarNode({onClick,deleteByID,id,name,component}){
  const classes = useStyles();
  function handleDelete(){
      console.log("delete is: ")
      console.log(id)
      deleteByID(id)
  }

  function handleDisplayComponent(){
      onClick(component)
  }
  return(
    <div>
    <Grid
      container
      direction="row"
      justify = "flex-start"

    >
      <Grid  item xs={10}>
        <Button
          className={classes.pageButton}
          variant="contained"
          color="primary"
          onClick={handleDisplayComponent}
        >
          {name}
        </Button>
      </Grid>

      <Grid item xs={2}>
        <Button className={classes.deleteButton} color = "secondary"
        onClick={handleDelete}>
          X
        </Button>

      </Grid>
    </Grid>
    </div>
  )
}
