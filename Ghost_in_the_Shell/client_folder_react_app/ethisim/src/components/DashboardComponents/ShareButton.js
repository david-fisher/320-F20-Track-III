import React, { useState } from 'react';
import { Button, TextField, Typography, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
//import Body from '../GeneralPageComponents/Body';
//import Title from '../GeneralPageComponents/Title';

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
    saveButton: {
        margin: theme.spacing(2),
        float: 'right',
        textTransform: 'unset',
    },
}));

export default function FinalAction(props) {
    const classes = useStyles();

    //const titleData = mockActionComponent.title;
    //const bodyData = mockActionComponent.body;
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [EnterEmail, setEnterEmail] = useState('');

    const onChangeEnterEmail = (event) => {
        setEnterEmail(event.target.value);
    };

    return (
        <Container component="main">
            <Typography align="center" variant="h2">
                Share Results
            </Typography>
            <div className={classes.container}>
                <form className={classes.form}>
                    <Typography align="center" variant="h6">
                        Enter Email
                    </Typography>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="Enter Email"
                        label="Enter Email"
                        name="Enter Email"
                        value={EnterEmail}
                        onChange={onChangeEnterEmail}
                    />
                    <Button
                        className={classes.saveButton}
                        variant="contained"
                        color="primary"
                    >
                        Share
                    </Button>
                </form>
            </div>
        </Container>
    );
}
