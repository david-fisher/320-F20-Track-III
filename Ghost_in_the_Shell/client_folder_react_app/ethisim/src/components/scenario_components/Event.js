import React, { useState } from 'react';
import Body from '../Body';
import Title from '../Title';
import {
  Typography,
  Container,
} from '@material-ui/core';
import VersionControl from '../VersionControl';
import InformationItemList from './InformationItemList';

export default function Event(props) {

  const { componentData } = props;
  const titleData = componentData.title;
  const introductionData = componentData.introduction;
  const [ title, setTitle ] = useState(titleData);
  const [ body, setBody ] = useState(introductionData);

  return (
    <Container component="main">
      <Typography align="center" variant="h2">
        Event Component
      </Typography>
      <VersionControl 
              history={componentData.history} 
              setTitle={setTitle}
              setIntroduction={setBody}
            />
      <Title title={title} />
      <Body body={body} />
      <InformationItemList />
    </Container>
  );
}
