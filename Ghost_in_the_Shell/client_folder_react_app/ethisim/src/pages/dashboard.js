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
  { scenarioName: "Scenario 1", className: "CS1", id: '1', finished: false},
  { scenarioName: "Scenario 2", className: "CS2", id: '2', finished: false},
  { scenarioName: "Scenario 3", className: "CS3", id: '3', finished: false},
  { scenarioName: "Scenario 4", className: "CS4", id: '4', finished: true},
  { scenarioName: "Scenario 5", className: "CS5", id: '5', finished: true},
  { scenarioName: "Scenario 6", className: "CS6", id: '6', finished: true},
  { scenarioName: "Scenario 7", className: "CS7", id: '7', finished: true},
];

//Passing props with React Router in Material UI: https://stackoverflow.com/questions/30115324/pass-props-in-link-react-router
export default function Dashboard() {
  const classes = useStyles();

  //TODO change when Scenario Objects are defined
  let finishedScenarios = sampleScenariosData.filter(data => data.finished);
  let unfinishedScenarios = sampleScenariosData.filter(data => !data.finished);

  finishedScenarios = finishedScenarios.map(data => 
    <ScenarioCard data={data} key={data.id} finished={data.finished}/>
  );

  unfinishedScenarios = unfinishedScenarios.map(data => 
    <ScenarioCard data={data} key={data.id} finished={data.finished}/>
  );

  return (
    <Container 
      className={classes.container} 
      component="main" 
      maxWidth="lg"
    >
      <Typography variant="h4">
        Unfinished Scenarios
      </Typography>
      <Grid
        container
        spacing={2}
        direction="row"
        justify="flex-start"
        alignItems="stretch"
      >
        {unfinishedScenarios}
        <AddNewScenarioCard />
      </Grid>
      <Typography variant="h4">
        Finished Scenarios
      </Typography>
      <Grid
        container
        spacing={2}
        direction="row"
        justify="flex-start"
        alignItems="stretch"
      >
        {finishedScenarios}
      </Grid>
      <Box className={classes.copyright}>
        <Copyright />
      </Box>
    </Container>
  );
}
