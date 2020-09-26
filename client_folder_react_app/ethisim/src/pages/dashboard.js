import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
} from '@material-ui/core';
import Copyright from '../components/copyright';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ShareIcon from '@material-ui/icons/Share';
import AssessmentIcon from '@material-ui/icons/Assessment';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  scenarioContainer: {
    height: '100px',
    borderStyle: 'solid',
    border: 2,
    borderColor: '#F7E7E7',
    borderRadius: 3,
    backgroundColor:'#F7E7E7',
  },
  viewDataContainer: {
    display:'flex',
    justifyContent: 'center',
    alignItems:'center',
    textAlign:'center',
    color: 'white',
    backgroundColor:  '#881c1c',
    borderStyle: 'solid',
    border: 2,
    borderColor: '#F7E7E7',
    borderRadius: 3,
  },
  addNewScenarioContainer: {
    display:'flex',
    justifyContent: 'center',
    alignItems:'center',
    height: '227px',
    borderStyle: 'dashed',
    border: 3,
    borderColor: '#881c1c',
    borderRadius: 3,
  },
  button: {
    borderStyle: 'solid',
    border: 3,
    borderColor: 'white',
    color: 'white', 
  },
  buttonText: {
    textTransform: 'unset',
    color: 'white',
  },
  copyright: {
    marginTop: theme.spacing(2),
  }
}));

export default function Dashboard() {
  const classes = useStyles();
  let sampleScenariosData = [
    { scenarioName: "Deep Fake Simulator", className: "Deep Analytics CS762"},
    { scenarioName: "Machine Learning", className: "Machine Learning CS581"},
    { scenarioName: "Machine Learning", className: "Machine Learning CS581"},
    { scenarioName: "Machine Learning", className: "Machine Learning CS581"},
    { scenarioName: "Deep Fake Simulator", className: "Deep Analytics CS762"},
    { scenarioName: "Machine Learning", className: "Machine Learning CS581"},
    { scenarioName: "Machine Learning", className: "Machine Learning CS581"},
  ];

  let scenarios = sampleScenariosData.map(data => 
    <Grid item xs>
      <Card>
        <CardContent className={classes.scenarioContainer}>
          <Typography variant="h6" display="block" noWrap>
            {data.scenarioName}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" display="block" noWrap>
            {data.className}
          </Typography>
        </CardContent>
          <Grid
            container
            className={classes.viewDataContainer}
          >
          <Grid item xs={6} className={classes.button}>
              <Button size="small" className={classes.buttonText}>
                <EditIcon />
                <Typography variant="subtitle1">
                {' '}Edit
                </Typography>
              </Button>
            </Grid>
            <Grid item xs={6} className={classes.button}>
              <Button size="small" className={classes.buttonText}>
                <ShareIcon />
                <Typography variant="subtitle1" display="block" noWrap>
                {' '}Share
                </Typography>
              </Button>
            </Grid>
            <Grid item xs={6} className={classes.button}>
              <Button size="small" className={classes.buttonText}>
                <DeleteForeverIcon />
                <Typography variant="subtitle1" display="block" noWrap>
                {' '}Delete
                </Typography>
              </Button>
            </Grid>
            <Grid item xs={6} className={classes.button}>
              <Button size="small" className={classes.buttonText}>
                <AssessmentIcon />
                <Typography variant="subtitle1" display="block" noWrap>
                   View Data
                </Typography>
              </Button>
            </Grid>
          </Grid>
      </Card>
    </Grid>
  );

  //Add new scenario button
  scenarios.push(
    <Grid item xs>
      <Container className={classes.addNewScenarioContainer} fixed="true" maxWidth="xs">
        <Typography variant="h6" display="block" noWrap>
          Create New Simulation
        </Typography>
      </Container>
    </Grid>
  );

  //TODO add in Ethisim Logo at top of page
  return (
    <Container className={classes.container} component="main" maxWidth="lg">
      <Typography variant="h4">
        Current Scenarios
      </Typography>
      <Grid
        container
        spacing={2}
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        {scenarios}
      </Grid>
      <Box className={classes.copyright}>
        <Copyright />
      </Box>
    </Container>
  );
}