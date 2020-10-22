import React from 'react'
import {Dialog,DialogTitle,DialogContent,Button,Typography,makeStyles} from '@material-ui/core'
import AddNewScenarioPageDialogBody from "../components/AddNewScenarioPageDialogBody"
import NavSideBarNode from "../components/NavSideBarNode"
const useStyles = makeStyles(theme =>({
  dialogWrapper:{
    padding: theme.spacing(2),
    position:'absolute',
    top: theme.spacing(5)
  },
  exitOutButton:{
    margin: theme.spacing(2),
    float: "right"
  }

}))
export default function AddNewSimulationScenarioPageDialog(props){
    const{title,openPopup,setOpenPopup,addPage} = props;
    const classes = useStyles();

    return(
      <div>
        <Dialog open={openPopup} maxWidth="md" classes={{paper: classes.dialogWrapper }}>
          <DialogTitle style={{display: "flex"}}>
             <div>
             <Typography variant="h2" alight="center" component="div" style={{flexFrow:1}}>{title}</Typography>
             </div>

          </DialogTitle>

          <Button className={classes.exitOutButton} variant="contained"
                  color="secondary" style={{marginLeft: "auto"}}
                  onClick={()=>{setOpenPopup(false)}}>X</Button>

          <DialogContent dividers>

            <AddNewScenarioPageDialogBody addPage={addPage} setOpenPopup={setOpenPopup} ></AddNewScenarioPageDialogBody>
          </DialogContent>
        </Dialog>
      </div>
    )
}
