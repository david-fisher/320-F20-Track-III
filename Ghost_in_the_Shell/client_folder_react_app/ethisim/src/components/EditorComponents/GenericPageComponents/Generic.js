import React, { useState } from 'react';
import Body from '../GeneralPageComponents/Body';
import Title from '../GeneralPageComponents/Title';
import { Typography, Container, Button } from '@material-ui/core';
import VersionControl from '../../VersionControl';
import InformationItemList from './InformationItemList';
import { mockGenericHistory } from '../../../shared/mockScenarioData';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    saveButton: {
        margin: theme.spacing(2),
        float: 'right',
        textTransform: 'unset',
    },
}));

export default function Generic(props) {
    const classes = useStyles();
    //const titleData = mockGenericComponent.title;
    //const bodyData = mockGenericComponent.body;
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    return (
        <Container component="main">
            <Typography align="center" variant="h2">
                Generic Component
            </Typography>
            <VersionControl
                history={mockGenericHistory.history}
                type={mockGenericHistory.type}
                setTitle={setTitle}
                setBody={setBody}
            />
            <Title title={title} setTitle={setTitle} />
            <Body body={body} />
            <InformationItemList />
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
