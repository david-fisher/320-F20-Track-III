import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core/';
import { Link } from 'react-router-dom';
import WhiteLogo from '../shared/WhiteLogo.png';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        margin: theme.spacing(0),
        padding: theme.spacing(0),
    },
    logo: {
        height: '60px',
        margin: theme.spacing(1),
        marginRight: '15px',
    },
    title: {
        flexGrow: 1,
    },
    signupButton: {
        backgroundColor: 'white',
        marginRight: theme.spacing(3),
        padding: theme.spacing(1.5),
        paddingBottom: 0,
        paddingTop: 0,
        textTransform: 'unset',
        borderStyle: 'solid',
        borderColor: 'white',
        border: 2,
    },
    loginButton: {
        backgroundColor: theme.palette.primary.main,
        marginRight: theme.spacing(3),
        padding: theme.spacing(1.5),
        paddingBottom: 0,
        paddingTop: 0,
        textTransform: 'unset',
        borderStyle: 'solid',
        borderColor: 'white',
        border: 2,
    },
    signupButtonText: {
        color: theme.palette.primary.main,
    },
    login: {
        color: 'white',
    },
}));

export default function HomepageNavBar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <img src={WhiteLogo} alt="EthismLogo" className={classes.logo} />
                    <Typography className={classes.title} variant="h5">
            Ethisim
                    </Typography>

                    <Button
                        component={Link}
                        to={'/signup'}
                        className={classes.signupButton}
                        variant="contained"
                    >
                        <Typography variant="h6" className={classes.signupButtonText}>
              Sign Up
                        </Typography>
                    </Button>

                    <Button
                        component={Link}
                        to={'/login'}
                        className={classes.loginButton}
                        variant="contained"
                        color="primary"
                        m={-2}
                    >
                        <Typography className={classes.login} variant="h6">
              Log In
                        </Typography>
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}
