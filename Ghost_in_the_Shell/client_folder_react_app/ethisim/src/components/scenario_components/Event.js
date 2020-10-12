import React from 'react';
import Typography from '@material-ui/core/Typography';
import Introduction from '../Introduction';
import Title from '../Title';
import GenericComponentList from './GenericComponentList';

export default function Event() {
  return (
    <div>
      <Typography align="center" variant="h2">
        Event Component
      </Typography>
      <Title />
      <Introduction />
      <GenericComponentList />
    </div>
  );
}
