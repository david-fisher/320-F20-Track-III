import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  TextField,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

export default function Title(props) {
  const classes = useStyles();
  const { title } = props;

  let handleChange = (content) => {
    //TODO Implement
  }

  return (
    <div className={classes.root}>
      <Typography variant="h4" >
        Title:
      </Typography>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="title"
        label="Title of component"
        value={title}
        onChange={handleChange}
        name="title"
      />
    </div>
  );
}
