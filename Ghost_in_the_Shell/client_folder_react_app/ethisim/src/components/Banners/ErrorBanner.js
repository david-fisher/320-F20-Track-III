import React from 'react';
import { Typography, Fade } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import ErrorIcon from '@material-ui/icons/Error';

const useStyles = makeStyles((theme) => ({
    container: {
        position: 'fixed',
        padding: theme.spacing(1),
        bottom: '0px',
        width: '100vh',
        border: '5px solid',
        zIndex: '5',
        borderColor: theme.palette.error.dark,
        backgroundColor: theme.palette.error.main,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
    },
    icon: {
        paddingRight: theme.spacing(2),
        fontSize: '40px',
        color: 'white',
    },
}));

ErrorBanner.propTypes = {
    fade: PropTypes.any,
    errorMessage: PropTypes.string,
};

export default function ErrorBanner({ errorMessage, fade }) {
    const classes = useStyles();
    return (
        <Fade timeout={{ appear: 0, exit: 3000 }} in={fade}>
            <div className={classes.container}>
                <ErrorIcon className={classes.icon} />
                <Typography align="center" variant="h6">
                    {errorMessage}
                </Typography>
            </div>
        </Fade>
    );
}
