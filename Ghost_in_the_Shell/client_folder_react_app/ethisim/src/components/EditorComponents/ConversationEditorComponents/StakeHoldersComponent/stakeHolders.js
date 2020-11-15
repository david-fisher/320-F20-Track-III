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
    var axios = require('axios');

    const [stakeHolder, setEdit] = useState({
        id: Math.floor(Math.random() * 10000),
        questionsResponses: [],
        false_id: 1,
    });

    //this is supposed to get and populate the page with existing stakeholders
    //unfortunately, this is omega bugged right now
    const getExistingStakeHolders = (e) => {
        var data = JSON.stringify({});

        var config = {
            method: 'get',
            url: 'http://127.0.0.1:8000/api/stakeholders/',
            headers: {
                'Content-Type': 'application/json',
            },
            data: data,
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                setStakeHolders(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });

        stakeHolders.forEach((item) => {
            item.false_id = 0;
            item.id = item.STAKEHOLDER_ID;
            item.name = item.NAME;
            item.bio = item.DESC;
            item.mainConvo = item.MAIN_CONVERSATION;
            item.scenario_id = item.SCENARIO_ID;
            item.version_id = item.VERSION_ID;
            //TODO
            //item.questionsResponses = [];
            //stakeholderIssues: ????
        });
    };

    /*
    has an issue related to the POST issue
    where a stakeholder has its Math.random() generated id instead of the one generated from the db
    
        first call to remove:
            calls DELETE with the Math.random() number, regardless if the stakeholder is in the db or not
                this will return an error message unless the Math.random() number corresponds
                to an id in the db
            if it's called on something that is in the db
                it removes nothing from the frontend and puts information in boxes
                    (e.g. stakeholder names are filled in for items that are in the db)
            if it's called on something that is not in the db
                it removes that item from the frontend
        
        after the first call:
            the last item (unless deleted in first call) should be the only one that is not in the db
                (also has an id that was Math.random())
            DELETE will work as intended on items that exist in the db now
            DELETE will return an error message on the last item unless Math.random() corresponds
                to an item in the db
    */
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
        const newStakeHolders = [...stakeHolders, stakeHolder];
        setStakeHolders(newStakeHolders);
        setEdit({
            id: Math.floor(Math.random() * 10000),
            questionsResponses: [],
            false_id: 1,
        });

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
            .then(function (response) {
                //modify the created stakeholder
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
            })
            .catch(function (error) {
                console.log(error);
            });
        console.log(stakeHolders);
    };

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
        </div>
    );
}
