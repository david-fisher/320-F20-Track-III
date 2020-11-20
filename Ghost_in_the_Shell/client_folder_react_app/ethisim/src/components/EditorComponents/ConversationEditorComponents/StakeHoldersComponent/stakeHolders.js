import React, { useEffect, useState } from 'react';
import StakeHolder from './stakeHolder';
import Button from '@material-ui/core/Button';
import './stakeHolders.css';
import PropTypes from 'prop-types';
import universalPost from './../../../../universalHTTPRequests/post.js';
//import LoadingSpinner from './../../../../components/LoadingSpinner';

StakeHolderFields.propTypes = {
    stakeHolders: PropTypes.any,
    setStakeHolders: PropTypes.any,
};

export default function StakeHolderFields() {
    const [stakeHolders, setStakeHolders] = useState([]);
    const [isLoading, setLoading] = useState(false);

    const [tempStakeHolder, setEdit] = useState({
        id: Math.floor(Math.random() * 10000),
        questionsResponses: [],
        false_id: 1,
    });

    const [shouldFetch, setShouldFetch] = useState(0);
    const [postValue, setPost] = useState({
        data: null,
        loading: true,
        error: null,
    });

    var axios = require('axios');
    const endpointPost = 'stakeholders/';

    const handleNewStakeHolder = (e) => {
        function onSuccessPost(resp) {
            console.log('Successfully POSTed new StakeHolder');
            console.log(resp.data);
            setShouldFetch(shouldFetch + 1);
        }
        function onFailurePost(resp) {
            console.log('Failed to POST new StakeHolder');
        }

        universalPost(
            setPost,
            endpointPost,
            onFailurePost,
            onSuccessPost,
            null
        );
    };

    function getExistingStakeHolders() {
        setLoading(true);
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
                    item.false_id = 0;
                    item.id = item.STAKEHOLDER_ID;
                    item.name = item.NAME;
                    item.bio = item.DESC;
                    item.mainConvo = item.MAIN_CONVERSATION;
                    item.scenario_id = item.SCENARIO_ID;
                    item.version_id = item.VERSION_ID;

                    delete item.STAKEHOLDER_ID;
                    delete item.NAME;
                    delete item.DESC;
                    delete item.MAIN_CONVERSATION;
                    delete item.SCENARIO_ID;
                    delete item.VERSION_ID;
                    //item.questionsResponses = [];
                    //stakeholderIssues: ????
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

    //There's a weird error where the first POST request creates a new object that
    //never gets accounted for in the array :(
    //it probably has to do with React hooks being async; perhaps make page refresh or something?
    const addStakeHolder = (e) => {
        //adding a stakeholder to the frontend
        setEdit({
            id: Math.floor(Math.random() * 10000),
            questionsResponses: [],
            false_id: 1,
        });
        const newStakeHolders = [...stakeHolders, tempStakeHolder];
        setStakeHolders(newStakeHolders);

        //handling the POST request
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
            //successful request
            .then(function (response) {
                //modify the stakeholder created on the frontend
                console.log(JSON.stringify(response.data));
                stakeHolders.forEach((item) => {
                    if (item.false_id == 1) {
                        item.false_id = 0;
                        item.id = response.data.STAKEHOLDER_ID;
                        item.name = response.data.NAME;
                        item.bio = response.data.DESC;
                        item.mainConvo = response.data.MAIN_CONVERSATION;
                        item.scenario_id = response.data.SCENARIO_ID;
                        item.version_id = response.data.VERSION_ID;
                        item.questionsResponses = [];
                        //TODO
                        //stakeholderIssues: ????
                    }
                });

                setShouldFetch(shouldFetch + 1);
            })
            //nonsuccessful request
            .catch(function (error) {
                console.log(error);
            });

        console.log(stakeHolders);
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
                onClick={handleNewStakeHolder}
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
