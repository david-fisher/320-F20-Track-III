import React, { useEffect, useState } from 'react';
import StakeHolder from './stakeHolder';
import Button from '@material-ui/core/Button';
import './stakeHolders.css';
import PropTypes from 'prop-types';
//import Time from 'react-time';
//import LoadingSpinner from './../../../../components/LoadingSpinner';

StakeHolderFields.propTypes = {
    stakeHolders: PropTypes.any,
    setStakeHolders: PropTypes.any,
};

export default function StakeHolderFields() {
    const scenario = 2;
    /*
     * This section is code that is essentially the middleware between the frontend and backend
     * Handles API calls between frontend and backend
     */

    //tracks current state of stakeholders to be represented on the frontend
    const [stakeHolders, setStakeHolders] = useState([]);
    //used to track if we are waiting on a HTTP GET/POST/PUT request
    //not needed for DELETE
    const [isLoading, setLoading] = useState(false);
    var axios = require('axios');

    //the base url for api calls; will be imported eventually 
    const baseURL = 'http://127.0.0.1:8000/';

    //handles GETting existing stakeholders from the backend and representing
    //    that information in the frontend
    function getExistingStakeHolders() {
        if (!checkTime(setCurrentTime, currentTime)) {
            return;
        }
        setLoading(true);
        //TODO: implement  get for specific scenarios
        var config = {
            method: 'get',
            url: baseURL + 'api/stakeholders/',
            headers: {
                'Content-Type': 'application/json',
            },
            data: null,
        };

        axios(config)
            .then(function (response) {
                console.log(response.data);
                setStakeHolders(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
        setLoading(false);
    }

    //handles DELETEing a stakeholder from the backend and removing the corresponding
    //    stakeholder from the frontend
    const removeStakeHolder = (stakeHolderID) => {
        if (!checkTime(setCurrentTime, currentTime)) {
            return;
        }
        
        //handling it on the frontend
        console.log(stakeHolderID);
        const leftStakeHolders = stakeHolders.filter(
            (s) => s.STAKEHOLDER !== stakeHolderID
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
                baseURL + 'api/stakeholders/' + stakeHolderID + '/',
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
    console.log(stakeHolders);

    //handles POSTing a new stakeholder to the backend and adding that stakeholder to the frontend
    const addStakeHolder = (e) => {
        if (!checkTime(setCurrentTime, currentTime)) {
            return;
        }
        setLoading(true);
        //TODO: figure out how to distinguish which scenario this newly put item is from
        //currently has scenario 2 arbitrarily
        var data = JSON.stringify({
            SCENARIO: scenario,
        });

        var config = {
            method: 'post',
            url: baseURL + 'api/stakeholders/',
            headers: {
                'Content-Type': 'application/json',
            },
            data: data,
        };

        var newStakeHolder;
        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                setStakeHolders([...stakeHolders, response.data]);
            })
            .catch(function (error) {
                console.log(error);
            });
        
        setLoading(false);
    };

    const saveStakeHolders = (e) => {
        if (!checkTime(setCurrentTime, currentTime)) {
            return;
        }
        setLoading(true);
        var data = [...stakeHolders];

        //TODO figure out how to track the scenario ID
        //currently has arbitrary value of 2
        var config = {
            method: 'put',
            url: baseURL + 'multi_stake?SCENARIO=' + scenario,
            headers: {
                'Content-Type': 'application/json',
            },
            data: data,
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                console.log(
                    'Successfully PUT local stakeholders to the database'
                );
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

    /*
     * This code is the frontend rendering; what the users see
     */

    //TODO figure out something better than raw text
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
                        key={stakeHolder.STAKEHOLDER}
                        removeStakeHolder={removeStakeHolder}
                        id={stakeHolder.STAKEHOLDER}
                        name={stakeHolder.NAME}
                        job={stakeHolder.JOB}
                        bio={stakeHolder.DESCRIPTION}
                        mainConvo={stakeHolder.INTRODUCTION}
                        getCurrentTimeInt = {getCurrentTimeInt}
                        checkTime = {checkTime}
                        stakeHolders = {stakeHolders}
                        setStakeHolders = {setStakeHolders}
                    />
                ))}
            </form>

            <div id="SaveButton">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={saveStakeHolders}
                >
                    Save Stakeholder Changes
                </Button>
            </div>
        </div>
    );
}
