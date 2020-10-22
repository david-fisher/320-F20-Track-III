import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import BasicTable from "./table";
import htmlToText from 'html-to-text';
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(0.5),
    marginTop: theme.spacing(0),
    width: 50,
  },
}));

const styles = (theme) => ({
  root: {
    margin: 1,
    padding: theme.spacing(2),
    
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);


export default function QuestionField(props) {

  const [openThree, setOpenThree] = React.useState(false);

  const handleClickOpenThree = () => {
    setOpenThree(true);
  };
  const handleCloseThree = () => {
    setOpenThree(false);
  };

  let handleChange = (content, editor) => {
    //TODO Implement
    console.log(content);
    console.log(htmlToText.fromString(content));
  }
 
  
  //TABLE
  const[rows, setRows] = useState([]);

   const [row, setEdit] = useState({
    id: Math.floor(Math.random() * 10000),
    issuename: '  ',
    score: ' ',
    maxpoints: ' ',
  });



  const removeRow = (rowID) => {
    console.log(rowID);
    const leftRows = rows.filter((r) => r.id !== rowID);
    setRows(leftRows);
  };

  const addRow = (e) => {
    
    const newRows = [...rows, row];
    setRows(newRows);
    console.log(...rows);
    setEdit( {id: Math.floor(Math.random() * 10000) } );

  }

  function updateRow(rowID, rowBody) {
    //TODO
    //functional code to save items to backend
  }


//TABLE





  
  const classes = useStyles();

  return (
    <div>
      <Box
        display="flex"
        flexDirection="row"
        p={1}
        m={1}
        bgcolor="background.paper"
      >
        <Box p={1}>
          <form noValidate autoComplete="off">
            <TextField
              style={{ width: 700 }}
              id="outlined-multiline-static"
              label="Question"
              multiline
              rows={2}
              variant="outlined"
            />
            <TextField
              style={{ width: 700, marginTop: 20}}
              id="outlined-multiline-static"
              label="StakeHolder Response"
              multiline
              rows={2}
              variant="outlined"
            />
          </form>
        </Box>
        <Box p={1}>
          <div>
            <Button
              className={classes.margin}
              variant="contained"
              color="primary"
            >
              Save
            </Button>
          </div>
          <div>
            <Button
              className={classes.margin}
              variant="contained"
              color="primary"
              onClick={() => props.removeQuestion(props.question.id)}
            >
              Delete
            </Button>
          </div>
          <div>
            <Button
              className={classes.margin}
              variant="contained"
              color="primary"
              onClick={handleClickOpenThree}
            >
              Points
            </Button>
          </div>
        </Box>
      </Box>

      <Dialog
        onClose={handleCloseThree}
        aria-labelledby="customized-dialog-title"
        open={openThree}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleCloseThree}>
          <h2>Point Selection</h2>
          <form>
            <Button variant="contained" color="primary" onClick={addRow}>
              Add Issue     
            </Button>
          </form>
        </DialogTitle>
        <DialogContent>


          <BasicTable 
           
           removeRow= {removeRow}
           rows = {rows}
          
          />



        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloseThree} color="primary">
            Save changes
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
}
