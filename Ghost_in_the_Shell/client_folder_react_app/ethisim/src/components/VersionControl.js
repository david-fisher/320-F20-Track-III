import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  dialogTitle: {
    textAlign: 'center',
  },
  historyPanel: {
    width: '100%',
    margin: theme.spacing(1),
    textTransform: 'unset',
    display: 'block',
  },
  historyPanelSelected: {
    backgroundColor: theme.palette.primary.light,
    width: '100%',
    margin: theme.spacing(1),
    textTransform: 'unset',
    display: 'block',
  },
}));

function HistoryPanel(props) {
  const classes = useStyles();
  const { data, selectedVersion, setSelectedVersion, setSelectedVersionData } = props;
  const { author, date, id } = data;

  let buttonCSS = selectedVersion != null && id === selectedVersion ? classes.historyPanelSelected : classes.historyPanel;

  const handleSelectVersion = () => {
    setSelectedVersion(id);
    setSelectedVersionData(data);
  };

  return (
    <div >
      <Grid
        container
       >
        <Button 
          className={buttonCSS}
          variant="outlined" 
          color="primary"
          onClick={handleSelectVersion}
        >
          <Typography 
            variant="subtitle1" 
            noWrap
          >
            Date Saved: {new Date(date).toLocaleString()}  
          </Typography>
          <Typography 
            variant="subtitle1"
          >
            Author: {author}
          </Typography>
        </Button>
      </Grid>
    </div>
  );
};

function DialogTitle(props) {
  const classes = useStyles();
  const { children, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
};


export default function VersionControlDialog(props) {
  const [open, setOpen] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState(null);
  const [selectedVersionData, setSelectedVersionData] = useState(null);
  const { setTitle, setIntroduction, history } = props;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if (selectedVersion !== null) {
      const { title, introduction } = selectedVersionData;
      setTitle(title);
      setIntroduction(introduction);
    }
    setOpen(false);
  };

  let historyPanels = history.map(data => 
    <HistoryPanel 
      data={data}
      key={data.id} 
      selectedVersion={selectedVersion}
      setSelectedVersion={setSelectedVersion}
      selectedVersionData={selectedVersionData}
      setSelectedVersionData={setSelectedVersionData}
    />
  );

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Version History
      </Button>
      <Dialog fullWidth={true} maxWidth="sm" onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          History
        </DialogTitle>
        <DialogContent dividers>
          <Typography>
            Selecting a version will autofill the component with the version's past data.
            You can undo this change by selecting the "Revert" button.
          </Typography>
        </DialogContent>
        <DialogContent dividers>
          {historyPanels}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Select Version
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
