import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Container, Typography } from '@material-ui/core';
import Copyright from '../components/Copyright';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    title: {
        textAlign: 'center',
    },
    copyright: {
        margin: theme.spacing(2),
    },
}));

Data.propTypes = {
    id: PropTypes.number.isRequired,
    scenarioName: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    scenarioData: PropTypes.any.isRequired,
    location: PropTypes.any.isRequired,
};

export default function Data(props) {
    const classes = useStyles();
    Data.propTypes = props.data;

    return (
        <Container component="main" maxWidth="lg">
            <Typography className={classes.title} variant="h4">
        Student Data: {props.location.scenarioData.scenarioName} |{' '}
                {props.location.scenarioData.className}
            </Typography>
            <Box className={classes.copyright}>
                <Copyright />
            </Box>
        </Container>
    );
}
