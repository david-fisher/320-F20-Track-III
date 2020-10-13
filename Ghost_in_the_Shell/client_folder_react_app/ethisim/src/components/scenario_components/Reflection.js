import React, { useState } from 'react';
import {
  Typography,
  Container,
} from '@material-ui/core';
import Introduction from '../Introduction';
import Title from '../Title';
import VersionControl from '../VersionControl';

export default function Reflection(props) {

  const { componentData } = props;
  const titleData = componentData.title;
  const introductionData = componentData.introduction;
  const [ title, setTitle ] = useState(titleData);
  const [ introduction, setIntroduction ] = useState(introductionData);

  return (
    <Container component="main">
      <Typography align="center" variant="h2">
        Reflection Component
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
