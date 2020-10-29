import React, { useState } from 'react';
import StakeHolder from './stakeHolder';
import Button from '@material-ui/core/Button';
import './stakeHolders.css';
import PropTypes from 'prop-types';

StakeHolderFields.propTypes = {
    stakeHolders: PropTypes.any,
    setStakeHolders: PropTypes.any,
};

export default function StakeHolderFields({ stakeHolders, setStakeHolders }) {
    //const [stakeHolders, setStakeHolders] = useState([]);
    const [name, setName] = useState('');

    const [stakeHolder, setEdit] = useState({
        id: Math.floor(Math.random() * 10000),
    });

    const removeStakeHolder = (stakeHolderID) => {
        console.log(stakeHolderID);
        const leftStakeHolders = stakeHolders.filter(
            (s) => s.id !== stakeHolderID
        );
        setStakeHolders(leftStakeHolders);
    };

    const addStakeHolder = (e) => {
        const newStakeHolders = [...stakeHolders, stakeHolder];
        setStakeHolders(newStakeHolders);
        console.log(...stakeHolders);
        setEdit({ id: Math.floor(Math.random() * 10000) });
    };

    // eslint-disable-next-line
    function updateStakeholder(stakeholderID, stakeholderBody) {
        //TODO
        //functional code to save items to backend
    }

    return (
        <div className="stakeHolders">
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
                        stakeHolder={stakeHolder}
                        name={stakeHolder.name}
                        bio={stakeHolder.bio}
                        mainConvo={stakeHolder.mainConvo}
                        questions={stakeHolder.questions}
                        stakeHolderIssues={stakeHolder.stakeHolderIssues}
                    />
                ))}
            </form>
        </div>
    );
}
