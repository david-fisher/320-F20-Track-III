import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { 
  Button, 
  Box,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(0.5),
    marginTop: theme.spacing(0),
    width: '100%',
    textTransform: 'unset',
  },
}));

export default function IssueEntryField(props) {
  const classes = useStyles();

  return (
    <div>
      <Box
        display="flex"
        flexDirection="row"
        p={1}
        m={1}
      >
        <Box p={1}>
          <TextField
            style={{ width: '75%' }}
            id="outlined-text"
            label="Issue"
            multiline
            rows={2}
            variant="outlined"
          />
          <TextField
            style={{ width: '25%' }}
            margin="normal"
            id="outlined-number"
            label="Score"
            rows={1}
            defaultValue="0"
            variant="filled"
          />
        </Box>
        <Box p={1}>
          <div>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
            >
              Save
            </Button>
          </div>
          <div>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={() => props.onDelete(props.entry.id)}
            >
              Delete
            </Button>
          </div>
        </Box>
      </Box>
    </div>
  );
}