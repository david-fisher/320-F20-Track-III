import React, { useState, useEffect } from 'react';
import Body from '../GeneralPageComponents/Body';
import Title from '../GeneralPageComponents/Title';
import { Typography, Container, Button } from '@material-ui/core';
import VersionControl from '../../VersionControl';
import InformationItemList from './InformationItemList';
import { mockGenericHistory } from '../../../shared/mockScenarioData';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    saveButton: {
        margin: theme.spacing(2),
        float: 'right',
        textTransform: 'unset',
    },
}));

Generic.propTypes = {
    postFunction: PropTypes.func.isRequired,
    page_id: PropTypes.any.isRequired,
    page_type: PropTypes.any.isRequired,
    page_title: PropTypes.any.isRequired,
    scenario_ID: PropTypes.any.isRequired,
    version_ID: PropTypes.any.isRequired,
    next_page_id: PropTypes.any.isRequired,
    body: PropTypes.any.isRequired,
    bodies: PropTypes.any.isRequired,
    created: PropTypes.any.isRequired,
};

export default function Generic(props) {
    const {
        postFunction,
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

    const classes = useStyles();
    //const titleData = mockGenericComponent.title;
    //const bodyData = mockGenericComponent.body;
    const [title, setTitle] = useState(page_title);
    const [bodyText, setBodyText] = useState(body);
    const [bodiesText, setBodiesText] = useState(bodies);
    /*
    var postReqBody = {
        PAGE: page_id,
        PAGE_TYPE: page_type,
        PAGE_TITLE: title,
        SCENARIO: scenario_ID,
        NEXT_PAGE_ID: next_page_id,
        PAGE_BODY: bodyText,
        BODIES: bodiesText,
    };*/

    var postReqBody = {
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
    };

    useEffect(() => {
        if (created === true) {
            //created = false
            postFunction(setPostValues, postReqBody, scenario_ID);
            console.log(postValues);
        }
    }, []);

    const savePage = () => {
        postFunction(setPostValues,postReqBody,scenario_ID);
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
            <Body body={bodyText} />
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
