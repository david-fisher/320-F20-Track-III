import React, { useState, useEffect } from 'react';
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


function sleep(ms){
  const date= Date.now();
  let currD =null;
  do{
    currD = Date.now()
  }while(currD - date < ms);
}
//Sidebar Components
var initialComponents = [
    { id: -1, title: 'Logistics', component: <Logistics/>},
    { id: -2, title: 'Configure Issues', component: <ConfigureIssues/> },
    { id: -3, title: 'Conversation Editor', component: <ConversationEditor/> },
];

function handlePost(setPostValues,postReqBody,s_id){
  const endpoint = "/page?scenario_id=" + s_id
  function onSuccess(resp){

  }
  function onFailure(){
    console.log("Post failed")
  }
  universalPost(setPostValues,endpoint,null,null,postReqBody);
}



export default function Editor(props) {

    function handleLogisticsGet(setGetValues,s_ID){
      const endpoint = "/logistics?scenario_id=" + s_ID
      function onSuccess(resp){
        console.log("succeeded to get logistics info")
        var p = null
        var c = null
        setShouldFetch(shouldFetch+1);
        var logitics_and_pages = resp.data
        p = {postFunction: handlePost, scenario_ID: logitics_and_pages.SCENARIO,
        version_ID: logitics_and_pages.VERSION,title: logitics_and_pages.NAME,
        is_finished: logitics_and_pages.IS_FINISHED,public_scenario:logitics_and_pages.PUBLIC,
        num_convos:logitics_and_pages.NUM_CONVERSATION,
        professors:[logitics_and_pages.PROFESSOR],courses:logitics_and_pages.COURSES}
        c = <Logistics {...p}></Logistics>
        initialComponents[0].component = c

        var pages = logitics_and_pages.PAGES
        console.log("PAGES:::::::::::")
        console.log(pages)
        for(let i = 0; i < pages.length;i++){
          initialComponents.push({id:pages[i].PAGE,title:pages[i].PAGE_TITLE,component:null})

        }
        setScenarioComponents(initialComponents)
        console.log("SCENARIO COMP:::::::::::")
        console.log(scenarioComponents)
        setScenarioComponent(initialComponents[0].component)
        setShowEditor(true)
      }
      function onFailure(){
        console.log("failed to get logistics info")
      }
      universalFetch(setGetValues,endpoint,onFailure,onSuccess,{SCENARIO:s_ID});
    }

    function handleDelete(setDeleteValues,d_id){
      const endpoint = "/page?page_id=" + d_id
      function onSuccess(resp){
        console.log("response delete data is successful ")
        setShouldFetch(shouldFetch + 1);
      }
      function onFailure(){
        console.log("Delete failed")
      }
      universalDelete(setDeleteValues,endpoint,null,null,{PAGE:d_id})
    }

    function handlePageGet(setGetValues,g_id){
      const endpoint = "/page?page_id=" + g_id
      function onSuccess(resp){
        var p = null
        var c = null
        console.log("response get data is successful ")
        setShouldFetch(shouldFetch + 1);
        if(resp.data !== null){


          var currPageInfo = resp.data
          console.log("weawreat")
          //sleep(10000)
          console.log(currPageInfo)
          console.log("demostrated page body")
          if (currPageInfo.PAGE_TYPE === "I"){
            currPageInfo.PAGE_TYPE = "G"
          }
          if(currPageInfo.PAGE_TYPE === "G"){
            p = {postFunction: handlePost, page_id: currPageInfo.PAGE,page_type: currPageInfo.PAGE_TYPE,
            page_title: currPageInfo.PAGE_TITLE,scenario_ID: currPageInfo.SCENARIO,
            version_ID: currPageInfo.NEXT_PAGE, next_page_id: currPageInfo.NEXT_PAGE,
            body: currPageInfo.PAGE_BODY,bodies: currPageInfo.BODIES,created: false}
            c = <Generic {...p}></Generic>;

          }
          else if(currPageInfo.PAGE_TYPE === "A"){
            p = {postFunction: handlePost, page_id: currPageInfo.PAGE,page_type: currPageInfo.PAGE_TYPE,
            page_title: currPageInfo.PAGE_TITLE,scenario_ID: currPageInfo.SCENARIO,
            next_page_id: currPageInfo.NEXT_PAGE,
            body: currPageInfo.PAGE_BODY,choice1:currPageInfo.CHOICES[0].CHOICE,
            r1:currPageInfo.CHOICES[0].RESULT_PAGE,choice2:currPageInfo.CHOICES[1].CHOICE,
            r2:currPageInfo.CHOICES[1].RESULT_PAGE,created: false}
            c = <Action {...p}></Action>;
          }
          else if(currPageInfo.PAGE_TYPE === "R"){
            p = {postFunction: handlePost, page_id: currPageInfo.PAGE,page_type: currPageInfo.PAGE_TYPE,
            page_title: currPageInfo.PAGE_TITLE,scenario_ID: currPageInfo.SCENARIO,
            version_ID: currPageInfo.NEXT_PAGE, next_page_id: currPageInfo.NEXT_PAGE,
            body: currPageInfo.PAGE_BODY,reflection_questions:currPageInfo.REFLECTION_QUESTIONS,created: false}
            c = <Reflection {...p}></Reflection>;
          }
      }
      let newScenarioComponents = [...scenarioComponents]
      newScenarioComponents.find(x => x.id === g_id).component = c

      setScenarioComponents(newScenarioComponents);
      setScenarioComponent(scenarioComponents.find(x => x.id === g_id).component);


      }
      function onFailure(){
        console.log("Get failed")
      }
      universalFetch(setGetValues,endpoint,onFailure,onSuccess,{PAGE:g_id});
    }

    function handleConfigurerGet(setGetValues){

    }

    function handleConversationEditorGet(setGetValues){

    }

    const classes = useStyles();
    const [openPopup, setOpenPopup] = useState(false);

    //const scenario_ID = props.scenario_ID
    const scenario_ID = 2
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

      {id: 4, title: "Initial Action", component:null},
      {id: 5, title: "Initial Reflection",component:null},
    ]


    const [scenarioComponents, setScenarioComponents] = useState(
      initialComponents
    //initialComponents.concat(page_names_and_ids)
    );

    const [showEditor,setShowEditor] = useState(false)
    const [scenarioComponent, setScenarioComponent] = useState(scenarioComponents[0].component);
    useEffect(()=>{
      console.log("handling logistics get")
        handleLogisticsGet(setGetValues,scenario_ID);

    },[])






    const [shouldFetch, setShouldFetch] = useState(0);

    let onClick= (component,id,title) => {

          if (component === null){
            console.log("detects component is null")
            var p = null
            var c = null
            if(title === "Configure Issues"){
              //getConfigureIssues
            }
            else if(title === "Conversation Editor"){
              //getConversationEditor
            }
            else{
              handlePageGet(setGetValues,id)

          }}

          setScenarioComponent(scenarioComponents.find(x => x.id === id).component);

    }

  
    const deleteByID = (d_id) => {
        setScenarioComponents(scenarioComponents.filter((i) => i.id !== d_id));
        //handleDelete(setDeleteValues,d_id);
    };

    function Sidebar() {
        const classes = useStyles();


        const addNewPage = (id, title, componentType) => {
            var c = null;
            var p = null
            switch (componentType) {
                case 'Generic':
                    p = {postFunction: handlePost, page_id: 100,page_type: "G",
                    page_title: title,scenario_ID: 1, version_ID: 1, next_page_id: 2,
                    body: "BODYTEXTGENERIC",bodies: ["t1","t1"],created: true}
                    c = <Generic {...p}></Generic>;
                    break;
                case 'Reflection':
                    p = {postFunction: handlePost, page_id: 120,page_type: "R",
                    page_title: title,scenario_ID: 1, version_ID: 1, next_page_id: 2,
                    body: "BODYTEXTREFLECTION",reflection_questions: ["q1","q2"],created: true}
                    c = <Reflection {...p}></Reflection>;
                    break;
                case 'Action':
                    p = {postFunction: handlePost, page_id: 140,page_type: "A",
                    page_title: title,scenario_ID: 1, version_ID: 1, next_page_id: 2,
                    body:"BODYTEXTACTION",choice1: "OPTION1",r1:4,choice2: "OPTION2",r2: 3,created: true}
                    c = <Action {...p} ></Action>;
                    break;
                default:
                    c = <Typography>Error</Typography>;
            }
            setScenarioComponents(
                scenarioComponents.concat({ id:id, title: title, component: c })
            );
        };

        function handleAddNewComponent(){
          setOpenPopup(true)
        }
        if (showEditor === false) {
          return <div className="Sidebar">Loading...</div>;
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

    if (showEditor === false) {
      return <div className="Sidebar">Loading...</div>;
    }
    return (
        <div className={classes.root}>
            <Sidebar />
            {(getValues.data || scenarioComponent != null) && <main className={classes.content}>{scenarioComponent}</main>}
        </div>
    );
}
