import React, { useState, useEffect } from 'react';
import QuestionField from './question';
import Button from '@material-ui/core/Button';
import './questions.css';
import PropTypes from 'prop-types';

QuestionFields.propTypes = {
    questionsResponses: PropTypes.any,
    qrs: PropTypes.any,
    stakeholder_id: PropTypes.number,
    getCurrentTime: PropTypes.func,
    checkTime: PropTypes.func,
};

export default function QuestionFields({qrs, stakeholder_id, getCurrentTimeInt, checkTime }) {
    const [currentTime, setCurrentTime] = useState(getCurrentTimeInt());
    const [isLoading, setLoading] = useState(false);
    
    //questionsResponses is an array of object in format {question: string, response: string}
    let initialQuestionsWithID = qrs.map(function (data) {
        return {
            question: data.QUESTION,
            response: data.RESPONSE,
            stakeholder_id: data.STAKEHOLDER,
            conversation_id: data.CONVERSATION,
        };
    });

    const [questionsWithID, setQuestionsWithID] = useState(
        initialQuestionsWithID
    );

    /*
    let resetQuestionsWithID = (questionsWithID) => {
        let initialQuestionsWithID = questionsResponses.map(function (data) {
            return {
                question: data.QUESTION,
                response: data.RESPONSE,
                stakeholder_id: data.STAKEHOLDER,
                conversation_id: data.CONVERSATION,
            };
        });
        setQuestionsWithID(initialQuestionsWithID);
    };

    useEffect(resetQuestionsWithID, [questionsResponses]);
    */

    const temp = (e) => {
        if (!checkTime(setCurrentTime, currentTime)) {
            return;
        }
        setLoading(true);
        setLoading(false);
    }

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
            <Button
                variant="contained"
                color="primary"
            >
                Save Changes
            </Button>
        </div>
    );
}
