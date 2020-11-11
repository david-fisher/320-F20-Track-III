import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import EntryField from './IssueEntryField';
import { Container, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import SuccessBanner from '../../Banners/SuccessBanner';
import ErrorBanner from '../../Banners/ErrorBanner';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
    },
    button: {
        margin: theme.spacing(1),
        marginTop: theme.spacing(1),
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

    console.log(issueEntryFieldList);

    //When we select new issue button, we add new issue object into array.
    //We set a temporary unique ID.
    function setNewIssueID() {
        let newID = 208;
        let collision =
            issueEntryFieldList.data.filter((data) => data.ISSUE_ID === newID)
                .length !== 0;
        while (collision) {
            newID = Math.floor(Math.random() * 10000000);
            const checkNewID = newID;
            collision =
                issueEntryFieldList.data.filter(
                    (data) => data.ISSUE_ID === checkNewID
                ).length !== 0;
        }
        return newID;
    }

    const [entryCur, setEntryCur] = useState({
        ISSUE_ID: setNewIssueID(),
        isNewIssue: true,
    });

    const addIssue = (e) => {
        e.preventDefault();
        const newEntry = entryCur;
        issueEntryFieldList.data = issueEntryFieldList.data.concat(newEntry);
        setIssueEntryFieldList(issueEntryFieldList);
        setEntryCur({
            ISSUE_ID: setNewIssueID(),
            isNewIssue: true,
        });
    };

    const [successBannerMessage, setSuccessBannerMessage] = useState('');
    const [successBannerFade, setSuccessBannerFade] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setSuccessBannerFade(false);
        }, 1000);

        return () => clearTimeout(timeout);
    }, [successBannerFade]);

    const [errorBannerMessage, setErrorBannerMessage] = useState('');
    const [errorBannerFade, setErrorBannerFade] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setErrorBannerFade(false);
        }, 1000);

        return () => clearTimeout(timeout);
    }, [errorBannerFade]);

    return (
        <Container component="main" className={classes.container}>
            <SuccessBanner
                successMessage={successBannerMessage}
                fade={successBannerFade}
            />
            <ErrorBanner
                errorMessage={errorBannerMessage}
                fade={errorBannerFade}
            />
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
                        isNewIssue={entry.isNewIssue}
                        issue={entry.NAME}
                        score={entry.IMPORTANCE_SCORE}
                        setIssueEntryFieldList={setIssueEntryFieldList}
                        issueEntryFieldList={issueEntryFieldList}
                        entry={entry}
                        setSuccessBannerFade={setSuccessBannerFade}
                        setSuccessBannerMessage={setSuccessBannerMessage}
                        setErrorBannerFade={setErrorBannerFade}
                        setErrorBannerMessage={setErrorBannerMessage}
                    />
                ))}
            </form>
        </Container>
    );
}
