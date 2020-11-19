import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import htmlToText from 'html-to-text';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(0.5),
        marginTop: theme.spacing(0),
        width: 50,
    },
}));

QuestionField.propTypes = {
    question: PropTypes.string,
    response: PropTypes.string,
    id: PropTypes.number,
    removeQuestion: PropTypes.any.isRequired,
    listOfQuestions: PropTypes.any,
    setListOfQuestions: PropTypes.any,
};

export default function QuestionField({
    question,
    response,
    removeQuestion,
    id,
    setListOfQuestions,
    listOfQuestions,
}) {
    const [questionValue, setQuestionValue] = useState(question);
    const [responseValue, setResponseValue] = useState(response);

    const onChangeQuestion = (event) => {
        setQuestionValue(event.target.value);
        setListOfQuestions(
            listOfQuestions.map((data) => {
                if (data.id === id) {
                    return {
                        ...data,
                        question: event.target.value,
                    };
                }
                return data;
            })
        );
    };

    const onChangeResponse = (event) => {
        setResponseValue(event.target.value);
        setListOfQuestions(
            listOfQuestions.map((data) => {
                if (data.id === id) {
                    return {
                        ...data,
                        response: event.target.value,
                    };
                }
                return data;
            })
        );
    };

    // eslint-disable-next-line
    let handleChange = (content, editor) => {
        //TODO Implement
        console.log(content);
        console.log(htmlToText.fromString(content));
    };

    function updateRow(rowID, rowBody) {
        //TODO
        //functional code to save items to backend
    }

    const classes = useStyles();

    return (
        <div>
            <Box
                display="flex"
                flexDirection="row"
                p={1}
                m={1}
                bgcolor="background.paper"
            >
                <Box p={1}>
                    <TextField
                        style={{ width: 700 }}
                        id="outlined-multiline-static"
                        label="Question"
                        multiline
                        rows={2}
                        variant="outlined"
                        value={questionValue}
                        onChange={onChangeQuestion}
                    />
                    <TextField
                        style={{ width: 700, marginTop: 20 }}
                        id="outlined-multiline-static"
                        label="StakeHolder Response"
                        multiline
                        rows={2}
                        variant="outlined"
                        value={responseValue}
                        onChange={onChangeResponse}
                    />
                </Box>
                <Box p={1}>
                    <div>
                        <Button
                            className={classes.margin}
                            variant="contained"
                            color="primary"
                            onClick={updateRow}
                        >
                            Save
                        </Button>
                    </div>
                    <div>
                        <Button
                            className={classes.margin}
                            variant="contained"
                            color="primary"
                            onClick={() => removeQuestion(id)}
                        >
                            Delete
                        </Button>
                    </div>
                </Box>
            </Box>
        </div>
    );
}
