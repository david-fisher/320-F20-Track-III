import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Author from './Author';
import { isBrowser } from 'react-device-detect';
import { Button, TextField, Typography, Container } from '@material-ui/core';
import put from '../../../universalHTTPRequests/put';
import get from '../../../universalHTTPRequests/get';
import LoadingSpinner from '../../LoadingSpinner';
import RefreshIcon from '@material-ui/icons/Refresh';
import ErrorIcon from '@material-ui/icons/Error';
import SuccessBanner from '../../Banners/SuccessBanner';
import ErrorBanner from '../../Banners/ErrorBanner';
import Tags from './DropDown';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles((theme) => ({
    textfields: {
        '& > *': {
            margin: theme.spacing(1),
            width: '100%',
        },
    },
    buttons: {
        '& > *': {
            margin: theme.spacing(1),
            marginBottom: theme.spacing(1),
            width: '100%',
            textTransform: 'unset',
        },
    },
    authorButtons: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        textTransform: 'unset',
    },
    subdiv: {
        marginTop: theme.spacing(1),
        width: '750px',
        '@media (max-width: 1100px)': {
            width: '100%',
        },
    },
}));

export default function Logistics() {
    const endpointGetCourses = '/api/courses/';
    const endPointPut = '/logistics';

    const classes = useStyles();
    //temporary until backend implements id's
    const [fetchCourseResponse, setFetchCourseResponse] = useState({
        data: null,
        loading: false,
        error: null,
    });
    const [id, setId] = useState(23);
    const [done, setDone] = useState(false);
    const [authors, setAuthor] = useState([<Author key={id} />]);
    const [shouldFetch, setShouldFetch] = useState(0);
    const [shouldRender, setShouldRender] = useState(false);
    const [fetchLogisticsResponse, setFetchLogisticsResponse] = useState({
        data: null,
        loading: false,
        error: null,
    });
    const [menuCourseItems, setMenuCourseItems] = useState(null);
    const [responseSave, setResponseSave] = useState(null);
    const [successBannerMessage, setSuccessBannerMessage] = useState('');
    const [successBannerFade, setSuccessBannerFade] = useState(false);
    const [errorBannerMessage, setErrorBannerMessage] = useState('');
    const [errorBannerFade, setErrorBannerFade] = useState(false);

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
    ///Authors not implemented
    const addAuthor = (event) => {
        setAuthor(authors.concat(<Author key={id + 1} />));
        setId(id + 1);
        event.preventDefault();
    };

    const handleOnChangePublic = (event) => {
        setEdit({ ...NewScenario, PUBLIC: event.target.checked });
        //setEdit(NewScenario);
        console.log(NewScenario.PUBLIC);
    };

    const handleOnChangeFinish = (event) => {
        setEdit({ ...NewScenario, IS_FINISHED: event.target.checked });
        //setEdit(NewScenario);
        console.log(NewScenario.IS_FINISHED);
    };

    const makeNewCourses = (response) => {
        let sel = [];

        console.log('Orphans must die');
        console.log(NewScenario.COURSES);

        for (let i = 0; i < response.length; i++) {
            for (let j = 0; j < NewScenario.COURSES.length; j++) {
                if (response[i].NAME == NewScenario.COURSES[j].NAME) {
                    sel.push(response[i]);
                }
            }
        }

        NewScenario.COURSES = sel;
        setEdit(NewScenario);
    };

    const [NewScenario, setEdit] = useState({
        SCENARIO: 0,
        VERSION: 0,
        NAME: '',
        PUBLIC: false,
        NUM_CONVERSATION: 0,
        PROFESSOR: 0,
        IS_FINISHED: false,
        DATE_CREATED: ' ',
        COURSES: [],
    });

    let getData = () => {
        function onSuccess(response) {
            NewScenario.SCENARIO = response.data.SCENARIO;
            NewScenario.VERSION = response.data.VERSION;
            NewScenario.NAME = response.data.NAME;
            NewScenario.PUBLIC = response.data.PUBLIC;
            NewScenario.NUM_CONVERSATION = response.data.NUM_CONVERSATION;
            NewScenario.PROFESSOR = response.data.PROFESSOR;
            NewScenario.IS_FINISHED = response.data.IS_FINISHED;
            NewScenario.DATE_CREATED = response.data.DATA_CREATED;
            NewScenario.COURSES = response.data.COURSES;
            setEdit(NewScenario);
            getCourses();
            setDone(true);
        }

        function onFailure() {
            console.log('Failed Get Logistics Request');
        }
        get(
            setFetchLogisticsResponse,
            '/logistics?scenario_id=' + id,
            onFailure,
            onSuccess
        );
    };

    let getCourses = () => {
        function onSuccessCourse(response) {
            setMenuCourseItems(response.data);
            makeNewCourses(response.data);
            setShouldRender(true);
        }

        function onFailureCourse() {
            console.log('Failed Get Courses Request');
            setErrorBannerMessage('Failed to save! Please try again.');
            setErrorBannerFade(true);
        }
        get(
            setFetchCourseResponse,
            endpointGetCourses,
            onFailureCourse,
            onSuccessCourse
        );
    };

    useEffect(getData, [shouldFetch]);

    if (fetchLogisticsResponse.error || fetchCourseResponse.error) {
        return (
            <div className={classes.issue}>
                <div className={classes.container}>
                    <ErrorIcon className={classes.iconError} />
                    <Typography align="center" variant="h3">
                        Error in fetching Logistics.
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

    //staying laoding ofe
    if (fetchLogisticsResponse.loading || NewScenario.NAME == '') {
        return <LoadingSpinner />;
    }

    if (fetchCourseResponse.error) {
        return (
            <div className={classes.issue}>
                <div className={classes.container}>
                    <ErrorBanner
                        fade={errorBannerFade}
                        errorMessage={errorBannerMessage}
                    />
                    <ErrorIcon className={classes.iconError} />
                    <Typography align="center" variant="h3">
                        Error in fetching Courses.
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

    const handleSave = () => {
        function onSuccessLogistic(response) {
            console.log('Success Put');
            setSuccessBannerMessage('Successfully Saved!');
            setSuccessBannerFade(true);
        }

        function onFailureLogistic() {
            console.log('Failed Put Logistics Request');
            setErrorBannerMessage('Failed to save! Please try again.');
            setErrorBannerFade(true);
        }

        put(
            setResponseSave,
            endPointPut,
            onFailureLogistic,
            onSuccessLogistic,
            NewScenario
        );
    };

    const handleOnChange = (event) => {
        console.log('changed name');
        NewScenario.NAME = event.target.value;
        setEdit(NewScenario);
    };

    const updateSelectedClasses = (selectedClasses) => {
        //set new scenario courses to selected classes
        let sel = [];
        let temp = [];
        temp = selectedClasses.map((element) =>
            sel.push({ COURSE: element.COURSE })
        );
        NewScenario.COURSES = sel;
        setEdit(NewScenario);
    };

    return (
        <div>
            <Container component="main">
                <Typography align="center" variant="h2">
                    Logistics
                </Typography>
                <SuccessBanner
                    fade={successBannerFade}
                    successMessage={successBannerMessage}
                />
                <ErrorBanner
                    fade={errorBannerFade}
                    errorMessage={errorBannerMessage}
                />
                <form
                    className={classes.textfields}
                    noValidate
                    autoComplete="off"
                >
                    Simulation Title
                    <TextField
                        id="Simulation Title"
                        defaultValue={NewScenario.NAME}
                        label=""
                        onChange={handleOnChange}
                    />
                    Courses
                    {shouldRender ? (
                        <Tags
                            courses={menuCourseItems}
                            current={NewScenario.COURSES}
                            update={updateSelectedClasses}
                        />
                    ) : null}
                    Authors
                </form>

                {authors}
                <Button variant="contained" color="primary" onClick={addAuthor}>
                    Add Author
                </Button>
                <form style={{ marginLeft: -15, marginTop: 10 }}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={NewScenario.PUBLIC}
                                onChange={handleOnChangePublic}
                                color="primary"
                            />
                        }
                        label="Public"
                        labelPlacement="start"
                    />

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={NewScenario.IS_FINISHED}
                                onChange={handleOnChangeFinish}
                                color="primary"
                            />
                        }
                        label="Is Finished"
                        labelPlacement="start"
                    />
                </form>
                <div className={classes.subdiv}>
                    <form
                        className={classes.buttons}
                        noValidate
                        autoComplete="off"
                    ></form>
                </div>
                <Typography align="left" variant="h6">
                    Scenario ID: {NewScenario.SCENARIO}
                </Typography>

                <div className={classes.subdiv}>
                    <form
                        className={classes.buttons}
                        noValidate
                        autoComplete="off"
                    >
                        <Button variant="contained">
                            View Student Responses
                        </Button>
                        <Button variant="contained" color="primary">
                            View Version History
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSave}
                        >
                            SAVE
                        </Button>
                    </form>
                </div>
            </Container>
        </div>
    );
}
