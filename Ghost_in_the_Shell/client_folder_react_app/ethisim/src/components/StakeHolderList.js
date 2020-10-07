
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
} from '@material-ui/core';
import Copyright from '../components/Copyright';
import StakeHolderListNode from '../components/StakeHolderListNode';

const useStyles = makeStyles((theme) => ({

}));

export default function StakeHolderList({stakeholders}){

  return(
    <div>
    {stakeholders.map(stakeholder=>(
      <StakeHolderListNode key={stakeholder.id} {...stakeholder} />
    ))}
    </div>
  );
}
