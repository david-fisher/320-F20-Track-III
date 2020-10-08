import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Link as RouterLink } from 'react-router-dom';
import Copyright from '../Copyright';
import StakeHolderList from '../StakeHolderList'
import {
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Box,
  Typography,
  Container,
  Link,
  Grid,
  Avatar,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 1000,
    height: '100%',
    maxHeight: 1000,
    backgroundColor: theme.palette.background.paper,
  },
}));

function ConversationEditor(){
  const classes = useStyles();
  const [stakeholders,setStakeholders] = useState([
    {id: 0, name: 'John'}
  ])
  const [count,setCount] = useState(1)
  function handleAdd(){
    setCount(count+1)
    const addStakeholder = stakeholders.concat({id: count, name:'Jay'})
    setStakeholders(addStakeholder)
  }

  return (
    <div>
    <StakeHolderList stakeholders={stakeholders}/>
    <button onClick={handleAdd}>add</button>
    </div>
  );
}

export default ConversationEditor;
