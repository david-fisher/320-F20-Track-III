import React, { useState } from 'react';
import { Button, TextField, Typography, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Body from '../GeneralPageComponents/Body';
import Title from '../GeneralPageComponents/Title';
import VersionControl from '../../VersionControl';
import { mockActionHistory } from '../../../shared/mockScenarioData';
import PropTypes from 'prop-types';
import universalPost from '../../../universalHTTPRequests/post.js';
import universalDelete from '../../../universalHTTPRequests/delete.js';

Action.propTypes = {
    scenarioComponents: PropTypes.any,
    setScenarioComponents: PropTypes.any,
    page_id: PropTypes.any,
    page_type: PropTypes.any,
    page_title: PropTypes.any,
    scenario_ID: PropTypes.any,
    version_ID: PropTypes.any,
    next_page_id: PropTypes.any,
    body: PropTypes.any,
    bodies: PropTypes.any,
    xCoord: PropTypes.any,
    yCoord: PropTypes.any,
    choice1: PropTypes.any.isRequired,
    choice2: PropTypes.any.isRequired,
    r1: PropTypes.any.isRequired,
    r2: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        marginTop: theme.spacing(1),
        width: '100%',
    },
    submit: {
        marginTop: theme.spacing(2),
        backgroundColor: theme.palette.primary.main,
        color: 'white',
        textTransform: 'unset',
    },
    saveButton: {
        margin: theme.spacing(2),
        float: 'right',
        textTransform: 'unset',
    },
}));

export default function Action(props) {
    const classes = useStyles();
    const {
        scenarioComponents,
        setScenarioComponents,
        page_id,
        page_type,
        page_title,
        scenario_ID,
        next_page_id,
        body,
        choice1,
        choice2,
        xCoord,
        yCoord,
    } = props;

    const [postValues, setPostValues] = useState({
        data: null,
        loading: true,
        error: null,
    });
    // eslint-disable-next-line
    const [deleteValues, setDeleteValues] = useState({
        data: null,
        loading: true,
        error: null,
    });

    const [pageID, setPageID] = useState(page_id);
    const [title, setTitle] = useState(page_title);
    const [bodyText, setBodyText] = useState(body);
    const [option1, setOption1] = useState(choice1);
    const [option2, setOption2] = useState(choice2);
    //const [result1, setResult1] = useState(r1);
    //const [result2, setResult2] = useState(r2);

    var postReqBody = {
        PAGE: pageID,
        PAGE_TYPE: page_type,
        PAGE_TITLE: title,
        PAGE_BODY: bodyText,
        SCENARIO: scenario_ID,
        NEXT_PAGE: next_page_id,
        CHOICES: [
            { CHOICE: option1, RESULT_PAGE: null },
            { CHOICE: option2, RESULT_PAGE: null },
        ],
        X_COORDINATE: xCoord,
        Y_COORDINATE: yCoord,
    };

    function handlePost(setPostValues, postReqBody, s_id, first_time) {
        const endpoint = '/page?scenario_id=' + s_id;
        console.log('pageID is: ');
        console.log(pageID);
        function onSuccess(resp) {
            const deleteEndPoint = '/page?page_id=' + pageID;
            universalDelete(setDeleteValues, deleteEndPoint, null, null, {
                PAGE: pageID,
            });
            setPageID(resp.PAGE);
            postReqBody.PAGE = pageID;
            let newScenarioComponents = [...scenarioComponents];
            newScenarioComponents.find((x) => x.title === title).id = pageID;
            setScenarioComponents(newScenarioComponents);
        }
        function onSuccess2(resp) {
            setPageID(resp.PAGE);
            postReqBody.PAGE = pageID;
            let newScenarioComponents = [...scenarioComponents];
            newScenarioComponents.find((x) => x.title === title).id = pageID;
            setScenarioComponents(newScenarioComponents);
        }
        function onFailure() {
            console.log('Post failed');
        }
        if (first_time) {
            universalPost(
                setPostValues,
                endpoint,
                onFailure,
                onSuccess2,
                postReqBody
            );
        } else {
            universalPost(
                setPostValues,
                endpoint,
                onFailure,
                onSuccess,
                postReqBody
            );
        }
    }

    const onChangeOption1 = (event) => {
        setOption1(event.target.value);
    };

    const onChangeOption2 = (event) => {
        setOption2(event.target.value);
    };

    // eslint-disable-next-line
    const onChangeBody = (event) => {
        setBodyText(event.target.value);
        postReqBody.PAGE_BODY = bodyText;
    };

    const savePage = () => {
        handlePost(setPostValues, postReqBody, scenario_ID, false);
        console.log(postValues);
    };

    return (
        <Container component="main">
            <Typography align="center" variant="h2">
                Action Component
            </Typography>
            <VersionControl
                history={mockActionHistory.history}
                type={mockActionHistory.type}
                setTitle={setTitle}
                setBody={setBodyText}
                setOption1={setOption1}
                setOption2={setOption2}
            />
            <Title title={title} setTitle={setTitle} />
            <Body body={bodyText} setBody={setBodyText} />
            <div className={classes.container}>
                <form className={classes.form}>
                    <Typography align="center" variant="h6">
                        Option 1
                    </Typography>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="option 1"
                        label="Input Option 1 Text"
                        name="option 1"
                        value={option1}
                        onChange={onChangeOption1}
                    />
                    <Typography align="center" variant="h6">
                        Option 2
                    </Typography>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="option 2"
                        label="Input Option 2 Text"
                        name="option 2"
                        value={option2}
                        onChange={onChangeOption2}
                    />
                    <Button
                        className={classes.saveButton}
                        variant="contained"
                        color="primary"
                        onClick={savePage}
                    >
                        Save
                    </Button>
                </form>
            </div>
        </Container>
    );
}
