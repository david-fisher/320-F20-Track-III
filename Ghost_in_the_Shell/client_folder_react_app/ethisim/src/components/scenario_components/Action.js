import React, { useState } from 'react';
import { Button, TextField, Typography, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Body from '../Body';
import Title from '../Title';
import VersionControl from '../VersionControl';
import { mockActionHistory } from '../../shared/mockScenarioData';

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        marginTop: theme.spacing(1),
        width: '100%',
    },
    submit: {
        marginTop: theme.spacing(2),
        backgroundColor: theme.palette.primary.main,
        color: 'white',
        textTransform: 'unset',
    },
}));

export default function FinalAction(props) {
    const classes = useStyles();

    //const titleData = mockActionComponent.title;
    //const bodyData = mockActionComponent.body;
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [option1, setOption1] = useState('');
    const [option2, setOption2] = useState('');

    return (
        <Container component="main">
            <Typography align="center" variant="h2">
                Action Component
            </Typography>
            <VersionControl
                history={mockActionHistory.history}
                type={mockActionHistory.type}
                setTitle={setTitle}
                setBody={setBody}
                setOption1={setOption1}
                setOption2={setOption2}
            />
            <Title title={title} setTitle={setTitle} />
            <Body body={body} />
            <div className={classes.container}>
                <form className={classes.form}>
                    <Typography align="center" variant="h6">
                        Option 1
                    </Typography>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="option 1"
                        label="Input Option 1 Text"
                        value={option1}
                        name="option 1"
                    />
                    <Typography align="center" variant="h6">
                        Option 2
                    </Typography>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="option 2"
                        label="Input Option 2 Text"
                        value={option2}
                        name="option 2"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        className={classes.submit}
                    >
                        Submit User Options
                    </Button>
                </form>
            </div>
        </Container>
    );
}
