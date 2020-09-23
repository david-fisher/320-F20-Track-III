import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import {
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Box,
  Typography,
  Container,
} from '@material-ui/core';
import Copyright from '../components/copyright'

export default function Register() {
  const useStyles = makeStyles((theme) => ({
    container: {
      marginTop: theme.spacing(6),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    logo: {
      //TODO Implement logo styling
    },
    form: {
      marginTop: theme.spacing(1),
      width: '100%',
    },
    submit: {
      marginTop: theme.spacing(2),
      backgroundColor:  '#881c1c',
      color: "white"
    },
    copyright: {
      marginTop: theme.spacing(2),
    }
  }));

  const classes = useStyles();

  //TODO add in Ethisim Logo at top of page
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.container}>

        <Typography variant="h4">
          Register
        </Typography>
        <form className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="first_name"
            label="first_name"
            name="first name"
            autoComplete="first name"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="last_name"
            label="last_name"
            name="last name"
            autoComplete="last name"
            autoFocus
          />
          <Button
          component={Link} to={"/login"}

            linkButton={true}
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
          >
            Register Account!
          </Button>
        </form>
      </div>
      <Box className={classes.copyright}>
        <Copyright />
      </Box>
    </Container>
  );
}
