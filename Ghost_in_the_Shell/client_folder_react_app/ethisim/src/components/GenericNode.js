import React from 'react';
import Typography from '@material-ui/core/Typography';
import Introduction from './Introduction';
import Title from './Title';
import ResponseList from './ResponseList';

export default function GenericNode() {
  return (
    <div>
      <Typography align="center" variant="h2">
        Generic Component
      </Typography>
      <Title />
      <Introduction />
      <ResponseList />
    </div>
  );
}
