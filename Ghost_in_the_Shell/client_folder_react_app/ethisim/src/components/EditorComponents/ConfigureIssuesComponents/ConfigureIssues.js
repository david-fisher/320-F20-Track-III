import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import EntryFields from './IssueEntryFieldList';
import VersionControl from '../../VersionControl';
import { mockIssuesHistory } from '../../../shared/mockScenarioData';
import get from '../../../get';
import LoadingSpinner from '../../LoadingSpinner';

//TODO once scenario dashabord and component/page loading is finished
const tempScenarioID = 1;

//Need scenarioID
const endpointGET = 'http://localhost:8000/api/Issues/?SCENARIO_ID=';

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

export default function ConfigureIssues(props) {
    const classes = useStyles();
    const [issueEntryFieldList, setIssueEntryFieldList] = useState({
        data: null,
        loading: true,
        error: null,
    });

    let getData = () => {
        get(setIssueEntryFieldList, endpointGET + tempScenarioID);
    };
    useEffect(getData, []);

    if (issueEntryFieldList.loading) {
        return <LoadingSpinner />;
    }

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
                issueEntryFieldList={
                    issueEntryFieldList !== null ? issueEntryFieldList : []
                }
                setIssueEntryFieldList={setIssueEntryFieldList}
            />
        </div>
    );
}
