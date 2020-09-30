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
  Link,
  Grid,
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import Copyright from '../components/copyright';

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
    backgroundColor:  theme.palette.primary.main,
    color: "white"
  },
  copyright: {
    marginTop: theme.spacing(2),
  }
}));

export default function Login() {
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
          <Grid container direction="column">
            <Grid item>
              <Link component={RouterLink} to={"/signup"}>
                Need to create an account?
              </Link>
            </Grid>
            <Grid item>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary"/>}
                label="Remember me"
              />
            </Grid>
          </Grid>
          <Button
            className={classes.submit}
            component={RouterLink} to={"/dashboard"}
            type="submit"
            fullWidth
            variant="contained"
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