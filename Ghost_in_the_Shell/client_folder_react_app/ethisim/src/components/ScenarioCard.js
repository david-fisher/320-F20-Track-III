import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { Typography, Grid, Card, CardContent, Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import ShareIcon from '@material-ui/icons/Share';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import AssessmentIcon from '@material-ui/icons/Assessment';
import PropTypes from 'prop-types';

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
    id: PropTypes.number.isRequired,
    scenarioName: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    scenarioData: PropTypes.any.isRequired,
};

export default function ScenarioCard(props) {
    const classes = useStyles();
    ScenarioCard.propTypes = props.data;
    const data = ScenarioCard.propTypes;

    return (
        <Grid key={data.id} item xs>
            <Card>
                <CardContent className={classes.scenarioContainer}>
                    <Typography variant="h6" display="block" noWrap>
                        {data.scenarioName}
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        color="textSecondary"
                        display="block"
                        noWrap
                    >
                        {data.className}
                    </Typography>
                </CardContent>
                <Grid className={classes.buttonContainer} container>
                    <Grid className={classes.button} item xs={6}>
                        <Button
                            component={Link}
                            to={{
                                pathname: '/editor/' + data.id,
                                scenarioData: data,
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
                        >
                            <ShareIcon />
                            <Typography variant="subtitle1" noWrap>
                Share
                            </Typography>
                        </Button>
                    </Grid>
                    <Grid className={classes.button} item xs={6}>
                        <Button
                            className={classes.buttonText}
                            variant="contained"
                            color="primary"
                        >
                            <DeleteForeverIcon />
                            <Typography variant="subtitle1" noWrap>
                Delete
                            </Typography>
                        </Button>
                    </Grid>
                    <Grid className={classes.button} item xs={6}>
                        <Button
                            component={Link}
                            to={{
                                pathname: '/data/' + data.id,
                                scenarioData: data,
                            }}
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
                </Grid>
            </Card>
        </Grid>
    );
}
