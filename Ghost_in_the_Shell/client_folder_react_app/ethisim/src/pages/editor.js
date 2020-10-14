import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  List,
  Drawer,
  ListItem,
  ListItemText,
} from '@material-ui/core';
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

const singletonComponents = [
  {name: 'Logistics'},
  {name: 'Configure Attributes'},
  {name: 'Conversation Editor'}, 
]

export default function Editor(props) {
  const classes = useStyles();
  const { scenarioData } = props.location;
  const { name, className, authors, components } = scenarioData;
  const [ scenarioComponent, setScenarioComponent ] = useState(<Logistics name={name} className={className} authors={authors}/>);

  function Sidebar () {
    const classes = useStyles();

    const onClick = function(componentData) {
      const { name } = componentData;
      if(name === 'Logistics') {
        setScenarioComponent(<Logistics name={name} className={className} authors={authors}/>);
      } else if (name === 'Configure Attributes') {
        setScenarioComponent(<ConfigureAttributes />);
      } else if (name === 'Conversation Editor') {
        setScenarioComponent(<ConversationEditor />);
      } else if(name === 'Event') {
        setScenarioComponent(
          React.cloneElement(
            <Event />,
            {componentData: componentData}
          )
        );
      } else if (name === 'Reflection') {
        setScenarioComponent(
          React.cloneElement(
            <Reflection />,
            {componentData: componentData}
          )
        );
      } else if (name === 'Action') {
        setScenarioComponent(
          React.cloneElement(
            <Action />,
            {componentData: componentData}
          )
        );
      }
    };

    return(
      <Drawer
        className={classes.drawer}
        variant='permanent'
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor='left'
      >
        <List>
          {singletonComponents.map((componentData) => (
            <ListItem button key={componentData.name} onClick={() => onClick(componentData)}>
              <ListItemText primary={componentData.name} />
            </ListItem>
          ))}
          {components.map((componentData) => (
            <ListItem button key={componentData.name} onClick={() => onClick(componentData)}>
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
      </main>
    </div>
  );
}
