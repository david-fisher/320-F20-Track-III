import React, { useEffect, useState } from 'react';
import StakeHolder from './stakeHolder';
import Button from '@material-ui/core/Button';
import './stakeHolders.css';
import PropTypes from 'prop-types';
//import LoadingSpinner from './../../../../components/LoadingSpinner';

StakeHolderFields.propTypes = {
    stakeHolders: PropTypes.any,
    setStakeHolders: PropTypes.any,
};

export default function StakeHolderFields() {
    const [stakeHolders, setStakeHolders] = useState([]);
    const [isLoading, setLoading] = useState(false);

    var axios = require('axios');
    const endpointPost = 'stakeholders/';

    function convertParameters(item) {
        item.id = item.STAKEHOLDER_ID;
        item.name = item.NAME;
        item.bio = item.DESC;
        item.mainConvo = item.MAIN_CONVERSATION;
        item.scenario_id = item.SCENARIO_ID;
        item.version_id = item.VERSION_ID;
        //item.questionsResponses = [];
        //stakeholderIssues: ????

        delete item.STAKEHOLDER_ID;
        delete item.NAME;
        delete item.DESC;
        delete item.MAIN_CONVERSATION;
        delete item.SCENARIO_ID;
        delete item.VERSION_ID;
    }

    function getExistingStakeHolders() {
        setLoading(true);
        //TODO: implement  get for specific scenarios
        var config = {
            method: 'get',
            url: 'http://127.0.0.1:8000/api/stakeholders/',
            headers: {
                'Content-Type': 'application/json',
            },
            data: null,
        };

        axios(config)
            .then(function (response) {
                console.log(response.data);
                const gottedStakeHolderData = response.data;
                gottedStakeHolderData.map((item) => {
                    convertParameters(item);
                });
                setStakeHolders(gottedStakeHolderData);
            })
            .catch(function (error) {
                console.log(error);
            });
        setLoading(false);
    }

    const removeStakeHolder = (stakeHolderID) => {
        //handling it on the frontend
        console.log(stakeHolderID);
        const leftStakeHolders = stakeHolders.filter(
            (s) => s.id !== stakeHolderID
        );
        setStakeHolders(leftStakeHolders);

        //calling the DELETE request on the backend
        var data = JSON.stringify({});

        console.log(
            'sending DELETE request for stakeholder_id ' + stakeHolderID
        );
        var config = {
            method: 'delete',
            url:
                'http://127.0.0.1:8000/api/stakeholders/' + stakeHolderID + '/',
            headers: {
                'Content-Type': 'application/json',
            },
            data: data,
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const addStakeHolder = (e) => {
        //TODO: figure out how to distinguish which scenario this newly put item is from
        setLoading(true);

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
                const tempStakeHolder = response.data;
                tempStakeHolder.false_id = 1;
                const updatedStakeHolders = [...stakeHolders, tempStakeHolder];
                updatedStakeHolders.map((item) => {
                    if (item.false_id == 1) {
                        convertParameters(item);
                    }
                });
                setStakeHolders(updatedStakeHolders);
            })
            .catch(function (error) {
                console.log(error);
            });
        setLoading(false);
    };

    if (isLoading) {
        return <div> currently loading...</div>;
    }

    return (
        <div className="stakeHolders">
            <Button
                id="button"
                onClick={getExistingStakeHolders}
                variant="contained"
                color="primary"
            >
                get
            </Button>

            <Button
                id="button"
                onClick={addStakeHolder}
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

            <div id="SaveButton">
                <Button variant="contained" color="primary">
                    Save Stakeholder Changes
                </Button>
            </div>
        </div>
    );
}
