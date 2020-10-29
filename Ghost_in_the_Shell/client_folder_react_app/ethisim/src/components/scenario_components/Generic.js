import React, { useState } from 'react';
import Body from '../Body';
import Title from '../Title';
import { Typography, Container } from '@material-ui/core';
import VersionControl from '../VersionControl';
import InformationItemList from './InformationItemList';
import { mockGenericHistory } from '../../shared/mockScenarioData';

export default function Generic(props) {
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
        </Container>
    );
}
