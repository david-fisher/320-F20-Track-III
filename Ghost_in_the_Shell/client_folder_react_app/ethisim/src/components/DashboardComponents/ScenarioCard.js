import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { Typography, Grid, Card, CardContent, Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import ShareIcon from '@material-ui/icons/Share';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import AssessmentIcon from '@material-ui/icons/Assessment';
import PropTypes from 'prop-types';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    scenarioContainer: {
        minHeight: '100px',
        minWidth: '200px',
        backgroundColor: theme.palette.primary.light,
        borderStyle: 'solid',
        borderColor: theme.palette.primary.light,
        border: 2,
    },
    buttonContainer: {
        borderStyle: 'solid',
        borderColor: theme.palette.primary.light,
        border: 3,
    },
    button: {
        borderStyle: 'solid',
        borderColor: theme.palette.primary.light,
        border: 3,
    },
    buttonText: {
        width: '100%',
        textTransform: 'unset',
    },
}));

ScenarioCard.propTypes = {
    SCENARIO: PropTypes.number,
    VERSION: PropTypes.number,
    NAME: PropTypes.string,
    PUBLIC: PropTypes.bool,
    NUM_CONVERSATION: PropTypes.number,
    PROFESSOR: PropTypes.number,
    IS_FINISHED: PropTypes.bool,
    DATE_CREATED: PropTypes.string,
    COURSES : PropTypes.array,
};

export default function ScenarioCard(props) {
    const classes = useStyles();
    ScenarioCard.propTypes = props.data;
    const data = props.data;
    const { SCENARIO,
            VERSION,
            NAME, 
            PUBLIC,
            NUM_CONVERSATION,
            PROFESSOR,
            IS_FINISHED, 
            DATE_CREATED,
            COURSES } = data;
        
    //If scenario is unfinished, we show the buttons "Edit," "Delete," "Share"
    //If scenario is finished, we show the button "Edit," "Delete," "Share," "View Student Data"
    const sizeOfShareButton = IS_FINISHED ? 6 : 12;
    const dataButton = IS_FINISHED ? (
        <Grid
            component={Link}
            to={{
                pathname: '/data/' + data.id,
                data: data,
            }}
            className={classes.button}
            item
            xs={6}
        >
            <Button
                className={classes.buttonText}
                variant="contained"
                color="primary"
            >
                <AssessmentIcon />
                <Typography variant="subtitle1" noWrap>
                    Data
                </Typography>
            </Button>
        </Grid>
    ) : null;
         
    const buttons = (
        <Grid className={classes.buttonContainer} container>
            <Grid className={classes.button} item xs={6}>
                <Button
                    component={Link}
                    to={{
                        pathname: '/editor/' + SCENARIO,
                        data: data,
                    }}
                    className={classes.buttonText}
                    variant="contained"
                    color="primary"
                >
                    
                    <EditIcon />
                    <Typography variant="subtitle1">Edit</Typography>
                </Button>
            </Grid>
            <Grid className={classes.button} item xs={6}>
                <Button
                    className={classes.buttonText}
                    variant="contained"
                    color="primary"
                    onClick = {function(){ {props.delete(SCENARIO,IS_FINISHED)} }}
                >
                    <DeleteForeverIcon />
                    <Typography variant="subtitle1" noWrap>
                        Delete 
                    </Typography>
                </Button>
            </Grid>
            <Grid className={classes.button} item xs={sizeOfShareButton}>
                <Button
                    className={classes.buttonText}
                    variant="contained"
                    color="primary"
                >
                    <ShareIcon />
                    <Typography variant="subtitle1" noWrap>
                        Share
                    </Typography>
                </Button>
            </Grid>
            {dataButton}
        </Grid>
    );

    return (
        <Grid key={SCENARIO} item xs>
            <Card>
                <CardContent className={classes.scenarioContainer}>
                    <Typography variant="h6" display="block" noWrap>
                        {NAME}
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        color="textSecondary"
                        display="block"
                        noWrap
                    >
                        {SCENARIO}
                    </Typography>
                </CardContent>
            </Card>
            <Grid className={classes.buttonContainer} container>
                {buttons}
            </Grid>
        </Grid>
    );
}
