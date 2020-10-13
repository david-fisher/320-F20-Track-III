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

  //Mock Version History 
  const mockEventHistory =
  [
    {
      component: 'Event',
      title: 'Marius Minea Version Control Introduction',
      introduction: '<p><span style="font-size: 28px;"><em><u><strong>VERSION CONTROL WORKS #1</strong></u></em></span><em></em><br></p>',
      date: new Date().getTime(),
      author: 'Marius Minea',
      id: 1,
    },
    {
      component: 'Event',
      title: 'David Fisher Version Control Introduction',
      introduction: '<p><span style="font-size: 28px;"><em><u><strong>VERSION CONTROL WORKS #2</strong></u></em></span><em></em><br></p>',
      date: new Date().getTime() - 300000,
      author: 'David Fisher',
      id: 2,
    },
    {
      component: 'Event',
      title: 'Marius Minea Version Control Introduction',
      introduction: '<p><span style="font-size: 28px;"><em><u><strong>VERSION CONTROL WORKS #1</strong></u></em></span><em></em><br></p>',
      date: new Date().getTime() - 400000,
      author: 'Marius Minea',
      id: 3,
    },
    {
      component: 'Event',
      title: 'David Fisher Version Control Introduction',
      introduction: '<p><span style="font-size: 28px;"><em><u><strong>VERSION CONTROL WORKS #2</strong></u></em></span><em></em><br></p>',
      date: new Date().getTime() - 500000,
      author: 'David Fisher',
      id: 4,
    },
    {
      component: 'Event',
      title: 'Marius Minea Version Control Introduction',
      introduction: '<p><span style="font-size: 28px;"><em><u><strong>VERSION CONTROL WORKS #1</strong></u></em></span><em></em><br></p>',
      date: new Date().getTime() - 600000,
      author: 'Marius Minea',
      id: 5,
    },
    {
      component: 'Event',
      title: 'David Fisher Version Control Introduction',
      introduction: '<p><span style="font-size: 28px;"><em><u><strong>VERSION CONTROL WORKS #2</strong></u></em></span><em></em><br></p>',
      date: new Date().getTime() - 700000,
      author: 'David Fisher',
      id: 6,
    },
    {
      component: 'Event',
      title: 'Marius Minea Version Control Introduction',
      introduction: '<p><span style="font-size: 28px;"><em><u><strong>VERSION CONTROL WORKS #1</strong></u></em></span><em></em><br></p>',
      date: new Date().getTime() - 800000,
      author: 'Marius Minea',
      id: 7,
    },
    {
      component: 'Event',
      title: 'David Fisher Version Control Introduction',
      introduction: '<p><span style="font-size: 28px;"><em><u><strong>VERSION CONTROL WORKS #2</strong></u></em></span><em></em><br></p>',
      date: new Date().getTime() - 900000,
      author: 'David Fisher',
      id: 8,
    },
  ]

  const mockReflectionHistory = 
  [
    {
      component: 'Event',
      title: 'David Barrington Version Control Introduction',
      introduction: '<p><span style="font-size: 28px;"><em><u><strong>VERSION CONTROL WORKS #1</strong></u></em></span><em></em><br></p>',
      date: new Date().getTime(),
      author: 'David Barrington',
      id: 1,
    },
    {
      component: 'Event',
      title: 'David Fisher Version Control Introduction',
      introduction: '<p><span style="font-size: 28px;"><em><u><strong>VERSION CONTROL WORKS #2</strong></u></em></span><em></em><br></p>',
      date: new Date().getTime() - 2000000,
      author: 'David Fisher',
      id: 2,
    },
  ]

  const mockActionHistory =  
  [
    {
      component: 'Event',
      title: 'David Fisher Version Control Introduction',
      introduction: '<p><span style="font-size: 28px;"><em><u><strong>VERSION CONTROL WORKS #1</strong></u></em></span><em></em><br></p>',
      date: new Date().getTime(),
      author: 'David Fisher',
      id: 1,
    },
    {
      component: 'Event',
      title: 'Gordan Anderson Version Control Introduction',
      introduction: '<p><span style="font-size: 28px;"><em><u><strong>VERSION CONTROL WORKS #2</strong></u></em></span><em></em><br></p>',
      date: new Date().getTime() - 1000000,
      author: 'Gordan Anderson',
      id: 2,
    },
  ]

  //Sidebar Components
  const scenarioComponents = [
    {name: 'Logistics'},
    {name: 'Configure Attributes'},
    {name: 'Conversation Editor'},
    {name: 'Event', history: mockEventHistory, title: 'Sample Title for Event Component', introduction: 'Sample Introduction for Event Component'},
    {name: 'Reflection', history: mockReflectionHistory, title: 'Sample Title for Reflection Component', introduction: 'Sample Introduction for Reflection Component'},
    {name: 'Action', history: mockActionHistory, title: 'Sample Title for action Component', introduction: 'Sample Introduction for Action Component'},
  ];

export default function Editor(props) {
  const classes = useStyles();
  const [scenarioComponent, setScenarioComponent] = useState(<Logistics />);

  function Sidebar () {
    const classes = useStyles();

    const onClick = function(componentData) {
      const { name } = componentData;
      if(name === 'Logistics') {
        setScenarioComponent(<Logistics />);
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
          {scenarioComponents.map((componentData) => (
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
