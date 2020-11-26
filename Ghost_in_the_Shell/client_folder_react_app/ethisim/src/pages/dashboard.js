import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Box, Typography, Grid } from '@material-ui/core';
import ScenarioCard from '../components/DashboardComponents/ScenarioCard';
import AddNewScenarioCard from '../components/DashboardComponents/AddNewScenarioCard';
import Copyright from '../components/Copyright';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import deleteReq from '../universalHTTPRequests/delete';
import post from '../universalHTTPRequests/post';
import get from '../universalHTTPRequests/get';
import LoadingSpinner from '../components/LoadingSpinner';
import RefreshIcon from '@material-ui/icons/Refresh';
import ErrorIcon from '@material-ui/icons/Error';
import SuccessBanner from '../components/Banners/SuccessBanner';
import ErrorBanner from '../components/Banners/ErrorBanner';
import Tags from '../components/DashboardComponents/DropDown';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DashboardNavBar from '../components/DashboardComponents/DashboardNavbar';

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(15),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    copyright: {
        margin: theme.spacing(2),
    },
}));

const endpointGet = '/dashboard?professor_id=12345678';
const endpointGetCourses = '/api/courses/';
const endpointPost = '/dashboard';
const endpointDelete = '/api/scenarios/';

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

//Passing props with React Router in Material UI: https://stackoverflow.com/questions/30115324/pass-props-in-link-react-router
export default function Dashboard() {
    // post on success, concatenating a scenario card to array
    //delete on success, concatenating a scenario card to array

    //when posting a new scenario setting fake id, now deleting that scenario, have to replace id with id in database

    //post returns new id of scenario, when you concatenating to array set the id to that

    const [scenarios, setScenarios] = useState(null);
    const [finishedScenarios, setFinishedScenarios] = useState(null);
    const [unfinishedScenarios, setUnfinishedScenarios] = useState(null);
    const [menuCourseItems, setMenuCourseItems] = useState([
        {
            COURSE: 0,
            NAME: ' ',
        },
    ]);
    const [open, setOpen] = React.useState(false);
    const [fetchScenariosResponse, setFetchScenariosResponse] = useState({
        data: null,
        loading: false,
        error: null,
    });
    const [fetchCourseResponse, setFetchCourseResponse] = useState({
        data: null,
        loading: false,
        error: null,
    });
    const [deleteReqValue, setDeleteReq] = useState({
        data: null,
        loading: false,
        error: null,
    });
    const [successBannerMessage, setSuccessBannerMessage] = useState('');
    const [successBannerFade, setSuccessBannerFade] = useState(false);
    const [errorBannerMessage, setErrorBannerMessage] = useState('');
    const [errorBannerFade, setErrorBannerFade] = useState(false);
    const [shouldFetch, setShouldFetch] = useState(0);
    const [postValue, setPost] = useState({
        data: null,
        loading: true,
        error: null,
    });
    const [NewScenerio, setEdit] = useState({
        NAME: ' ',
        IS_FINISHED: false,
        PUBLIC: false,
        NUM_CONVERSATIONS: 0,
        PROFESSOR: 12345678,
        COURSES: [],
    });

    //For Banners
    useEffect(() => {
        const timeout = setTimeout(() => {
            setSuccessBannerFade(false);
        }, 1000);

        return () => clearTimeout(timeout);
    }, [successBannerFade]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setErrorBannerFade(false);
        }, 1000);

        return () => clearTimeout(timeout);
    }, [errorBannerFade]);

    //For Dialogue Box
    const handleClickOpen = () => {
        setOpen(true);
        NewScenerio.PUBLIC = false;
        setEdit(NewScenerio);
        getCourses();
    };

    const handleCloseSave = () => {
        function onSuccessPost(resp) {
            console.log('Success Scenario Post');
            setShouldFetch(shouldFetch + 1);
            setSuccessBannerMessage('Successfully created Scenario!');
            setSuccessBannerFade(true);
        }
        function onFailurePost() {
            console.log('Fail Scenario Post');

            setErrorBannerMessage(
                'Failed to Create Scenario! Please try again.'
            );
            setErrorBannerFade(true);
        }
        console.log('POST INFO');
        console.log(NewScenerio);

        post(setPost, endpointPost, onFailurePost, onSuccessPost, NewScenerio);
        setOpen(false);
    };

    const handleClose = () => {
        setOpen(false);
    };
    //For new Scenario Post
    const handleOnChangeName = (event) => {
        NewScenerio.NAME = event.target.value;
        setEdit(NewScenerio);
    };

    const handleOnChangePublic = (info) => {
        NewScenerio.PUBLIC = !NewScenerio.PUBLIC;
        setEdit(NewScenerio);
    };

    //Update Classes
    const updateSelectedClasses = (selectedClasses) => {
        //set new scenario courses to selected classes
        let sel = [];
        let temp = [];
        temp = selectedClasses.map((element) =>
            sel.push({ COURSE: element.COURSE })
        );
        NewScenerio.COURSES = sel;
        setEdit(NewScenerio);
    };
    //Delete Scenario
    const deleteScenario = (scenarioID, isFinished) => {
        function successfullyDeleted(resp) {
            if (isFinished) {
                setSuccessBannerFade(true);
                setSuccessBannerMessage('Successfully Deleted Scenario!');

                let newData = [];
                finishedScenarios &&
                    finishedScenarios.filter(
                        (entry) => entry.SCENARIO !== scenarioID
                    );
                setFinishedScenarios(newData);
                setShouldFetch(shouldFetch + 1);
            } else {
                setSuccessBannerFade(true);
                setSuccessBannerMessage('Successfully Deleted Scenario!');

                let newData = [];
                unfinishedScenarios &&
                    unfinishedScenarios.filter(
                        (entry) => entry.SCENARIO !== scenarioID
                    );
                setUnfinishedScenarios(newData);
                setShouldFetch(shouldFetch + 1);
            }
        }
        function onFailure() {
            console.log('Fail To Delete Scenario');
            setErrorBannerMessage('Failed to Delete! Please try again.');
            setErrorBannerFade(true);
        }

        deleteReq(
            setDeleteReq,
            endpointDelete + scenarioID + '/',
            onFailure,
            successfullyDeleted,
            null
        );
    };
    //Get Scenario
    let getData = () => {
        function onSuccess(response) {
            setScenarios(response.data);
            let finishedScenarios = response.data.filter(
                (data) => data.IS_FINISHED
            );
            let unfinishedScenarios = response.data.filter(
                (data) => !data.IS_FINISHED
            );
            finishedScenarios = finishedScenarios.map((data) => (
                <ScenarioCard
                    data={data}
                    key={data.SCENARIO}
                    finished={data.IS_FINISHED}
                    delete={deleteScenario}
                />
            ));
            unfinishedScenarios = unfinishedScenarios.map((data) => (
                <ScenarioCard
                    data={data}
                    key={data.SCENARIO}
                    finished={data.IS_FINISHED}
                    delete={deleteScenario}
                />
            ));
            setFinishedScenarios(finishedScenarios);
            setUnfinishedScenarios(unfinishedScenarios);
        }

        function onFailure() {
            console.log('Failed Get Scenarios Request');
            setErrorBannerMessage('Failed to Get! Please try again.');
            setErrorBannerFade(true);
        }
        get(setFetchScenariosResponse, endpointGet, onFailure, onSuccess);
    };
    //Get Courses
    let getCourses = () => {
        function onSuccessCourse(response) {
            setMenuCourseItems(response.data);
        }

        function onFailureCourse() {
            console.log('Failed Get Courses Request');
            setErrorBannerMessage('Failed to get Courses! Please try again.');
            setErrorBannerFade(true);
        }
        get(
            setFetchCourseResponse,
            endpointGetCourses,
            onFailureCourse,
            onSuccessCourse
        );
    };

    //Reload Page
    useEffect(getData, [shouldFetch]);
    const classes = useStyles();

    if (fetchScenariosResponse.loading) {
        return <LoadingSpinner />;
    }

    if (fetchScenariosResponse.error) {
        return (
            <div className={classes.issue}>
                <div className={classes.container}>
                    <ErrorBanner
                        fade={errorBannerFade}
                        errorMessage={errorBannerMessage}
                    />
                    <ErrorIcon className={classes.iconError} />
                    <Typography align="center" variant="h3">
                        Error in fetching Scenarios.
                    </Typography>
                </div>
                <div className={classes.container}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={getData}
                    >
                        <RefreshIcon className={classes.iconRefresh} />
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div>
            <DashboardNavBar />
            <Container
                className={classes.container}
                component="main"
                maxWidth="lg"
            >
                <Typography variant="h4">Unfinished Scenarios</Typography>
                <SuccessBanner
                    fade={successBannerFade}
                    successMessage={successBannerMessage}
                />
                <ErrorBanner
                    fade={errorBannerFade}
                    errorMessage={errorBannerMessage}
                />
                <Grid
                    container
                    spacing={2}
                    direction="row"
                    justify="flex-start"
                    alignItems="stretch"
                >
                    {unfinishedScenarios}
                    <AddNewScenarioCard onClick={handleClickOpen} />
                </Grid>
                <Typography variant="h4">Finished Scenarios</Typography>
                <Grid
                    container
                    spacing={2}
                    direction="row"
                    justify="flex-start"
                    alignItems="stretch"
                >
                    {finishedScenarios}
                </Grid>
                <Box className={classes.copyright}>
                    <Copyright />
                </Box>
            </Container>

            <Dialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                maxWidth="false"
            >
                <div style={{ width: 600 }}>
                    <DialogTitle
                        id="customized-dialog-title"
                        onClose={handleClose}
                    >
                        Create New Scenario
                    </DialogTitle>
                    <DialogContent>
                        <form style={{ marginBottom: 20 }}>
                            <TextField
                                label="Name"
                                style={{ width: 500 }}
                                multiline
                                rows={1}
                                variant="outlined"
                                onChange={handleOnChangeName}
                            />
                        </form>

                        <form style={{ marginBottom: 10 }}>
                            <Tags
                                courses={menuCourseItems}
                                update={updateSelectedClasses}
                            />
                        </form>

                        <form style={{ marginLeft: -15 }}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        onChange={handleOnChangePublic}
                                        color="primary"
                                    />
                                }
                                label="Public"
                                labelPlacement="start"
                            />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            autoFocus
                            onClick={handleCloseSave}
                            color="primary"
                        >
                            Save changes
                        </Button>
                    </DialogActions>
                </div>
            </Dialog>
        </div>
    );
}
