import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AuthorField from './Author';
import { isBrowser } from 'react-device-detect';
import { Button, TextField, Typography, Container } from '@material-ui/core';
import { mockUnfinishedScenario } from '../../../shared/mockScenarioData';

const useStyles = makeStyles((theme) => ({
    textfields: {
        '& > *': {
            margin: theme.spacing(1),
            width: '100%',
        },
    },
    buttons: {
        '& > *': {
            margin: theme.spacing(1),
            marginBottom: theme.spacing(1),
            width: '100%',
            textTransform: 'unset',
        },
    },
    authorButtons: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        textTransform: 'unset',
    },
    subdiv: {
        marginTop: theme.spacing(1),
        width: '750px',
        '@media (max-width: 1100px)': {
            width: '100%',
        },
    },
    saveButton: {
        margin: theme.spacing(2),
        float: 'right',
        textTransform: 'unset',
    },
}));

export default function Logistics(props) {

  /*const {postFunction,scenario_ID,version_ID,title,is_finished,
    public_scenario,num_convos,professors,courses} = props*/

    const classes = useStyles();
    //temporary until backend implements id's
    const { scenarioName, className } = mockUnfinishedScenario;
    //const [scenarioNameValue, setScenarioNameValue] = useState(title);
    const [scenarioNameValue, setScenarioNameValue] = useState(scenarioName);
    const [classNameValue, setClassNameValue] = useState(className);

    const onChangeScenarioName = (event) => {
        setScenarioNameValue(event.target.value);
    };

    const onChangeClassName = (event) => {
        setClassNameValue(event.target.value);
    };

    //const initialAuthors = professors[0];
    const initialAuthors = mockUnfinishedScenario.authors
    //Assume authors is an array of strings representing author names
    const [authors, setAuthors] = useState(initialAuthors);

    //Set fake ID for list item
    let initialAuthorsWithID = authors.map(function (author) {
        return {
            author: author,
            id: Math.floor(Math.random() * 10000),
        };
    });

    const [authorsWithID, setAuthorsWithID] = useState(initialAuthorsWithID);

    let resetAuthorsWithID = (authorsWithID) => {
        let initialAuthorsWithID = authors.map(function (author) {
            return {
                author: author,
                id: Math.floor(Math.random() * 10000),
            };
        });
        setAuthorsWithID(initialAuthorsWithID);
    };

    useEffect(resetAuthorsWithID, [authors]);

    const removeAuthor = (authorID) => {
        const leftAuthors = authorsWithID.filter(
            (author) => author.id !== authorID
        );
        setAuthorsWithID(leftAuthors);
    };

    const addAuthor = (e) => {
        let newAuthors = authorsWithID.map((data) => data.author);
        newAuthors = [...newAuthors, ''];
        setAuthors(newAuthors);
        const newAuthorsWithID = [
            ...authorsWithID,
            {
                id: Math.floor(Math.random() * 10000),
                author: '',
            },
        ];
        setAuthorsWithID(newAuthorsWithID);
    };

    //default if it's a browser
    var body = (
        <Container component="main">
            <Typography align="center" variant="h2">
                Logistics
            </Typography>
            <form className={classes.textfields} noValidate autoComplete="off">
                Simulation Title
                <TextField
                    id="Simulation Title"
                    value={scenarioNameValue}
                    onChange={onChangeScenarioName}
                />
                Course Name
                <TextField
                    id="Course Name"
                    value={classNameValue}
                    onChange={onChangeClassName}
                />
                Authors
            </form>
            {authorsWithID.map((data) => (
                <AuthorField
                    key={data.id}
                    id={data.id}
                    removeAuthor={removeAuthor}
                    author={data.author}
                    listOfAuthors={authorsWithID}
                    setListOfAuthors={setAuthorsWithID}
                />
            ))}
            <div className={classes.subdiv}>
                <form className={classes.buttons} noValidate autoComplete="off">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={addAuthor}
                    >
                        Add Author
                    </Button>
                    <Button variant="contained" color="primary">
                        Save Authors
                    </Button>
                </form>
            </div>
            <Typography align="left" variant="h6">
                Scenario ID: 1342431
            </Typography>
            <Typography align="left" variant="h6">
                Shareable Link: wwww.ethisim.com
            </Typography>
            <div className={classes.subdiv}>
                <form className={classes.buttons} noValidate autoComplete="off">
                    <Button variant="contained">View Student Responses</Button>
                    <Button variant="contained" color="primary">
                        Delete Scenario
                    </Button>
                    <Button variant="contained" color="primary">
                        View Version History
                    </Button>
                </form>
            </div>
        </Container>
    );

    //convert this to "isMobile" later; using "isBrowser" for testing purposes
    if (isBrowser) {
        body = (
            <Container component="main">
                <Typography align="center" variant="h2">
                    Logistics
                </Typography>
                <form
                    className={classes.textfields}
                    noValidate
                    autoComplete="off"
                >
                    Simulation Title
                    <TextField
                        id="Simulation Title"
                        value={scenarioNameValue}
                        onChange={onChangeScenarioName}
                    />
                    Course Name
                    <TextField
                        id="Course Name"
                        value={classNameValue}
                        onChange={onChangeClassName}
                    />
                    Authors
                </form>
                {authorsWithID.map((data) => (
                    <AuthorField
                        key={data.id}
                        id={data.id}
                        removeAuthor={removeAuthor}
                        author={data.author}
                        listOfAuthors={authorsWithID}
                        setListOfAuthors={setAuthorsWithID}
                    />
                ))}
                <div className={classes.subdiv}>
                    <form
                        className={classes.buttons}
                        noValidate
                        autoComplete="off"
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={addAuthor}
                        >
                            Add Author
                        </Button>
                        <Button variant="contained" color="primary">
                            Save Authors
                        </Button>
                    </form>
                </div>
                <Typography align="left" variant="h6">
                    Scenario ID: 1342431
                </Typography>
                <Typography align="left" variant="h6">
                    Shareable Link: wwww.ethisim.com
                </Typography>
                <div className={classes.subdiv}>
                    <form
                        className={classes.buttons}
                        noValidate
                        autoComplete="off"
                    >
                        <Button variant="contained">
                            View Student Responses
                        </Button>
                        <Button variant="contained" color="primary">
                            Delete Scenario
                        </Button>
                        <Button variant="contained" color="primary">
                            View Version History
                        </Button>
                    </form>
                </div>
                <Button
                    className={classes.saveButton}
                    variant="contained"
                    color="primary"
                >
                    Save
                </Button>
            </Container>
        );
    }

    return body;
}
