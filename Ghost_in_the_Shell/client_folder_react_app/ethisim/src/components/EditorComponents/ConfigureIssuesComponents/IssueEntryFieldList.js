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
    //IssueEntryFieldList.propTypes.issueEntryFieldList = { issueEntryFieldList };
    //IssueEntryFieldList.propTypes.setIssueEntryFieldList = { setIssueEntryFieldList };
    const [entryCur, setEntryCur] = useState({
        id: 0,
    });

    const handleDelete = (entryID) => {
        setIssueEntryFieldList(
            issueEntryFieldList.filter((entry) => entry.id !== entryID)
        );
    };

    const addItem = (e) => {
        e.preventDefault();
        const newEntry = entryCur;
        setIssueEntryFieldList(issueEntryFieldList.concat(newEntry));
        setEntryCur({
            id: entryCur.id + 1,
        });
    };

    return (
        <Container component="main" className={classes.container}>
            <Button
                className={classes.button}
                id="button"
                onClick={addItem}
                variant="contained"
                color="primary"
            >
                Create Issue
            </Button>

            <form id="form">
                {issueEntryFieldList.map((entry) => (
                    <EntryField
                        key={entry.id}
                        issue={entry.issue}
                        score={entry.score}
                        onDelete={handleDelete}
                        entry={entry}
                    />
                ))}
            </form>
        </Container>
    );
}
