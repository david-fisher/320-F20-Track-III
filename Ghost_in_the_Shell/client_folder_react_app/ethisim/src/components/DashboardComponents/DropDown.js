/* eslint-disable no-use-before-define */
import React, { useState}  from 'react';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
    '& > * + *': {
      marginTop: theme.spacing(3),
    },
  },
}));





export default function Tags(props) {

  
  const classes = useStyles();

  const onTagsChange = (event, values) => {
   props.update(values);
  }

  return (
    <div className={classes.root}>
      <Autocomplete
        multiple
        id="tags-standard"
        options={props.courses}
        getOptionLabel={(option) => option.NAME}
        onChange={onTagsChange}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Select Courses"
            placeholder="Courses"
            InputProps={{
                ...params.InputProps,
                type: 'search',
              }}
          />
          
        )}
      />
    </div>
  );
}