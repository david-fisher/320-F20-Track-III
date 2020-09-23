import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Button, 
  TextField, 
  FormControlLabel, 
  Checkbox, 
  Box, 
  Typography, 
  Container,
  Link
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import Copyright from '../components/copyright'

export default function Login() {
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
          Login
        </Typography>
        <form className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Link component={RouterLink} to={"/signup"}>
            Need to register an account?
          </Link>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary"/>}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
          >
            Login
          </Button>
        </form>
      </div>
      <Box className={classes.copyright}>
        <Copyright />
      </Box>
    </Container>
  );
}