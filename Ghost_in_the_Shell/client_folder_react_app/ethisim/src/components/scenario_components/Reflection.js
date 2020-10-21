import React from 'react';
import Body from '../Body';
import Title from '../Title';
import {
  Typography,
  Container,
} from '@material-ui/core';

export default function Reflection() {
  return (
    <Container component="main">
      <Typography align="center" variant="h2">
        Reflection Component
      </Typography>
      <Title />
      <Body />
    </Container>
  );
}
