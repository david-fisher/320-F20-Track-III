import React, { useState } from 'react';
import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import EntryFields from './IssueEntryFieldList';
import VersionControl from '../../VersionControl';
import { mockIssuesHistory } from '../../../shared/mockScenarioData';

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

export default function ConfigureIssues() {
    const classes = useStyles();
    const [issueEntryFieldList, setIssueEntryFieldList] = useState([]);

    return (
        <div className={classes.issue}>
            <Typography align="center" variant="h2">
                Configure Ethical Issues
            </Typography>
            <div className={classes.versionControl}>
                <VersionControl
                    history={mockIssuesHistory.history}
                    type={'Issues'}
                    setIssueEntryFieldList={setIssueEntryFieldList}
                />
            </div>
            <EntryFields
                issueEntryFieldList={issueEntryFieldList}
                setIssueEntryFieldList={setIssueEntryFieldList}
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
