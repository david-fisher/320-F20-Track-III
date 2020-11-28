import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Author from './Author';
import {
    Button,
    TextField,
    Typography,
    Container,
    Divider,
} from '@material-ui/core';
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
    bannerContainer: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    errorContainer: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    container: {
        padding: theme.spacing(1),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconError: {
        paddingRight: theme.spacing(2),
        fontSize: '75px',
    },
    iconRefreshLarge: {
        fontSize: '75px',
    },
    iconRefreshSmall: {
        fontSize: '30px',
    },
}));

export default function Logistics() {
    //Need scenario id
    const endpointGetLogistics = '/logistics?scenario_id=';
    const endpointGetCourses = '/api/courses/';
    const endPointPut = '/logistics';

    const classes = useStyles();
    //temporary until backend implements id's
    const [fetchCourseResponse, setFetchCourseResponse] = useState({
        data: null,
        loading: false,
        error: null,
    });

    //TODO temporary ID
    // eslint-disable-next-line
    const [id, setId] = useState(2);

    //Authors mock implementation
    const [authors, setAuthors] = useState([]);

    //Set fake ID for list item
    let initialAuthorsWithID = authors.map(function (author) {
        return {
            author: author,
            id: Math.floor(Math.random() * 10000),
        };
    });

    const [authorsWithID, setAuthorsWithID] = useState(initialAuthorsWithID);

    let resetAuthorsWithID = (authorsWithID) => {
        let initialAuthorsWithID = authors.map(function (author) {
            return {
                author: author,
                id: Math.floor(Math.random() * 10000),
            };
        });
        setAuthorsWithID(initialAuthorsWithID);
    };

    useEffect(resetAuthorsWithID, [authors]);

    const removeAuthor = (authorID) => {
        const leftAuthors = authorsWithID.filter(
            (author) => author.id !== authorID
        );
        setAuthorsWithID(leftAuthors);
    };

    const addAuthor = (e) => {
        let newAuthors = authorsWithID.map((data) => data.author);
        newAuthors = [...newAuthors, ''];
        setAuthors(newAuthors);
        const newAuthorsWithID = [
            ...authorsWithID,
            {
                id: Math.floor(Math.random() * 10000),
                author: '',
            },
        ];
        setAuthorsWithID(newAuthorsWithID);
    };

    const [shouldFetch, setShouldFetch] = useState(0);
    const [shouldRender, setShouldRender] = useState(false);
    const [fetchLogisticsResponse, setFetchLogisticsResponse] = useState({
        data: null,
        loading: false,
        error: null,
    });
    const [menuCourseItems, setMenuCourseItems] = useState(null);
    const [responseSave, setResponseSave] = useState({
        data: null,
        loading: false,
        error: null,
    });
    const [successBannerMessage, setSuccessBannerMessage] = useState('');
    const [successBannerFade, setSuccessBannerFade] = useState(false);
    const [errorBannerMessage, setErrorBannerMessage] = useState('');
    const [errorBannerFade, setErrorBannerFade] = useState(false);
    const [errorName, setErrorName] = useState(false);
    const [errorCourses, setErrorCourses] = useState(false);

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

        console.log(NewScenario.COURSES);

        for (let i = 0; i < response.length; i++) {
            for (let j = 0; j < NewScenario.COURSES.length; j++) {
                if (response[i].NAME === NewScenario.COURSES[j].NAME) {
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
        }

        function onFailure() {
            console.log('Failed Get Logistics Request');
        }
        get(
            setFetchLogisticsResponse,
            endpointGetLogistics + id,
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

    const handleSave = () => {
        function onSuccessLogistic(response) {
            console.log('Success Put');
            setSuccessBannerMessage('Successfully Saved!');
            setSuccessBannerFade(true);
            setShouldFetch(shouldFetch + 1);
        }

        function onFailureLogistic() {
            console.log('Failed Put Logistics Request');
            setErrorBannerMessage('Failed to save! Please try again.');
            setErrorBannerFade(true);
        }

        let validInput = true;

        if (!NewScenario.NAME || !NewScenario.NAME.trim()) {
            setErrorName(true);
            validInput = false;
        } else {
            setErrorName(false);
        }

        if (NewScenario.COURSES.length === 0) {
            setErrorCourses(true);
            validInput = false;
        } else {
            setErrorCourses(false);
        }

        if (validInput) {
            setFetchCourseResponse({
                data: null,
                loading: true,
                error: null,
            });
            put(
                setResponseSave,
                endPointPut,
                onFailureLogistic,
                onSuccessLogistic,
                NewScenario
            );
        }
    };

    const handleOnChange = (event) => {
        console.log('changed name');
        NewScenario.NAME = event.target.value;
        setEdit(NewScenario);
    };

    const updateSelectedClasses = (selectedClasses) => {
        //set new scenario courses to selected classes
        let sel = [];
        selectedClasses.map((element) => sel.push({ COURSE: element.COURSE }));
        NewScenario.COURSES = sel;
        setEdit(NewScenario);
    };

    if (fetchLogisticsResponse.error) {
        return (
            <div className={classes.errorContainer}>
                <ErrorBanner
                    fade={errorBannerFade}
                    errorMessage={errorBannerMessage}
                />
                <div className={classes.container}>
                    <ErrorIcon className={classes.iconError} />
                    <Typography align="center" variant="h3">
                        Error in fetching scenario logistics.
                    </Typography>
                </div>
                <div className={classes.container}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={getData}
                    >
                        <RefreshIcon className={classes.iconRefreshLarge} />
                    </Button>
                </div>
            </div>
        );
    }

    if (fetchCourseResponse.error) {
        return (
            <div className={classes.errorContainer}>
                <ErrorBanner
                    fade={errorBannerFade}
                    errorMessage={errorBannerMessage}
                />
                <div className={classes.container}>
                    <ErrorIcon className={classes.iconError} />
                    <Typography align="center" variant="h3">
                        Error in fetching scenario courses.
                    </Typography>
                </div>
                <div className={classes.container}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={getData}
                    >
                        <RefreshIcon className={classes.iconRefreshLarge} />
                    </Button>
                </div>
            </div>
        );
    }

    //Loading for both GET requests
    if (
        fetchLogisticsResponse.loading ||
        fetchCourseResponse.loading ||
        responseSave.loading
    ) {
        return <LoadingSpinner />;
    }

    return (
        <div>
            <div className={classes.bannerContainer}>
                <SuccessBanner
                    fade={successBannerFade}
                    successMessage={successBannerMessage}
                />
                <ErrorBanner
                    fade={errorBannerFade}
                    errorMessage={errorBannerMessage}
                />
            </div>
            <Container component="main">
                <Typography align="center" variant="h2">
                    Logistics
                </Typography>
                <form
                    className={classes.textfields}
                    noValidate
                    autoComplete="off"
                >
                    Simulation Title
                    {errorName ? (
                        <TextField
                            error
                            helperText="Scenario name must be filled in"
                            id="Scenario Title"
                            defaultValue={NewScenario.NAME}
                            label=""
                            onChange={handleOnChange}
                        />
                    ) : (
                        <TextField
                            id="Scenario Title"
                            defaultValue={NewScenario.NAME}
                            label=""
                            onChange={handleOnChange}
                        />
                    )}
                    Courses
                    {shouldRender ? (
                        <Tags
                            courses={menuCourseItems}
                            current={NewScenario.COURSES}
                            update={updateSelectedClasses}
                        />
                    ) : null}
                    {errorCourses ? (
                        <Typography
                            style={{ marginLeft: 15 }}
                            variant="caption"
                            display="block"
                            color="error"
                        >
                            At least one course must be selected
                        </Typography>
                    ) : null}
                    <Divider style={{ margin: '20px 0' }} />
                    Authors
                </form>

                {authorsWithID.map((data) => (
                    <Author
                        key={data.id}
                        id={data.id}
                        removeAuthor={removeAuthor}
                        author={data.author}
                        listOfAuthors={authorsWithID}
                        setListOfAuthors={setAuthorsWithID}
                    />
                ))}
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
                            Save Scenario Info
                        </Button>
                    </form>
                </div>
            </Container>
        </div>
    );
}
