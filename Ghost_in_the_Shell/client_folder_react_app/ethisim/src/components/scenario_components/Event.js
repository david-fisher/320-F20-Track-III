import React from 'react';
import Body from '../Body';
import Title from '../Title';
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
