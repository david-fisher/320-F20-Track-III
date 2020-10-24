import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

Title.propTypes = {
    title: PropTypes.string.isRequired,
};

export default function Title(props) {
    const classes = useStyles();
    Title.propTypes = props.data;
    const title = props;

    let handleChange = (content) => {
        //TODO Implement
    };

    return (
        <div className={classes.root}>
            <Typography variant="h4">Scenario Page Name</Typography>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="title"
                label="Title of component"
                value={title}
                onChange={handleChange}
                name="title"
            />
        </div>
    );
}
