import React, { useState, useEffect } from 'react';
import QuestionField from './question';
import Button from '@material-ui/core/Button';
import './questions.css';
import PropTypes from 'prop-types';

QuestionFields.propTypes = {
    questionsResponses: PropTypes.any,
    qrs: PropTypes.any,
    stakeholder_id: PropTypes.number,

};

export default function QuestionFields({qrs, stakeholder_id, }) {
    
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

    const baseURL = 'http://127.0.0.1:8000/';

    const handleSave = (e) => {
        var axios = require('axios');
        var data = [{}]

        var config = {
            method: 'put',
            url: 'http://127.0.0.1:8000/multi_conv?STAKEHOLDER=68',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log("Successfully saved conversations for this stakeholder");
            })
            .catch(function (error) {
                console.log(error);
            });
    }

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
                onClick={handleSave}
            >
                Save Changes
            </Button>
        </div>
    );
}
