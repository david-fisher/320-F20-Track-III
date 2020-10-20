import React from 'react';
import Typography from '@material-ui/core/Typography';
import Introduction from '../Introduction';
import Title from '../Title';
import InformationItemList from './InformationItemList';
import Button from '@material-ui/core/Button';

export default function GenericComponent() {
    return (
        <div>
            <Typography align="center" variant="h2">
                Generic Component
            </Typography>
            <Title />
            <Introduction />
            <InformationItemList />
            <Button variant="contained" color="grey">
                Save Generic Component
            </Button>
            <Button variant="contained" color="primary">
                Delete Generic Component
            </Button>
        </div>
    );
}
