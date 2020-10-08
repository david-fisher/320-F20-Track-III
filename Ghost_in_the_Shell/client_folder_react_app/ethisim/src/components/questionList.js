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

function QuestionNode({id,question}){
  return(
    <div>
    <Typography variant="h6">{id}){question}</Typography>
    </div>
  )
}

export default function QuestionList({questions}){
  const classes = useStyles();
  return(
    <div>
      {questions.map(question=>(
        <QuestionNode key={question.id} {...question}/>
      ))}
    </div>
  )
}
