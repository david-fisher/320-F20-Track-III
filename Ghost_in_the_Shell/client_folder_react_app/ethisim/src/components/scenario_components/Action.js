import React from 'react';
import Typography from '@material-ui/core/Typography';
import Introduction from '../Introduction';
import Title from '../Title';

export default function FinalAction() {
  return (
    <div>
      <Typography align="center" variant="h2">
        Action Component
      </Typography>
      <Title />
      <Introduction />
    </div>
  );
}
