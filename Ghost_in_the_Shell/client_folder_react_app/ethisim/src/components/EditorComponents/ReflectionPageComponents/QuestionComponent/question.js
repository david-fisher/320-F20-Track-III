import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(0.5),
        marginTop: theme.spacing(0),
        width: 50,
    },
}));

QuestionField.propTypes = {
    removeQuestion: PropTypes.any,
    question: PropTypes.any,
    id: PropTypes.number,
    listOfQuestions: PropTypes.any,
    setListOfQuestions: PropTypes.any,
    setReqBodyNew: PropTypes.any,
};

export default function QuestionField({
    question,
    removeQuestion,
    id,
    listOfQuestions,
    setListOfQuestions,
    setReqBodyNew
}) {
    const classes = useStyles();
    const [questionValue, setQuestionValue] = useState(question);

    const onChangeQuestion = (event) => {
        setQuestionValue(event.target.value);
        let listOfQuestions2 = [...listOfQuestions]
        for(let i = 0 ; i < listOfQuestions2.length;i++){
          if(listOfQuestions2[i].id === id){
            listOfQuestions2[i].question.REFLECTION_QUESTION = event.target.value
          }
        }
        setListOfQuestions(listOfQuestions2);
        setReqBodyNew(listOfQuestions2);
    };

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
                        style={{ width: 500 }}
                        id="outlined-multiline-static"
                        label="Question"
                        multiline
                        rows={2}
                        variant="outlined"
                        value={questionValue.REFLECTION_QUESTION}
                        onChange={onChangeQuestion}
                    />
                </Box>
                <Box p={1}>
                    <div>
                        <Button
                            className={classes.margin}
                            variant="contained"
                            color="primary"
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
