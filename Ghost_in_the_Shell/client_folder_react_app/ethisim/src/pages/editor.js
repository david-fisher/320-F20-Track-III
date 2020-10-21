import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  List,
  Drawer,
  ListItem,
  ListItemText,
  Button,
  Typography,
} from '@material-ui/core';
import Logistics from '../components/scenario_components/Logistics';
import Event from '../components/scenario_components/Event';
import ConfigureAttributes from '../components/scenario_components/ConfigureAttributes';
import ConversationEditor from '../components/scenario_components/ConversationEditor';
import Reflection from '../components/scenario_components/Reflection';
import Action from '../components/scenario_components/Action';
import AddNewSimulationScenarioPageDialog from "../components/AddNewSimulationScenarioPageDialog"
import Copyright from "../components/Copyright"
import AddNewScenarioPageDialogBody from "../components/AddNewScenarioPageDialogBody"
import NavSideBarList from "../components/NavSideBarList"
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
  addPageButton:{
    width: "75px",
    height: "25px",
    float: "right",
    margin: theme.spacing(2),

  }
}));

  //Sidebar Components
  var startList = [
    {id: 0 ,name: "Logistics", component: <Logistics />},
    {id: 1, name: "Configure Attributes", component: <ConfigureAttributes />},
    {id: 2, name: "Conversation Editor", component: <ConversationEditor />},
    {id: 3, name: "Event", component: <Event />},
    {id: 4, name: "Reflection", component: <Reflection />},
    {id: 5, name: "Action", component: <Action />},
  ];

export default function Editor(props) {
  const classes = useStyles();
  const [scenarioComponent,setScenarioComponent] = useState(<Logistics/>)
  const [openPopup, setOpenPopup] = useState(false)
  const [scenarioComponents,setScenarioComponents] = useState(startList)
  const deleteByID = (d_id) =>{
      console.log("we are currently deleteing:")
      console.log(d_id)

      setScenarioComponents(scenarioComponents.filter(i => i.id !== d_id));
  }

  function Sidebar () {
    const classes = useStyles();

    const onClick = function(component) {
      console.log(component)
      setScenarioComponent(component);
    };

    const addPage = (newId,newName,componentType) =>{
        console.log("componet type: ")
        console.log(componentType)
        var c = null;
        switch(componentType){
          case "Event":
            c = <Event/>
            break;
          case "Conversation":
            c = <ConversationEditor/>
            break;
          case "Reflection":
            c= <Reflection/>
            break;
          case "Action":
            c= <Action/>
            break;
          default:
            c= <Typography>Error</Typography>

        }

        scenarioComponents.push({id: newId, name: newName, component: c})
    }

    function handleAddNewComponent(){

      setOpenPopup(true)

    }

    return(
      <div>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
      <NavSideBarList onClick={onClick} deleteByID={deleteByID} scenarioPages={scenarioComponents}></NavSideBarList>

        <Button variant="contained" onClick={handleAddNewComponent}
          className={classes.addPageButton}>addPage</Button>
      </Drawer>
      <AddNewSimulationScenarioPageDialog openPopup = {openPopup}
                                      title="Add New Page"
                                      setOpenPopup={setOpenPopup}
                                      addPage={addPage}> </AddNewSimulationScenarioPageDialog>

     </div>
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
