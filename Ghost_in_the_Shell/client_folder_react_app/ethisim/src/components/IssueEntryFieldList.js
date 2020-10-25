import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import EntryField from './IssueEntryField';
import { Container, Button } from '@material-ui/core';

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

export default function IssueEntryFieldList() {
    const classes = useStyles();

    const [entries, setEntries] = useState([]);
    const [entryCur, setEntryCur] = useState({
        id: 0,
    });

    const handleDelete = (entryID) => {
        setEntries(entries.filter((entry) => entry.id !== entryID));
    };

    const addItem = (e) => {
        e.preventDefault();
        const newEntry = entryCur;
        const newEntries = [...entries, newEntry];
        setEntries(newEntries);
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
                {entries.map((entry) => (
                    <EntryField
                        key={entry.id}
                        onDelete={handleDelete}
                        entry={entry}
                    />
                ))}
            </form>
        </Container>
    );
}
