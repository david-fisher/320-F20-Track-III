import React from 'react';
import Body from '../Body';
import Title from '../Title';

import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Container,
  Button,
} from '@material-ui/core';
import QuestionFields from '../QuestionComponent/questions'



const useStyles = makeStyles((theme) => ({
saveButton:{
  margin: theme.spacing(2),
  float: "right",
  textTransform: "unset",
  variant: "contained",
},
}));


export default function Reflection() {
  const classes = useStyles();
  return (
    <Container component="main">
      <Typography align="center" variant="h2">
        Reflection Component
      </Typography>
      <Title />
      <Body />
     <QuestionFields />
     <Button className={classes.saveButton}  variant="contained" color="primary">Save</Button>
    </Container>

  );

}
