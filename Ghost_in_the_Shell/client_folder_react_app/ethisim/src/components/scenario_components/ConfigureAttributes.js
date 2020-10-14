import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from "@material-ui/core/styles";
import EntryFields from "./entries";

const useStyles = makeStyles((theme) => ({
  issue: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

export default function MiddleReflection() {
  const classes = useStyles();

  return (
    <div className={classes.issue}>
      <Typography align="center" variant="h2">
        Configure Issues
      </Typography>
      <br />
      <br />
      <EntryFields />
    </div>
  );
}