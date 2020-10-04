import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
  List,
  Drawer,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import Copyright from '../components/Copyright';
import Logistics from '../components/scenario_components/Logistics';
import Event from '../components/scenario_components/Event';
import ConfigureAttributes from '../components/scenario_components/ConfigureAttributes';
import ConversationEditor from '../components/scenario_components/ConversationEditor';
import Reflection from '../components/scenario_components/Reflection';
import Action from '../components/scenario_components/Action';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  container: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
  },
  copyright: {
    margin: theme.spacing(2),
    opacity: 0.5,
  },
}));

  //Sidebar Components
  const scenarioComponents = [
    {name: "Logistics", component: <Logistics />},
    {name: "Configure Attributes", component: <ConfigureAttributes />},
    {name: "Conversation Editor", component: <ConversationEditor />},
    {name: "Event", component: <Event />},
    {name: "Reflection", component: <Reflection />},
    {name: "Action", component: <Action />},
  ];

export default function Editor(props) {
  const classes = useStyles();
  const [scenarioComponent, setScenarioComponent] = useState(<Logistics />);

  function Sidebar () {
    const classes = useStyles();
    
    const onClick = function(component) {
      setScenarioComponent(component);
    };
  
    return(
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <List>
          {scenarioComponents.map((componentData) => (
            <ListItem button key={componentData.name} onClick={() => onClick(componentData.component)}>
              <ListItemText primary={componentData.name} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    )
  }

  return (
    <div className={classes.root}>
      <Sidebar />
      <main className={classes.content}>
        {scenarioComponent}
        <Copyright />
      </main>
    </div>
  );
}
