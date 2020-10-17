import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  box: {
    margin: theme.spacing(0.5),
    marginTop: theme.spacing(0),
    width: 50,
  },
}));

export default function EntryField(props) {
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
          <form noValidate autoComplete="off">
            <TextField
              style={{ width: 500 }}
              id="outlined-text"
              label="Issue"
              multiline
              rows={2}
              variant="outlined"
            />
            <TextField
              style={{ width: 100 }}
              margin="normal"
              id="outlined-number"
              label="Score"
              rows={1}
              defaultValue="0"
              variant="filled"
            />
          </form>
        </Box>
        <Box p={1}>
          <div>
            <Button
              className={classes.box}
              variant="contained"
              color="primary"
            >
              Save
            </Button>
          </div>
          <div>
            <Button
              className={classes.box}
              variant="contained"
              color="secondary"
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