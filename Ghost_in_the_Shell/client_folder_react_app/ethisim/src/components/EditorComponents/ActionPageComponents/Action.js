import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Body from '../GeneralPageComponents/Body';
import Title from '../GeneralPageComponents/Title';
import VersionControl from '../../VersionControl';
import { mockActionHistory } from '../../../shared/mockScenarioData';
import PropTypes from 'prop-types';

Action.propTypes = {
    postFunction: PropTypes.func.isRequired,
    page_id: PropTypes.any.isRequired,
    page_type: PropTypes.any.isRequired,
    page_title: PropTypes.any.isRequired,
    scenario_ID: PropTypes.any.isRequired,
    version_ID: PropTypes.any.isRequired,
    next_page_id: PropTypes.any.isRequired,
    body: PropTypes.any.isRequired,
    choice1: PropTypes.any.isRequired,
    choice2: PropTypes.any.isRequired,
    r1: PropTypes.any.isRequired,
    r2: PropTypes.any.isRequired,
    created: PropTypes.any.isRequired,
};

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

export default function Action(props) {
    const classes = useStyles();
    const {
        postFunction,
        page_id,
        page_type,
        page_title,
        scenario_ID,
        version_ID,
        next_page_id,
        body,
        choice1,
        r1,
        choice2,
        r2,
        created,
    } = props;

    const [postValues, setPostValues] = useState({
        data: null,
        loading: true,
        error: null,
    });

    //const titleData = mockActionComponent.title;
    //const bodyData = mockActionComponent.body;
    const [title, setTitle] = useState(page_title);
    const [bodyText, setBodyText] = useState(body);
    const [option1, setOption1] = useState(choice1);
    const [option2, setOption2] = useState(choice2);
    const [result1, setResult1] = useState(r1);
    const [result2, setResult2] = useState(r2);

    var postReqBody = {
        PAGE: page_id,
        PAGE_TYPE: page_type,
        PAGE_TITLE: title,
        SCENARIO: scenario_ID,
        BODY: bodyText,
        NEXT_PAGE: next_page_id,
        CHOICES: [
            { CHOICE: option1, RESULT_PAGE: result1 },
            { CHOICE: option2, RESULT_PAGE: result2 },
        ],
    };

    useEffect(() => {
        if (created === true) {
            //created = false
            postFunction(setPostValues, postReqBody, scenario_ID);
            console.log(postValues);
        }
    }, []);

    const onChangeOption1 = (event) => {
        setOption1(event.target.value);
    };

    const onChangeOption2 = (event) => {
        setOption2(event.target.value);
    };

    const savePage = () => {
        postFunction(setPostValues, postReqBody, scenario_ID);
        console.log(postValues);
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
                        onClick={savePage}
                    >
                        Save
                    </Button>
                </form>
            </div>
        </Container>
    );
}
