import React from 'react';
import {
  Dialog, 
  DialogTitle,
  DialogContent,
  Button, 
  Typography,
  makeStyles,
} from '@material-ui/core';
import AddNewScenarioPageDialogBody from "../components/AddNewScenarioPageDialogBody";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const useStyles = makeStyles(theme =>({
  dialogWrapper:{
    padding: theme.spacing(2),
    position:'absolute',
    top: theme.spacing(5)
  },
  exitOutButton:{
    margin: theme.spacing(2),
    marginLeft: "auto",
    float: "right",
    border: "3px solid",
    borderColor: theme.palette.primary.light,
  },
}))

export default function AddNewSimulationScenarioPageDialog(props){
    const{title,openPopup,setOpenPopup,addPage} = props;
    const classes = useStyles();

    return(
      <div>
        <Dialog open={openPopup} maxWidth="md" classes={{paper: classes.dialogWrapper }}>

          <DialogTitle disableTypography={true} style={{display: "flex"}}>
             <Typography variant="h3" align="center" component="div" style={{display: "flex"}}>{title}</Typography>
             <Button className={classes.exitOutButton} variant="contained"
                  color="primary"
                  onClick={()=>{setOpenPopup(false)}}>
                  <HighlightOffIcon />
              </Button>
          </DialogTitle>

          <DialogContent dividers>
            <AddNewScenarioPageDialogBody addPage={addPage} setOpenPopup={setOpenPopup} ></AddNewScenarioPageDialogBody>
          </DialogContent>

        </Dialog>
      </div>
    )
}
