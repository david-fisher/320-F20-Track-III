import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from "@material-ui/core/styles";
import EntryFields from "../IssueEntryFieldList";
import {Button} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  issue: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  saveButton:{
    margin: theme.spacing(2),
    float: "right",
    textTransform: "unset",
  },

}));

export default function ConfigureIssues() {
    const classes = useStyles();


  return (
    <div>
    <div className={classes.issue}>
      <Typography align="center" variant="h2">
        Configure Ethical Issues
      </Typography>
      <br />
      <br />
      <EntryFields />
    </div>
    <Button className={classes.saveButton} variant="contained" color="primary">Save</Button>
    </div>
  );

}
