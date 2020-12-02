import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import StakeHolderFields from './StakeHoldersComponent/stakeHolders';
import VersionControl from '../../VersionControl';
import { mockConversationEditorHistory } from '../../../shared/mockScenarioData';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    issue: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    versionControl: {
        margin: theme.spacing(2),
    },
    saveButton: {
        margin: theme.spacing(2),
        float: 'right',
        textTransform: 'unset',
    },
}));

export default function ConversationEditor() {
    const classes = useStyles();
    const [stakeHolders, setStakeHolders] = useState([]);

    return (
        <div>
            <VersionControl
                history={mockConversationEditorHistory.history}
                type={'Conversation Editor'}
                setStakeHolders={setStakeHolders}
            />
            <StakeHolderFields
                stakeHolders={stakeHolders}
                setStakeHolders={setStakeHolders}
            />
            <Button
                className={classes.saveButton}
                variant="contained"
                color="primary"
            >
                Save
            </Button>
        </div>
    );
}
