import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button, Grid } from "@material-ui/core";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(0.5),
    marginTop: theme.spacing(0),
    textTransform: 'unset',
  },
  buttonContainer: {
    display: 'flex',
    alignItems: "center",
    justifyContent: 'center',
  }
}));

export default function Author(props) {
  const classes = useStyles();

  return (
    <div>
      <Grid
        container
      >
        <Grid 
          item 
          xs={10}
        >
          <Box p={1} >
            <form noValidate autoComplete="off">
              <TextField
                style={{ width: '100%' }}
                id="outlined-multiline-static"
                label="Author"
                multiline
              />
            </form>
          </Box>
        </Grid>
        <Grid 
          item 
          xs={2}
        >
          <Box p={1} className={classes.buttonContainer}>
              <Button
                className={classes.margin}
                variant="contained"
                color="primary"
                //onClick={() => props.onDelete(props.author.id)}
              >
                Delete
              </Button>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}