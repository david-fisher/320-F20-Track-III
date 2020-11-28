import React, { useState, useEffect } from 'react';
import Body from '../GeneralPageComponents/Body';
import Title from '../GeneralPageComponents/Title';
import { Typography, Container, Button } from '@material-ui/core';
import VersionControl from '../../VersionControl';
import InformationItemList from './InformationItemList';
import { mockGenericHistory } from '../../../shared/mockScenarioData';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import universalPost from '../../../universalHTTPRequests/post.js'
import universalDelete from '../../../universalHTTPRequests/delete.js'
//{ id:id, title: title, component: c }
const useStyles = makeStyles((theme) => ({
    saveButton: {
        margin: theme.spacing(2),
        float: 'right',
        textTransform: 'unset',
    },
}));

Generic.propTypes = {
    page_id: PropTypes.any.isRequired,
    page_type: PropTypes.any.isRequired,
    page_title: PropTypes.any.isRequired,
    scenario_ID: PropTypes.any.isRequired,
    version_ID: PropTypes.any.isRequired,
    next_page_id: PropTypes.any,
    body: PropTypes.any.isRequired,
    bodies: PropTypes.any.isRequired,
    created: PropTypes.any.isRequired,
};

export default function Generic(props) {
    const {
        scenarioComponents,
        setScenarioComponents,
        page_id,
        page_type,
        page_title,
        scenario_ID,
        version_ID,
        next_page_id,
        body,
        bodies,
        created,
    } = props;

    const [postValues, setPostValues] = useState({
        data: null,
        loading: true,
        error: null,
    });
    const [deleteValues,setDeleteValues]= useState({
      data: null,
      loading: true,
      error: null,
    })
    const classes = useStyles();
    //const titleData = mockGenericComponent.title;
    //const bodyData = mockGenericComponent.body;
    const [pageID,setPageID] = useState(page_id)
    const [title, setTitle] = useState(page_title);
    const [bodyText, setBodyText] = useState(body);
    const [bodiesText, setBodiesText] = useState(bodies);
    const [justCreated,setJustCreated] = useState(created)
    console.log(pageID)
    var postReqBody = {
        PAGE: pageID,
        PAGE_TYPE: page_type,
        PAGE_TITLE: title,
        PAGE_BODY: bodyText,
        SCENARIO: scenario_ID,
        VERSION: 1,
        NEXT_PAGE: next_page_id,
        BODY: bodyText,
        BODIES: bodiesText,
        X_COORDINATE: 0,
        Y_COORDINATE: 0,
    };

    /*var postReqBody = {
        PAGE: page_id,
        PAGE_TYPE: page_type,
        PAGE_TITLE: title,
        PAGE_BODY: bodyText,
        SCENARIO: scenario_ID,
        VERSION: 1,
        NEXT_PAGE: next_page_id,
        BODY: bodyText,
        X_COORDINATE: 0,
        Y_COORDINATE: 0,
    };*/

    function handlePost(setPostValues,postReqBody,s_id,first_time){
      const endpoint = "/page?scenario_id=" + s_id
      function onSuccess(resp){
          const deleteEndPoint = "/page?page_id=" + pageID
          universalDelete(setDeleteValues,deleteEndPoint,null,null,{PAGE:pageID})
          setPageID(resp.PAGE)
          postReqBody.PAGE = pageID
          let newScenarioComponents = [...scenarioComponents]
          newScenarioComponents.find(x => x.title === title).id = pageID
          setScenarioComponents(newScenarioComponents);
      }
      function onSuccess2(resp){
        setPageID(resp.PAGE)
        let newScenarioComponents = [...scenarioComponents]
        newScenarioComponents.find(x => x.title === title).id = pageID
        setScenarioComponents(newScenarioComponents);
      }
      function onFailure(){
        console.log("Post failed")
      }
      if(first_time){
        universalPost(setPostValues,endpoint,onFailure,onSuccess2,postReqBody);
      }
      else{
        universalPost(setPostValues,endpoint,onFailure,onSuccess,postReqBody);
      }
    }

    useEffect(() => {
        if (justCreated === true) {
          console.log("page id is:")
          console.log(pageID)
          handlePost(setPostValues, postReqBody, scenario_ID,true);
          console.log(postValues);
          setJustCreated(false);
        }
    }, []);

    const savePage = () => {
        handlePost(setPostValues,postReqBody,scenario_ID,false);
        console.log(postValues);
    };

    return (
        <Container component="main">
            <Typography align="center" variant="h2">
                Generic Component
            </Typography>
            <VersionControl
                history={mockGenericHistory.history}
                type={mockGenericHistory.type}
                setTitle={setTitle}
                setBody={setBodyText}
            />
            <Title title={title} setTitle={setTitle} />
            <Body body={bodyText} onChange={(e) => setBodyText(e.target.value)} />
            <InformationItemList />
            <Button
                className={classes.saveButton}
                variant="contained"
                color="primary"
                onClick={savePage}
            >
                Save
            </Button>
        </Container>
    );
}
