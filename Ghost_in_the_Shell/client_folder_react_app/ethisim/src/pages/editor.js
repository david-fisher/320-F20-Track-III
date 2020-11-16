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
import universalDelete from '../universalHTTPRequests/delete.js'
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



/*
FLOW
1) Edit button clicked (pass in scenario id)
ENTERS EDITOR PAGE with prop = scenario_ID
2) GET request containing
    JSON  Logistics &
    [{page_id:id,page_name:name},...]
3.1) index 0 of scenario compoennts will be : {id:0, page:scenario_ID, name:"Logistics ", component:<Logistics with JSON values>}
3.2) index 1 of scenario components will be : {id:1, page:scenario_ID, name:"Configure Issues", component:NULL}
3.3) index 2 of scenario compoennts will be : {id:2, page:scenario_ID, name:"FLOWCHART", component:NULL}
4) fill out scenarioComponents list with -> id:index, page:page_id, name:page_name, component:NULL
  filling out side nav bar is simply filling out scenarioComponets list as stated above.
  then extracting the name for each page.
5) fill out side nav bar

6) Once a button on the side nav is clicked:
  a) GET all information for page given 'page' from scenarioComponents
  b) Instantiate new X page component
  c) fill out component null with new page component
*/

/*
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
};*/

//Sidebar Components
var initialComponents = [
    { id: 0, title: 'Logistics', component: <Logistics/> },
    { id: 1, title: 'Configure Issues', component: <ConfigureIssues/> },
    { id: 2, title: 'Conversation Editor', component: <ConversationEditor/> },
];

function handlePost(setPostValues,postReqBody,s_id){
  const endpoint = "/pages?SCENARIO_ID=" + s_id
  function onSuccess(resp){

  }
  function onFailure(){
    console.log("Post failed")
  }
  universalPost(setPostValues,endpoint,null,null,postReqBody);
}

function handleDelete(setDeleteValues,d_id){
  const endpoint = "/page?page_id=" + d_id
  function onSuccess(resp){

  }
  function onFailure(){
    console.log("Delete failed")
  }
  universalDelete(setDeleteValues,endpoint,null,null,{PAGE_ID:d_id})
}

function handleGet(setGetValues,g_id){
  const endpoint = "/page?page_id=" + g_id
  function onSuccess(resp){

  }
  function onFailure(){
    console.log("Get failed")
  }
  universalFetch(setGetValues,endpoint,null,null,{PAGE_ID:g_id});
}


export default function Editor(props) {
    const classes = useStyles();
    const [openPopup, setOpenPopup] = useState(false);


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

    var page_names_and_ids = [
      {page_id: 1, page_name: "Introduction"},
      {page_id: 2, page_name: "Initial Action"},
      {page_id: 3, page_name: "Initial Reflection"},
    ]


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
            var p = null
            switch (componentType) {
                case 'Generic':
                    p = {postFunction: handlePost, page_id: 1,page_type: "G",
                    page_title: title,scenario_ID: 2, version_ID: 1, next_page_id: 2,
                    body: "BODYTEXTGENERIC",bodies: ["t1"],created: true}
                    c = <Generic {...p}></Generic>;
                    break;
                case 'Reflection':
                    p = {postFunction: handlePost, page_id: 1,page_type: "A",
                    page_title: title,scenario_ID: 2, version_ID: 1, next_page_id: 2,
                    body: "BODYTEXTREFLECTION",reflection_questionts: ["q1"],created: true}
                    c = <Reflection {...p}></Reflection>;
                    break;
                case 'Action':
                    p = {postFunction: handlePost, page_id: 1,page_type: "R",
                    page_title: title,scenario_ID: 2, version_ID: 1, next_page_id: 2,
                    body:"BODYTEXTACTION",choice1: "OPTION1",r1:4,choice2: "OPTION2",r2: 3,created: true}
                    c = <Action {...p} ></Action>;
                    break;
                default:
                    c = <Typography>Error</Typography>;
            }
            setScenarioComponents(
                scenarioComponents.concat({ id, title, component: c })
            );
        };


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
                        onClick={addNewPage}
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
