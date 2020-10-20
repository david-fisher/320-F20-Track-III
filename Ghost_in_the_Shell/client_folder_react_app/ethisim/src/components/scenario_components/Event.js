import React from 'react';
import Typography from '@material-ui/core/Typography';
import Introduction from '../Introduction';
import Title from '../Title';
import InformationItemList from './InformationItemList';

export default function Event() {
    return (
        <div>
            <Typography align="center" variant="h2">
        Event Component
      </Typography>
      <Title />
      <Introduction />
      <InformationItemList />
    </div>
  );
}
