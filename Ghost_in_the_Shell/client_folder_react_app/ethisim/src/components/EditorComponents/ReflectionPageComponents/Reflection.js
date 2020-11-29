import React, { useState } from 'react';
import Body from '../GeneralPageComponents/Body';
import Title from '../GeneralPageComponents/Title';
import VersionControl from '../../VersionControl';
import { Typography, Container, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import QuestionFields from './QuestionComponent/questions';
import { mockReflectionHistory } from '../../../shared/mockScenarioData';
import PropTypes from 'prop-types';
import universalPost from '../../../universalHTTPRequests/post.js';
import universalDelete from '../../../universalHTTPRequests/delete.js';

Reflection.propTypes = {
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
    reflection_questions: PropTypes.any,
};

const useStyles = makeStyles((theme) => ({
    saveButton: {
        margin: theme.spacing(2),
        float: 'right',
        textTransform: 'unset',
    },
}));

export default function Reflection(props) {
    const {
        scenarioComponents,
        setScenarioComponents,
        page_id,
        page_type,
        page_title,
        scenario_ID,
        next_page_id,
        body,
        reflection_questions,
        xCoord,
        yCoord,
    } = props;

    const classes = useStyles();

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

    //Assuming list of questions will be in array form
    const [questions, setQuestions] = useState(reflection_questions);

    var questionsList = [];
    for (var i = 0; i < questions.length; i++) {
        questionsList.concat({ REFLECTION_QUESTION: questions[i] });
    }

    var postReqBody = {
        PAGE: pageID,
        PAGE_TYPE: page_type,
        PAGE_TITLE: title,
        PAGE_BODY: bodyText,
        SCENARIO: scenario_ID,
        VERSION: 1,
        NEXT_PAGE: next_page_id,
        REFLECTION_QUESTIONS: questionsList,
        X_COORDINATE: xCoord,
        Y_COORDINATE: yCoord,
    };

    function handlePost(setPostValues, postReqBody, s_id, first_time) {
        const endpoint = '/page?scenario_id=' + s_id;
        console.log('AASSnewScenarioIS');
        console.log(scenarioComponents);
        function onSuccess(resp) {
            const deleteEndPoint = '/page?page_id=' + pageID;
            universalDelete(setDeleteValues, deleteEndPoint, null, null, {
                PAGE: pageID,
            });
            setPageID(resp.PAGE);
            postReqBody.PAGE = pageID;
            let newScenarioComponents = [...scenarioComponents];
            console.log('newScenarioIS');
            console.log(scenarioComponents);
            newScenarioComponents.find((x) => x.title === title).id = pageID;
            setScenarioComponents(newScenarioComponents);
        }
        function onSuccess2(resp) {
            setPageID(resp.PAGE);
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

    const savePage = () => {
        handlePost(setPostValues, postReqBody, scenario_ID, false);
        console.log(postValues);
    };

    return (
        <Container component="main">
            <Typography align="center" variant="h2">
                Reflection Component
            </Typography>
            <VersionControl
                history={mockReflectionHistory.history}
                type={mockReflectionHistory.type}
                setTitle={setTitle}
                setBody={setBodyText}
                setQuestions={setQuestions}
            />
            <Title title={title} setTitle={setTitle} />
            <Body body={bodyText} setBody={setBodyText} />
            <QuestionFields questions={questions} setQuestions={setQuestions} />
            <Button
                className={classes.saveButton}
                variant="contained"
                color="primary"
                onClick={savePage}
            >
                Save
            </Button>
        </Container>
    );
}
