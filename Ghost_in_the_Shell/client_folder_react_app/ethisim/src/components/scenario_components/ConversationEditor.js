import React from 'react';
import StakeHolderFields from '../StakeHoldersComponent/stakeHolders'
import {
  Button,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
saveButton:{
  margin: theme.spacing(2),
  float: "right",
  textTransform: "unset",
},
}));

export default function ConversationEditor(){
  const classes = useStyles();
  return (
    <div>
       <StakeHolderFields />
       <Button className={classes.saveButton}  variant="contained" color="primary">Save</Button>
    </div>
  );
}
