import React, { useState, useEffect } from 'react';
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
import SuccessBanner from '../../Banners/SuccessBanner';
import ErrorBanner from '../../Banners/ErrorBanner';

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
        version_ID,
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
    const [questions, setQuestions] = useState(reflection_questions);
    const [questionsForReqBody, setQuestionsForReqBody] = useState(
        questions.map(function (a) {
            return { REFLECTION_QUESTION: a.REFLECTION_QUESTION };
        })
    );

    //console.log(questionsList);
    /*useEffect(() => {
        for (var i = 0; i < questions.length; i++) {
            setQuestionsForReqBody(
              questionsForReqBody.concat({ REFLECTION_QUESTION: questions[i].REFLECTION_QUESTION })
            );
        }
    }, []);*/

    const [errorTitle, setErrorTitle] = useState(false);
    const [errorTitleText, setErrorTitleText] = useState(false);
    const [errorBody, setErrorBody] = useState(false);
    const [errorQuestions, setErrorQuestions] = useState(false);
    let postReqBody = {
        PAGE: pageID,
        PAGE_TYPE: page_type,
        PAGE_TITLE: title,
        PAGE_BODY: bodyText,
        SCENARIO: scenario_ID,
        VERSION: version_ID,
        NEXT_PAGE: next_page_id,
        REFLECTION_QUESTIONS: questionsForReqBody,
        X_COORDINATE: xCoord,
        Y_COORDINATE: yCoord,
    };

    function handlePost(setPostValues, postReqBody, s_id, first_time) {
        const endpoint = '/page?page_id=' + pageID;

        function onSuccess(resp) {
            const deleteEndPoint = '/page?page_id=' + pageID;
            postReqBody.PAGE = resp.data.PAGE;
            let newScenarioComponents = [...scenarioComponents];
            let component = newScenarioComponents.find((x) => x.id === pageID);
            component.id = resp.data.PAGE;
            component.title = title;

            setPageID(resp.data.PAGE);
            setScenarioComponents(newScenarioComponents);
            setSuccessBannerFade(true);
            setSuccessBannerMessage('Successfully saved page!');
            universalDelete(setDeleteValues, deleteEndPoint, null, null, {
                PAGE: pageID,
            });
        }

        function onFailure() {
            console.log('Post failed');
            setErrorBannerFade(true);
            setErrorBannerMessage('Failed to save page! Please try again.');
        }

        let validInput = true;

        if (!title || !title.trim()) {
            setErrorTitle(true);
            setErrorTitleText('Page title cannot be empty');
            validInput = false;
        } else if (title.length >= 1000) {
            setErrorTitle(true);
            setErrorTitleText('Page title must have less than 1000 characters');
            validInput = false;
        } else {
            setErrorTitle(false);
        }

        if (!bodyText || !bodyText.trim()) {
            setErrorBody(true);
            validInput = false;
        } else {
            setErrorBody(false);
        }
        let one_question_checker = false;
        for (let i = 0; i < questions.length; i++) {
            if (
                !questions[i].REFLECTION_QUESTION ||
                !questions[i].REFLECTION_QUESTION.trim()
            ) {
                setErrorQuestions(true);
                validInput = false;
                one_question_checker = true;
            }
        }

        if (one_question_checker === false) {
            setErrorQuestions(false);
        }

        /*
        console.log("this isthe post req bdy")
        console.log(postReqBody);*/
        universalPost(
            setPostValues,
            endpoint,
            onFailure,
            onSuccess,
            postReqBody
        );
    }

    const setReqBodyNew = (qs) =>{
      let qsrb = []
      for(let i = 0; i < qs.length; i++){
        qsrb.push(qs[i].question)
      }

      setQuestionsForReqBody(qsrb);
      postReqBody.REFLECTION_QUESTIONS = questionsForReqBody

    }
    const savePage = () => {
        handlePost(setPostValues, postReqBody, scenario_ID, false);
        console.log(postValues);
    };

    const [successBannerMessage, setSuccessBannerMessage] = useState('');
    const [successBannerFade, setSuccessBannerFade] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setSuccessBannerFade(false);
        }, 1000);

        return () => clearTimeout(timeout);
    }, [successBannerFade]);

    const [errorBannerMessage, setErrorBannerMessage] = useState('');
    const [errorBannerFade, setErrorBannerFade] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setErrorBannerFade(false);
        }, 1000);

        return () => clearTimeout(timeout);
    }, [errorBannerFade]);

    return (
        <Container component="main">
            <SuccessBanner
                successMessage={successBannerMessage}
                fade={successBannerFade}
            />
            <ErrorBanner
                errorMessage={errorBannerMessage}
                fade={errorBannerFade}
            />
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
            <Title
                title={title}
                setTitle={setTitle}
                error={errorTitle}
                errorMessage={errorTitleText}
            />
            <Body
                body={bodyText}
                setBody={setBodyText}
                error={errorBody}
                errorMessage={'Page body cannot be empty'}
            />
            <QuestionFields
                questions={questions}
                setQuestions={setQuestions}
                setReqBodyNew={setReqBodyNew}
            />
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
