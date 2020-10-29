import React from 'react';
import Body from '../GeneralPageComponents/Body';
import Title from '../GeneralPageComponents/Title';
import InformationItemList from './InformationItemList';
import { Typography, Container } from '@material-ui/core';

export default function Event() {
    return (
        <Container component="main">
            <Typography align="center" variant="h2">
                Event Component
            </Typography>
            <Title />
            <Body />
            <InformationItemList />
        </Container>
    );
}
