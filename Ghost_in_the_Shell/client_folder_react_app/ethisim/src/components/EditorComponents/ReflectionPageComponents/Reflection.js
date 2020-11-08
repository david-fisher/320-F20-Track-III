import React, { useState } from 'react';
import Body from '../GeneralPageComponents/Body';
import Title from '../GeneralPageComponents/Title';
import VersionControl from '../../VersionControl';
import { Typography, Container, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import QuestionFields from './QuestionComponent/questions';
import { mockReflectionHistory } from '../../../shared/mockScenarioData';

const useStyles = makeStyles((theme) => ({
    saveButton: {
        margin: theme.spacing(2),
        float: 'right',
        textTransform: 'unset',
    },
}));

export default function Reflection(props) {
    const {postFunction,getFunction,page_id,page_type,page_title,page_subtitle,
      scenario_ID,version_ID,next_page_id,body,reflection_questions,...other} = props

    const classes = useStyles();

    const [title, setTitle] = useState(page_title);
    const [bodyText, setBodyText] = useState(body);
    //Assuming list of questions will be in array form
    const [questions, setQuestions] = useState([]);

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
            >
                Save
            </Button>
        </Container>
    );
}
