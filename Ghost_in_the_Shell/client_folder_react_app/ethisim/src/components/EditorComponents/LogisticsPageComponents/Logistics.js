import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Author from './Author';
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
    const classes = useStyles();
    //temporary until backend implements id's
    const [id, setId] = useState(0);
    const { scenarioName, className } = mockUnfinishedScenario;
    const initialAuthors = mockUnfinishedScenario.authors;

    const addAuthor = (event) => {
        setAuthor(authors.concat(<Author key={id + 1} />));
        setId(id + 1);
        if (event) {
            event.preventDefault();
        }
    };

    const initializeAuthors = (authorsArray, currentAuthor, index) => {
        return authorsArray.concat(
            <Author key={index} author={currentAuthor} />
        );
    };

    const currentAuthors = initialAuthors.reduce(
        (authorsArray, currentAuthor, index) => {
            return initializeAuthors(authorsArray, currentAuthor, index);
        },
        []
    );

    const [authors, setAuthor] = useState(currentAuthors);

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
                    label=""
                    value={scenarioName}
                />
                Course Name
                <TextField id="Course Name" label="" value={className} />
                Authors
            </form>
            {authors}
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
                        label=""
                        value={scenarioName}
                    />
                    Course Name
                    <TextField id="Course Name" label="" value={className} />
                    Authors
                </form>
                {authors}
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