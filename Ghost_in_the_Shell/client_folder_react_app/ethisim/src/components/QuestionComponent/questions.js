import React, { useState, useEffect } from 'react';
import QuestionField from './question';
import Button from '@material-ui/core/Button';
import './questions.css';
import PropTypes from 'prop-types';

QuestionFields.propTypes = {
    questions: PropTypes.any,
    setQuestions: PropTypes.any,
};

function QuestionFields({ questions, setQuestions }) {
    let initialQuestionsWithID = questions.map(function (question) {
        return {
            question: question,
            id: Math.floor(Math.random() * 10000),
        };
    });

    const [questionsWithID, setQuestionsWithID] = useState(
        initialQuestionsWithID
    );

    let resetQuestionsWithID = (questionsWithID) => {
        let initialQuestionsWithID = questions.map(function (question) {
            return {
                question: question,
                id: Math.floor(Math.random() * 10000),
            };
        });
        setQuestionsWithID(initialQuestionsWithID);
    };

    useEffect(resetQuestionsWithID, [questions]);

    /*
    const [question, setEdit] = useState({
        id: Math.floor(Math.random() * 10000),
    });
    */

    const removeQuestion = (questionID) => {
        console.log(questionID);
        const leftQuestions = questionsWithID.filter(
            (q) => q.id !== questionID
        );
        setQuestionsWithID(leftQuestions);
    };

    const addQuestion = (e) => {
        const newQuestions = [...questions, ''];
        setQuestions(newQuestions);
        const newQuestionsWithID = [
            ...questionsWithID,
            {
                id: Math.floor(Math.random() * 10000),
                question: '',
            },
        ];
        setQuestionsWithID(newQuestionsWithID);
        console.log(...questions);
    };

    // eslint-disable-next-line
    function updateItem(iItemID, iItemBody) {
        //TODO
        //functional code to save items to backend
    }

    return (
        <div className="questions">
            <Button
                id="button"
                onClick={addQuestion}
                variant="contained"
                color="primary"
            >
                Add Question
            </Button>

            <form id="form">
                {questionsWithID.map((data) => (
                    <QuestionField
                        key={data.id}
                        id={data.id}
                        removeQuestion={removeQuestion}
                        question={data.question}
                    />
                ))}
            </form>
        </div>
    );
}

export default QuestionFields;
