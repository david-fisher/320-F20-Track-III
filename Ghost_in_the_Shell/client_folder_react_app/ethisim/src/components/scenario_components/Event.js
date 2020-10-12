import React, { useState } from 'react';
import Introduction from '../Introduction';
import Title from '../Title';
import {
  Typography,
} from '@material-ui/core';
import VersionControl from '../VersionControl';

export default function Event(props) {

  const { componentData } = props;
  const titleData = componentData.title;
  const introductionData = componentData.introduction;
  const [ title, setTitle ] = useState(titleData);
  const [ introduction, setIntroduction ] = useState(introductionData);

  return (
    <div>
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
    </div>
  );
}
