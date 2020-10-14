import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Container,
  Box,
  Typography,
  Grid,
} from '@material-ui/core';
import ScenarioCard from '../components/ScenarioCard';
import AddNewScenarioCard from '../components/AddNewScenarioCard';
import Copyright from '../components/Copyright';
import { mockUnfinishedScenarioData, mockFinishedScenarioData } from '../shared/mockScenarioData';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  copyright: {
    margin: theme.spacing(2),
  }
}));

//Placeholder data
const sampleScenariosData = [
  mockUnfinishedScenarioData,
  mockFinishedScenarioData,
];

//Passing props with React Router in Material UI: https://stackoverflow.com/questions/30115324/pass-props-in-link-react-router
export default function Dashboard() {
  const classes = useStyles();

  //TODO change when Scenario Objects are defined
  let scenarios = sampleScenariosData.map(data => 
    <ScenarioCard data={data} key={data.id}/>
  );

  return (
    <Container 
      className={classes.container} 
      component="main" 
      maxWidth="lg"
    >
      <Typography variant="h4">
        Scenarios
      </Typography>
      <Grid
        container
        spacing={2}
        direction="row"
        justify="flex-start"
        alignItems="stretch"
      >
        {scenarios}
        <AddNewScenarioCard />
      </Grid>
      <Box className={classes.copyright}>
        <Copyright />
      </Box>
    </Container>
  );
}
