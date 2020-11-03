import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import EntryField from './IssueEntryField';
import { Container, Button } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
    },
    button: {
        margin: theme.spacing(0.5),
        marginTop: theme.spacing(0),
        textTransform: 'unset',
    },
}));

IssueEntryFieldList.propTypes = {
    issueEntryFieldList: PropTypes.any.isRequired,
    setIssueEntryFieldList: PropTypes.any.isRequired,
};

export default function IssueEntryFieldList({
    issueEntryFieldList,
    setIssueEntryFieldList,
}) {
    const classes = useStyles();

    const [entryCur, setEntryCur] = useState({
        ISSUE_ID: Math.floor(Math.random() * 1000000),
        isNewIssue: true,
    });

    console.log(issueEntryFieldList);

    const addIssue = (e) => {
        e.preventDefault();
        const newEntry = entryCur;
        issueEntryFieldList.data = issueEntryFieldList.data.concat(newEntry);
        setIssueEntryFieldList(issueEntryFieldList);
        setEntryCur({
            ISSUE_ID: Math.floor(Math.random() * 1000000),
            isNewIssue: true,
        });
    };

    return (
        <Container component="main" className={classes.container}>
            <Button
                className={classes.button}
                id="button"
                onClick={addIssue}
                variant="contained"
                color="primary"
            >
                Create Issue
            </Button>

            <form id="form">
                {issueEntryFieldList.data.map((entry) => (
                    <EntryField
                        key={entry.ISSUE_ID}
                        id={entry.ISSUE_ID}
                        isNewIssue={entry.isNewIssue === true ? true : false}
                        issue={entry.NAME}
                        score={entry.IMPORTANCE_SCORE}
                        setIssueEntryFieldList={setIssueEntryFieldList}
                        issueEntryFieldList={issueEntryFieldList}
                        entry={entry}
                    />
                ))}
            </form>
        </Container>
    );
}
