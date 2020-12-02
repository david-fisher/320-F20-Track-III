import React, { useState, useEffect } from 'react';
import QuestionField from './question';
import Button from '@material-ui/core/Button';
import './questions.css';
import PropTypes from 'prop-types';

QuestionFields.propTypes = {
    qrs: PropTypes.any,
    stakeholder_id: PropTypes.number,
};

export default function QuestionFields({qrs, stakeholder_id, }) {
    //used to track if we are waiting on a HTTP GET/POST/PUT request
    //not needed for DELETE
    const [isLoading, setLoading] = useState(false);
    var axios = require('axios');

    //the base url for api calls; will be imported eventually
    const baseURL = 'http://127.0.0.1:8000/';

    const [QRs, setQRs] = useState(qrs);

    const handleSave = (e) => {
        var axios = require('axios');
        var data = QRs;

        var config = {
            method: 'put',
            url: 'http://127.0.0.1:8000/multi_conv?STAKEHOLDER=93',
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

    const addQuestion = (e) => {
        if (!checkTime(setCurrentTime, currentTime)) {
            return;
        }
        setLoading(true);

        var data = JSON.stringify({ "STAKEHOLDER": stakeholder_id });

        var config = {
            method: 'post',
            url: baseURL + 'api/conversations/',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                const newQRs = [
                    ...QRs,
                    response.data
                ];
                setQRs(newQRs);
            })
            .catch(function (error) {
                console.log(error);
            });

        setLoading(false);
    };

    const removeQuestion = (questionID) => {
        if (!checkTime(setCurrentTime, currentTime)) {
            return;
        }
        setLoading(true);

        console.log(questionID);
        const leftQuestions = QRs.filter(
            (q) => q.CONVERSATION !== questionID
        );
        setQRs(leftQuestions);

        var data = JSON.stringify({});

        var config = {
            method: 'delete',
            url: baseURL + 'api/conversations/' + questionID + '/',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });

        setLoading(false);
    };

        /*
     * This section is about managing time to prevent sending a combination of multiple
     *    HTTP GET/POST/PUT/DELETE calls before a response is returned
     */
    const [currentTime, setCurrentTime] = useState(getCurrentTimeInt());
    //gets the current time in hms and converts it to an int
    function getCurrentTimeInt() {
        var time_string = Date();
        let d = Date();
        var h = d.substring(16, 18);
        var m = d.substring(19, 21);
        var s = d.substring(22, 24);
        return 60 * (60 * h + m) + s;
    }

    //checks if at least 1 second has elapsed since last action
    //if someone waits a multiple of exactly 24 hours since their last action they will
    //    not be able to take an action for an additional second
    function checkTime(setTime, t) {
        var ret = false;
        //current time difference is at least 1 second, but that SHOULD be ample time for
        //the database to get back to the frontend
        if (getCurrentTimeInt() - t != 0) {
            ret = true;
        }
        setTime(getCurrentTimeInt());
        return ret;
    }

    if (isLoading) {
        return <div> currently loading...</div>;
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
                {QRs.map((data) => (
                    <QuestionField
                        key={data.STAKEHOLDER}
                        id={data.CONVERSATION}
                        removeQuestion={removeQuestion}
                        question={data.QUESTION}
                        response={data.RESPONSE}
                        QRs = {QRs}
                        setQRs = {setQRs}
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
