import React from 'react';
import { Typography, Fade } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

const useStyles = makeStyles((theme) => ({
    container: {
        position: 'fixed',
        padding: theme.spacing(1),
        bottom: '0px',
        width: '100vh',
        border: '5px solid',
        zIndex: '5',
        borderColor: theme.palette.success.dark,
        backgroundColor: theme.palette.success.main,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
    },
    icon: {
        paddingRight: theme.spacing(1),
        fontSize: '40px',
        color: 'white',
    },
}));

SuccessBanner.propTypes = {
    fade: PropTypes.any,
    successMessage: PropTypes.string,
};

export default function SuccessBanner({ successMessage, fade }) {
    const classes = useStyles();
    return (
        <Fade timeout={{ appear: 0, exit: 3000 }} in={fade}>
            <div className={classes.container}>
                <ThumbUpIcon className={classes.icon} />
                <Typography align="center" variant="h6">
                    {successMessage}
                </Typography>
            </div>
        </Fade>
    );
}
