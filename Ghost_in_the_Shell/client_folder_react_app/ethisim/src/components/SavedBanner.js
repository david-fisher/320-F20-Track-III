import React from 'react';
import { Typography, Fade } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    container: {
        position: 'fixed',
        bottom: '0px',
        width: '100vh',
        height: '75px',
        border: '5px solid',
        zIndex: '5',
        borderColor: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.light,
    },
}));

SavedBanner.propTypes = {
    saved: PropTypes.any,
};

export default function SavedBanner({ saved }) {
    const classes = useStyles();
    return (
        <Fade timeout={{ appear: 0, exit: 2000 }} in={saved}>
            <div className={classes.container}>
                <Typography align="center" variant="h4">
                    Successfully Saved
                </Typography>
            </div>
        </Fade>
    );
}
