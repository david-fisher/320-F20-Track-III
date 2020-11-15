import React, { useState } from 'react';
import StakeHolder from './stakeHolder';
import Button from '@material-ui/core/Button';
import './stakeHolders.css';
import PropTypes from 'prop-types';
import universalPost from './../../../../universalHTTPRequests/post.js';

StakeHolderFields.propTypes = {
    stakeHolders: PropTypes.any,
    setStakeHolders: PropTypes.any,
};

export default function StakeHolderFields({ stakeHolders, setStakeHolders }) {
    const [stakeHolder, setEdit] = useState({
        id: Math.floor(Math.random() * 10000),
        questionsResponses: [],
    });

    const removeStakeHolder = (stakeHolderID) => {
        console.log(stakeHolderID);
        const leftStakeHolders = stakeHolders.filter(
            (s) => s.id !== stakeHolderID
        );
        setStakeHolders(leftStakeHolders);
    };

    /*
    const [getValues, setGetValues] = useState({
        data: null,
        loading: true,
        error: null
    })

    const handleGet = (e) => {
        var axios = require('axios');
        var data = JSON.stringify({ "STAKEHOLDER_ID": 12, "NAME": "Test2", "DESC": "Updated", "MAIN_CONVERSATION": "Hello World", "SCENARIO_ID_id": 1, "VERSION_ID_id": 1 });

        var config = {
            method: 'get',
            url: 'http://127.0.0.1:8000/api/stakeholders',
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
    }
    */

    function addStakeholder() {
        //adding a stakeholder to the frontend
        //var false_id = Math.floor(Math.random() * 10000);
        setEdit({
            key: Math.floor(Math.random() * 10000),
            false_id: 1,
            questionsResponses: [],
        });

        const newStakeHolders = [...stakeHolders, stakeHolder];
        setStakeHolders(newStakeHolders);

        //handling the POST request
        var axios = require('axios');
        var data = JSON.stringify({
            SCENARIO_ID: 'http://127.0.0.1:8000/api/scenarios/1/',
            VERSION_ID: 'http://127.0.0.1:8000/api/scenarios/1/',
        });

        var config = {
            method: 'post',
            url: 'http://127.0.0.1:8000/api/stakeholders/',
            headers: {
                'Content-Type': 'application/json',
            },
            data: data,
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));

                //modify the created stakeholder
                //this is clearly not working right now
                stakeHolders.forEach((item) => {
                    if (item.false_id == 1) {
                        item = {
                            key: Math.floor(Math.random() * 10000),
                            id: response.data.STAKEHOLDER_ID,
                            name: response.data.NAME,
                            bio: response.data.DESC,
                            mainConvo: response.data.MAIN_CONVERSATION,
                            scenario_id: response.data.SCENARIO_ID,
                            version_id: response.data.VERSION_ID,
                            questionsResponses: [],
                            //TODO
                            //stakeholderIssues: ????
                        };
                    }
                });
            })
            .catch(function (error) {
                console.log(error);
            });

        console.log(stakeHolders);
    }

    return (
        <div className="stakeHolders">
            <Button
                id="button"
                onClick={addStakeholder}
                variant="contained"
                color="primary"
            >
                Add Stake Holder
            </Button>

            <form id="form">
                {stakeHolders.map((stakeHolder) => (
                    <StakeHolder
                        key={stakeHolder.id}
                        removeStakeHolder={removeStakeHolder}
                        id={stakeHolder.id}
                        name={stakeHolder.name}
                        bio={stakeHolder.bio}
                        mainConvo={stakeHolder.mainConvo}
                        questionsResponses={stakeHolder.questionsResponses}
                        stakeHolderIssues={stakeHolder.stakeHolderIssues}
                    />
                ))}
            </form>
        </div>
    );
}
