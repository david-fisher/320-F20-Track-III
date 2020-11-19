import React, { useState, useEffect } from 'react';
import Body from '../GeneralPageComponents/Body';
import Title from '../GeneralPageComponents/Title';
import VersionControl from '../../VersionControl';
import { Typography, Container, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import QuestionFields from './QuestionComponent/questions';
import { mockReflectionHistory } from '../../../shared/mockScenarioData';
import PropTypes from 'prop-types';

Reflection.propTypes = {
    postFunction: PropTypes.func.isRequired,
    page_id: PropTypes.any.isRequired,
    page_type: PropTypes.any.isRequired,
    page_title: PropTypes.any.isRequired,
    scenario_ID: PropTypes.any.isRequired,
    version_ID: PropTypes.any.isRequired,
    next_page_id: PropTypes.any.isRequired,
    body: PropTypes.any.isRequired,
    reflection_questions: PropTypes.any.isRequired,
    created: PropTypes.any.isRequired,
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
        postFunction,
        page_id,
        page_type,
        page_title,
        scenario_ID,
        version_ID,
        next_page_id,
        body,
        reflection_questions,
        created,
    } = props;

    const classes = useStyles();

    const [postValues, setPostValues] = useState({
        data: null,
        loading: true,
        error: null,
    });

    const [title, setTitle] = useState(page_title);
    const [bodyText, setBodyText] = useState(body);
    //Assuming list of questions will be in array form
    const [questions, setQuestions] = useState(reflection_questions);

    var questionsList = [];
    for (var i = 0; i < questions.length; i++) {
        questionsList.concat({ REFLECTION_QUESTION: questions[i] });
    }
    var postReqBody = {
        PAGE: page_id,
        PAGE_TYPE: page_type,
        PAGE_TITLE: title,
        PAGE_BODY: bodyText,
        SCENARIO: scenario_ID,
        VERSION: 1,
        NEXT_PAGE: next_page_id,
        BODY: bodyText,
        X_COORDINATE: 0,
        Y_COORDINATE: 0,
    };
    /*
    var postReqBody = {
        PAGE: page_id,
        PAGE_TYPE: page_type,
        PAGE_TITLE: title,
        PAGE_BODY: bodyText
        SCENARIO: scenario_ID,
        VERSION: 1,
        NEXT_PAGE: next_page_id,
        BODY: bodyText,
        REFLECTION_QUESTIONS: questionsList,
        X_COORDINATE: 0,
        Y_COORDINATE: 0,
    };*/
    useEffect(() => {
        if (created === true) {
            //created = false
            postFunction(setPostValues, postReqBody, scenario_ID);
            console.log(postValues);
        }
    }, []);
    const savePage = () => {
        postFunction(setPostValues, postReqBody, scenario_ID);
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
            <Body body={bodyText} />
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
