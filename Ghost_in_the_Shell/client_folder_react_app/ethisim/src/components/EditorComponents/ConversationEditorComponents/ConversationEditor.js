import React, { useState } from 'react';
import StakeHolderFields from './StakeHoldersComponent/stakeHolders';
import VersionControl from '../../VersionControl';
import { mockActionHistory } from '../../../shared/mockScenarioData';

export default function ConversationEditor() {
    const [stakeHolders, setStakeHolders] = useState([]);

    return (
        <div>
            <VersionControl
                history={mockActionHistory.history}
                type={'Conversation Editor'}
                setStakeHolders={setStakeHolders}
            />
            <StakeHolderFields
                stakeHolders={stakeHolders}
                setStakeHolders={setStakeHolders}
            />
        </div>
    );
}
