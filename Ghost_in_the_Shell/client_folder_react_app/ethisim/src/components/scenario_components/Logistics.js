import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Author from './Author';
import { isBrowser } from 'react-device-detect';

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
            width: '100%',
        },
    },
    subdiv: {
        marginTop: theme.spacing(1),
        width: '500px',
        '@media (max-width:750px)': {
            width: '100%',
        },
    },
}));

export default function Logistics() {
    const classes = useStyles();
    const [authors, setAuthor] = useState([<Author key={''} />]);

    const addAuthor = (event) => {
        setAuthor(authors.concat(<Author />));
        event.preventDefault();
    };

    //default if it's a browser
    var body = (
        <div>
            <Typography align="center" variant="h2">
                Logistics
            </Typography>
            <Typography align="left" variant="h6">
                <form
                    className={classes.textfields}
                    noValidate
                    autoComplete="off"
                >
                    Simulation Title
                    <TextField id="Simulation Title" label="" />
                    Course Name
                    <TextField id="Course Name" label="" />
                    Authors
                    {authors}
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={addAuthor}
                    >
                        Add Author
                    </Button>
                    <Button
                        className={classes.margin}
                        variant="contained"
                        color="primary"
                    >
                        Save Authors
                    </Button>
                    Scenario ID: 1342431
                </form>
                Shareable Link: wwww.ethisim.com
            </Typography>
            <div className={classes.subdiv}>
                <form className={classes.buttons} noValidate autoComplete="off">
                    <Button variant="contained" color="grey">
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
        </div>
    );

    //convert this to "isMobile" later; using "isBrowser" for testing purposes
    if (isBrowser) {
        body = (
            <div>
                <Typography align="center" variant="h2">
                    Logistics
                </Typography>
                <Typography align="left" variant="h6">
                    <form
                        className={classes.textfields}
                        noValidate
                        autoComplete="off"
                    >
                        Simulation Title
                        <TextField id="Simulation Title" label="" />
                        Course Name
                        <TextField id="Course Name" label="" />
                        Authors
                        {authors}
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={addAuthor}
                        >
                            Add Author
                        </Button>
                        <Button
                            className={classes.margin}
                            variant="contained"
                            color="primary"
                        >
                            Save Authors
                        </Button>
                        Scenario ID: 1342431
                    </form>
                    Shareable Link: wwww.ethisim.com
                </Typography>
                <div className={classes.subdiv}>
                    <form
                        className={classes.buttons}
                        noValidate
                        autoComplete="off"
                    >
                        <Button variant="contained" color="grey">
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
            </div>
        );
    }

    return body;
}
