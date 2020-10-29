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
    const classes = useStyles();
    //const titleData = mockActionComponent.title;
    //const bodyData = mockActionComponent.body;
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
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
                setBody={setBody}
                setQuestions={setQuestions}
            />
            <Title title={title} setTitle={setTitle} />
            <Body body={body} />
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
