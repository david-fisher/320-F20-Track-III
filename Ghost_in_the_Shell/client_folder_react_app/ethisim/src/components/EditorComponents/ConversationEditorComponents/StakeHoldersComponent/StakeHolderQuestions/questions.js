import React, { useState, useEffect } from 'react';
import QuestionField from './question';
import Button from '@material-ui/core/Button';
import './questions.css';
import PropTypes from 'prop-types';

QuestionFields.propTypes = {
    questionsResponses: PropTypes.any,
};

export default function QuestionFields({ questionsResponses }) {
    //questionsResponses is an array of object in format {question: string, response: string}
    //Set fake ID for list item
    let initialQuestionsWithID = questionsResponses.map(function (data) {
        return {
            question: data.question,
            response: data.response,
            id: Math.floor(Math.random() * 10000),
        };
    });

    const [questionsWithID, setQuestionsWithID] = useState(
        initialQuestionsWithID
    );

    let resetQuestionsWithID = (questionsWithID) => {
        let initialQuestionsWithID = questionsResponses.map(function (data) {
            return {
                question: data.question,
                response: data.response,
                id: Math.floor(Math.random() * 10000),
            };
        });
        setQuestionsWithID(initialQuestionsWithID);
    };

    useEffect(resetQuestionsWithID, [questionsResponses]);

    const removeQuestion = (questionID) => {
        console.log(questionID);
        const leftQuestions = questionsWithID.filter(
            (q) => q.id !== questionID
        );
        setQuestionsWithID(leftQuestions);
    };

    const addQuestion = (e) => {
        const newQuestionsWithID = [
            ...questionsWithID,
            {
                id: Math.floor(Math.random() * 10000),
                question: '',
                response: '',
            },
        ];
        setQuestionsWithID(newQuestionsWithID);
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
                        response={data.response}
                        listOfQuestions={questionsWithID}
                        setListOfQuestions={setQuestionsWithID}
                    />
                ))}
            </form>
        </div>
    );
}
