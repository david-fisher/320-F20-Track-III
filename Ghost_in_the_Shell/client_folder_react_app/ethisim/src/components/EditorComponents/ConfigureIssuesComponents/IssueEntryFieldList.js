import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import EntryField from './IssueEntryField';
import { Container, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import SavedBanner from '../../SavedBanner';

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

    console.log(issueEntryFieldList);

    const addIssue = (e) => {
        e.preventDefault();
        const newEntry = entryCur;
        issueEntryFieldList.data = issueEntryFieldList.data.concat(newEntry);
        setIssueEntryFieldList(issueEntryFieldList);
        setEntryCur({
            id: entryCur.id + 1,
        });
    };

    const [saved, setSaved] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setSaved(false);
        }, 1000);

        return () => clearTimeout(timeout);
    }, [saved]);

    return (
        <Container component="main" className={classes.container}>
            <SavedBanner saved={saved} />
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
                        setSaved={setSaved}
                    />
                ))}
            </form>
        </Container>
    );
}
