import React, { useState } from 'react';
import { Button, TextField, Typography, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Body from '../GeneralPageComponents/Body';
import Title from '../GeneralPageComponents/Title';
import VersionControl from '../../VersionControl';
import { mockActionHistory } from '../../../shared/mockScenarioData';

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
    const {postFunction,getFunction,page_id,page_type,page_title,page_subtitle,scenario_ID,
      version_ID,next_page_id,body,choice1,result1,choice2,result2,...other} = props

    postReqBody = {PAGE_ID: page_id,
      PAGE_TYPE: page_type,
      PAGE_TITLE: page_title,
      PAGE_SUBTITLE: page_subtitle,
      PAGE_SCENARIO: scenario_ID,
      VERSION_ID: version_ID,
      CHOICES: [choice1,choice2],
      RESULT_PAGE: 1
    }
    //const titleData = mockActionComponent.title;
    //const bodyData = mockActionComponent.body;
    const [title, setTitle] = useState(page_title);
    const [bodyText, setBodyText] = useState(body);
    const [option1, setOption1] = useState(choice1);
    const [option2, setOption2] = useState(choice2);


    const onChangeOption1 = (event) => {
        setOption1(event.target.value);
    };

    const onChangeOption2 = (event) => {
        setOption2(event.target.value);
    };

    return (
        <Container component="main">
            <Typography align="center" variant="h2">
                Action Component
            </Typography>
            <VersionControl
                history={mockActionHistory.history}
                type={mockActionHistory.type}
                setTitle={setTitle}
                setBody={setBodyText}
                setOption1={setOption1}
                setOption2={setOption2}
            />
            <Title title={title} setTitle={setTitle} />
            <Body body={bodyText} />
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
                        name="option 1"
                        value={option1}
                        onChange={onChangeOption1}
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
                        name="option 2"
                        value={option2}
                        onChange={onChangeOption2}
                    />
                    <Button
                        className={classes.saveButton}
                        variant="contained"
                        color="primary"
                    >
                        Save
                    </Button>
                </form>
            </div>
        </Container>
    );
}
