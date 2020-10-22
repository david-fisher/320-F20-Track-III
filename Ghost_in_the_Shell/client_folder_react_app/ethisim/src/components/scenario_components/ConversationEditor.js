import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import StakeHolderList from '../StakeHolderList'
import { Button } from '@material-ui/core';
import StakeHolderFields from '../StakeHoldersComponent/stakeHolders'
/*
const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: 'center',
    backgroundColor: theme.palette.background.paper,
  },
  button: {
    textTransform: 'unset',
  }
}));
*/
export default function ConversationEditor(){
 /* const classes = useStyles();

  const [stakeholders,setStakeholders] = useState([{id: 1}]);
  const [count, setCount] = useState(2);

  function handleAdd(){
    let newCount = count + 1;
    setCount(newCount);
    const addStakeholder = stakeholders.concat({id: count});
    setStakeholders(addStakeholder);
  }
*/
  return (
   /* <div className={classes.root}>
      <StakeHolderList stakeholders={stakeholders}/>
      <Button 
        className={classes.button}
        onClick={handleAdd}
        variant="contained"
        color="primary"
      >
        Add Stakeholder
      </Button>
    </ div> */
    <div>
       <StakeHolderFields />
    </div>
  );
}
