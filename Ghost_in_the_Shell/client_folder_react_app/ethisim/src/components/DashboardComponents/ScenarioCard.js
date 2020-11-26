import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { Typography, Grid, Card, CardContent, Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import ShareIcon from '@material-ui/icons/Share';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import AssessmentIcon from '@material-ui/icons/Assessment';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';

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

const styles = (theme) => ({
    root: {
        margin: 1,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton
                    aria-label="close"
                    className={classes.closeButton}
                    onClick={onClose}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

ScenarioCard.propTypes = {
    SCENARIO: PropTypes.number,
    VERSION: PropTypes.number,
    NAME: PropTypes.string,
    PUBLIC: PropTypes.bool,
    NUM_CONVERSATION: PropTypes.number,
    PROFESSOR: PropTypes.number,
    IS_FINISHED: PropTypes.bool,
    DATE_CREATED: PropTypes.string,
    COURSES: PropTypes.array,
};

export default function ScenarioCard(props) {
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
    ScenarioCard.propTypes = props.data;
    const data = props.data;
    const {
        SCENARIO,
        VERSION,
        NAME,
        PUBLIC,
        NUM_CONVERSATION,
        PROFESSOR,
        IS_FINISHED,
        DATE_CREATED,
        COURSES,
    } = data;

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
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
                    onClick={function () {
                        {
                            props.delete(SCENARIO, IS_FINISHED);
                        }
                    }}
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
                    <Typography
                        variant="subtitle1"
                        onClick={handleClickOpen}
                        noWrap
                    >
                        View Classes
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
                        {DATE_CREATED}
                    </Typography>
                </CardContent>
            </Card>
            <Grid className={classes.buttonContainer} container>
                {buttons}
            </Grid>
            <div>
                <Dialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                    maxWidth="false"
                >
                    <div style={{ width: 400, height: 400 }}>
                        <DialogTitle
                            id="customized-dialog-title"
                            onClose={handleClose}
                        >
                            View Classes For Simulation {NAME}
                        </DialogTitle>
                        <DialogContent>
                            {data.COURSES.map((data) => (
                                <form
                                    style={{ marginBottom: 20 }}
                                    key={data.COURSE}
                                >
                                    <Button
                                        className={classes.buttonText}
                                        variant="contained"
                                        color="seccondary"
                                    >
                                        <Typography variant="subtitle1" noWrap>
                                            {data.NAME}
                                        </Typography>
                                    </Button>
                                </form>
                            ))}
                        </DialogContent>
                    </div>
                </Dialog>
            </div>
        </Grid>
    );
}
