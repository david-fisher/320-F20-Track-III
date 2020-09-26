import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
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
import ShareIcon from '@material-ui/icons/Share';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import AssessmentIcon from '@material-ui/icons/Assessment';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  scenarioContainer: {
    height: '100px',
    backgroundColor: theme.palette.primary.light,
    borderStyle: 'solid',
    borderColor: theme.palette.primary.light,
    border: 2,
  },
  buttonContainer: {
    borderStyle: 'solid',
    borderColor: theme.palette.primary.light,
    border: 3,
  },
  button: {
    borderStyle: 'solid',
    borderColor: theme.palette.primary.light,
    border: 3, 
  },
  buttonText: {
    width: '100%',
    textTransform: 'unset',
  },
  addNewScenarioContainer: {
    height: '227px',
    borderStyle: 'dashed',
    borderColor: theme.palette.primary.main,
    border: 3,
    borderRadius: 3,
    padding: 0,
  },
  addNewScenarioGrid: {
    marginTop:'40px',
  },
  addNewScenarioButton: {
    width: '100%',
    height: '100%',
    textTransform: 'unset',
  },
  addIcon: {
     color: theme.palette.primary.main, 
     fontSize: 70 
  },
  addNewScenarioText: {
    color: theme.palette.primary.main, 
  },
  copyright: {
    marginTop: theme.spacing(2),
  }
}));

export default function Dashboard() {
  //Passing props: https://stackoverflow.com/questions/30115324/pass-props-in-link-react-router
  const classes = useStyles();
  let sampleScenariosData = [
    { scenarioName: "Deep Fake Simulator", className: "Deep Analytics CS762", id: '1'},
    { scenarioName: "Machine Learning", className: "Machine Learning CS581", id: '2'},
    { scenarioName: "Machine Learning", className: "Machine Learning CS581", id: '3'},
    { scenarioName: "Machine Learning", className: "Machine Learning CS581", id: '4'},
    { scenarioName: "Deep Fake Simulator", className: "Deep Analytics CS762", id: '5'},
    { scenarioName: "Machine Learning", className: "Machine Learning CS581", id: '6'},
    { scenarioName: "Machine Learning", className: "Machine Learning CS581", id: '7'},
  ];

  let scenarios = sampleScenariosData.map(data => 
    <Grid 
      key={data.id}
      item 
      xs
    >
      <Card>
        <CardContent className={classes.scenarioContainer}>
          <Typography 
            variant="h6" 
            display="block" 
            noWrap
          >
            {data.scenarioName}
          </Typography>
          <Typography 
            variant="subtitle1" 
            color="textSecondary" 
            display="block" 
            noWrap
          >
            {data.className}
          </Typography>
        </CardContent>
          <Grid
            className={classes.buttonContainer}
            container
          >
          <Grid 
            className={classes.button}
            item 
            xs={6}
          >
              <Button 
                component={Link} to={{
                  pathname: "/editor/" + data.id, 
                  scenarioData: data, 
                }}
                className={classes.buttonText}
                variant="contained"
                color="primary"
              >
                <EditIcon />
                <Typography variant="subtitle1">
                  Edit
                </Typography>
              </Button>
            </Grid>
            <Grid 
              className={classes.button}
              item 
              xs={6} 
            >
              <Button 
                className={classes.buttonText}  
                variant="contained"
                color="primary"
              >
                <ShareIcon />
                <Typography 
                  variant="subtitle1" 
                  noWrap
                >
                  Share
                </Typography>
              </Button>
            </Grid>
            <Grid
              className={classes.button} 
              item 
              xs={6} 
            >
              <Button 
                className={classes.buttonText} 
                variant="contained"
                color="primary"
              >
                <DeleteForeverIcon />
                <Typography 
                  variant="subtitle1" 
                  noWrap
                >
                  Delete
                </Typography>
              </Button>
            </Grid>
            <Grid 
              className={classes.button}
              item 
              xs={6} 
            >
              <Button 
                component={Link} to={{
                  pathname: "/data/" + data.id, 
                  scenarioData: data, 
                }}
                className={classes.buttonText}
                variant="contained"
                color="primary"
              >
                <AssessmentIcon />
                <Typography 
                  variant="subtitle1" 
                  noWrap
                >
                  Data
                </Typography>
              </Button>
            </Grid>
          </Grid>
      </Card>
    </Grid>
  );

  //Add new scenario button
  scenarios.push(
    <Grid 
      key="createNewScenarioButton"
      item 
      xs
    >
      <Container 
        className={classes.addNewScenarioContainer} 
        fixed={true} 
      >
        <Button 
          className={classes.addNewScenarioButton} 
        >
          <Grid
            className={classes.addNewScenarioGrid}
            container
            direction="column"
            justify="center"
            alignItems="center"
          > 
            <Grid item>
              <AddIcon className={classes.addIcon}/>
            </Grid>
            <Grid item>
              <Typography 
                className={classes.addNewScenarioText} 
                variant="h6" 
                noWrap
              >
                Create New Simulation
              </Typography>
            </Grid>
          </Grid>
        </Button>
      </Container>
    </Grid>
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