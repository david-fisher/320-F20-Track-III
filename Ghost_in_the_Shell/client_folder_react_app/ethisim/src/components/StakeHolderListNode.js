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
import SunEditor from "suneditor-react";
import 'suneditor/dist/css/suneditor.min.css';
import htmlToText from 'html-to-text';

const useStyles = makeStyles((theme) => ({

}));

export default function StakeHoldeListNode({id,name}){

  let handleChange = (content) => {
    //TODO Implement
    console.log(content);
    console.log(htmlToText.fromString(content));
  };

  return(
    <Grid
      container
      direction="row"
      justify = "flex-start"
      allignItems="center"
      spacing={2}
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
        <SunEditor
          setOptions={{
            width:'100%',
            height: 150,
            placeholder: "Biography",
            buttonList: [
              ['undo', 'redo'],
              ['fullScreen', 'preview'],
            ]}}
          onChange={handleChange}
        />
        <SunEditor
          setOptions={{
            width:'100%',
            height: 150,
            placeholder: "Conversation Entry",
            buttonList: [
              ['undo', 'redo'],
              ['fullScreen', 'preview'],
            ]}}
          onChange={handleChange}
        />
          <Button
          variant="contained">Save</Button>
        </Grid>


    </Grid>
  )
}
