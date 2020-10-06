import React from 'react';
import Typography from '@material-ui/core/Typography';
import Introduction from '../Introduction';
import Title from '../Title';

export default function MiddleReflection() {
  return (
    <div>
      <Typography align="center" variant="h2">
        Reflection Component
      </Typography>
      <Title />
      <Introduction />
    </div>
  );
}
