import React, { useState } from 'react';
import StakeHolderFields from './StakeHoldersComponent/stakeHolders';

ConversationEditor.propTypes = {
    scenario_ID: PropTypes.number,
};

export default function ConversationEditor({ scenario_ID }) {
    const [stakeHolders, setStakeHolders] = useState([]);

    return (
        <div>
            <StakeHolderFields
                stakeHolders={stakeHolders}
                setStakeHolders={setStakeHolders}
                scenario={scenario_ID}
            />
        </div>
    );
}
