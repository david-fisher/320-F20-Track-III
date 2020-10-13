import React, { useState } from 'react';
import Introduction from '../Introduction';
import Title from '../Title';
import {
  Typography,
  Container,
} from '@material-ui/core';
import VersionControl from '../VersionControl';

export default function Event(props) {

  const { componentData } = props;
  const titleData = componentData.title;
  const introductionData = componentData.introduction;
  const [ title, setTitle ] = useState(titleData);
  const [ introduction, setIntroduction ] = useState(introductionData);

  return (
    <Container component="main">
      <Typography align="center" variant="h2">
        Event Component
      </Typography>
      <VersionControl 
        history={componentData.history} 
        setTitle={setTitle}
        setIntroduction={setIntroduction}
      />
      <Title title={title} setTitle={setTitle} />
      <Introduction 
        introduction={introduction} 
      />
    </Container>
  );
}
