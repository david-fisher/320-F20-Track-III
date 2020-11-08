import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer, Button, Typography } from '@material-ui/core';
import Logistics from '../components/EditorComponents/LogisticsPageComponents/Logistics';
import Generic from '../components/EditorComponents/GenericPageComponents/Generic';
import ConfigureIssues from '../components/EditorComponents/ConfigureIssuesComponents/ConfigureIssues';
import ConversationEditor from '../components/EditorComponents/ConversationEditorComponents/ConversationEditor';
import Reflection from '../components/EditorComponents/ReflectionPageComponents/Reflection';
import Action from '../components/EditorComponents/ActionPageComponents/Action';
import AddNewSimulationScenarioPageDialog from '../components//EditorComponents/AddNewSimulationScenarioPageDialog';
import NavSideBarList from '../components/ConfigurationSideBarComponents/NavSideBarList';
import AddIcon from '@material-ui/icons/Add';
import { mockUnfinishedScenarioData } from '../shared/mockScenarioData';

import universalPost from '../universalHTTPRequests/post.js'
import universalFetch from '../universalHTTPRequests/get.js'
//  setResponse, endpoint, onError, onSuccess, requestBody

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
    addPageButton: {
        margin: theme.spacing(2),
        textTransform: 'unset',
        border: 'solid 3px',
        borderColor: theme.palette.primary.light,
    },
}));

const addPage = (array, id, title, componentType, scenarioData) => {
    var c = null;
    switch (componentType) {
        case 'Logistics':
            c = <Logistics data={scenarioData} />;
            break;
        case 'Configure Issues':
            c = <ConfigureIssues />;
            break;
        case 'Conversation Editor':
            c = <ConversationEditor />;
            break;
        case 'Generic':
            c = <Generic />;
            break;
        case 'Reflection':
            c = <Reflection />;
            break;
        case 'Action':
            c = <Action />;
            break;
        default:
            c = <Typography>Error</Typography>;
    }
    universalPost()
    return array.concat({ id, title, component: c });
};

//Sidebar Components
var startList = [
    { id: 0, title: 'Logistics', type: 'Logistics' },
    { id: 1, title: 'Configure Issues', type: 'Configure Issues' },
    { id: 2, title: 'Conversation Editor', type: 'Conversation Editor' },
];

function handlePost(setPostValues,postReqBody){
  const endpoint = "/pages?SCENARIO_ID"
  function onSuccess(resp){

  }
  function onFailure(){
    console.log("Post failed")
  }

}

function handleDelete(setDeleteValues,d_id){
  const endpoint = ""
  function onSuccess(resp){

  }
  function onFailure(){
    console.log("Delete failed")
  }
}

function handleGet(setGetValues){
  const endpoint = "/pages?PAGES_ID"
  function onSuccess(resp){

  }
  function onFailure(){
    console.log("Get failed")
  }
}

export default function Editor(props) {
    const classes = useStyles();
    const [openPopup, setOpenPopup] = useState(false);
    const [postValues,setPostValues] = useState({
      data: null,
      loading: true,
      error: null,
    })
    const [getValues,setGetValues] = useState({
      data: null,
      loading: true,
      error: null,
    })
    const [deleteValues,setDeleteValues]= useState({
      data: null,
      loading: true,
      error: null,
    })

    //Fake fetch of scenarioData with components
    let fetchedComponents = mockUnfinishedScenarioData.components;
    let combinedComponents = startList.concat(fetchedComponents);
    let initialComponents = combinedComponents.reduce(
        (result, currentValue) => {
            return addPage(
                result,
                currentValue.id,
                currentValue.title,
                currentValue.type,
                mockUnfinishedScenarioData
            );
        },
        []
    );
    const [scenarioComponents, setScenarioComponents] = useState(
        initialComponents
    );
    const [scenarioComponent, setScenarioComponent] = useState(
        scenarioComponents[0].component
    );
    const deleteByID = (d_id) => {
        setScenarioComponents(scenarioComponents.filter((i) => i.id !== d_id));
        handleDelete(setDeleteValues,d_id);
    };

    function Sidebar() {
        const classes = useStyles();

        const onClick = function (component) {
            setScenarioComponent(component);
        };

        const addNewPage = (id, title, componentType) => {
            var c = null;
            switch (componentType) {
                case 'Generic':
                    c = <Generic {handlePost,handleGet,1,"G","Generic",title,2,1,2,"BODYTEXTGENERIC",["t1","t2"]}></Generic>;
                    break;
                case 'Reflection':
                    c = <Reflection {handlePost,handleGet,1,"R","Reflection",title,2,1,2,"BODYTEXTREFLECTION",["q1?","q2?"]}></Reflection>;
                    break;
                case 'Action':
                    c = <Action {handlePost,handleGet,1,"G","Generic",title,2,1,2,"BODYTEXTACTION","OPTION1",4,"OPTION2",3}></Action>;
                    break;
                default:
                    c = <Typography>Error</Typography>;
            }
            setScenarioComponents(
                scenarioComponents.concat({ id, title, component: c })
            );
        };

        function handleAddNewComponent() {
            setOpenPopup(true);
        }

        return (
            <div>
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    anchor="left"
                >
                    <NavSideBarList
                        onClick={onClick}
                        deleteByID={deleteByID}
                        scenarioPages={scenarioComponents}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAddNewComponent}
                        className={classes.addPageButton}
                    >
                        <AddIcon />
                        Add Page
                    </Button>
                </Drawer>
                <AddNewSimulationScenarioPageDialog
                    openPopup={openPopup}
                    title="Add New Page"
                    setOpenPopup={setOpenPopup}
                    addPage={addNewPage}
                ></AddNewSimulationScenarioPageDialog>
            </div>
        );
    }

    return (
        <div className={classes.root}>
            <Sidebar />
            <main className={classes.content}>{scenarioComponent}</main>
        </div>
    );
}
