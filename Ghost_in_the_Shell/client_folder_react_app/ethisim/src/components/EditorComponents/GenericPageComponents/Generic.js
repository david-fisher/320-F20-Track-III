import React, { useState, useEffect } from 'react';
import Body from '../GeneralPageComponents/Body';
import Title from '../GeneralPageComponents/Title';
import { Typography, Container, Button } from '@material-ui/core';
import VersionControl from '../../VersionControl';
import InformationItemList from './InformationItemList';
import { mockGenericHistory } from '../../../shared/mockScenarioData';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import universalPost from '../../../universalHTTPRequests/post.js';
import universalDelete from '../../../universalHTTPRequests/delete.js';
import SuccessBanner from '../../Banners/SuccessBanner';
import ErrorBanner from '../../Banners/ErrorBanner';

const useStyles = makeStyles((theme) => ({
    saveButton: {
        margin: theme.spacing(2),
        float: 'right',
        textTransform: 'unset',
    },
}));

Generic.propTypes = {
    scenarioComponents: PropTypes.any,
    setScenarioComponents: PropTypes.any,
    page_id: PropTypes.any,
    page_type: PropTypes.any,
    page_title: PropTypes.any,
    scenario_ID: PropTypes.any,
    version_ID: PropTypes.any,
    next_page_id: PropTypes.any,
    body: PropTypes.any,
    bodies: PropTypes.any,
    xCoord: PropTypes.any,
    yCoord: PropTypes.any,
};

export default function Generic(props) {
    const {
        scenarioComponents,
        setScenarioComponents,
        page_id,
        page_type,
        page_title,
        version_ID,
        scenario_ID,
        next_page_id,
        body,
        bodies,
        xCoord,
        yCoord,
    } = props;

    // eslint-disable-next-line
    const [postValues, setPostValues] = useState({
        data: null,
        loading: true,
        error: null,
    });
    // eslint-disable-next-line
    const [deleteValues, setDeleteValues] = useState({
        data: null,
        loading: true,
        error: null,
    });

    const classes = useStyles();
    const [pageID, setPageID] = useState(page_id);
    const [title, setTitle] = useState(page_title);
    const [bodyText, setBodyText] = useState(body);
    // eslint-disable-next-line
    const [bodiesText, setBodiesText] = useState(bodies);

    var postReqBody = {
        PAGE: pageID,
        PAGE_TYPE: page_type,
        PAGE_TITLE: title,
        PAGE_BODY: bodyText,
        SCENARIO: scenario_ID,
        VERSION: version_ID,
        NEXT_PAGE: next_page_id,
        BODIES: bodiesText,
        X_COORDINATE: xCoord,
        Y_COORDINATE: yCoord,
    };

    function handlePost(setPostValues, postReqBody, s_id, first_time) {
        const endpoint = '/page?page_id=' + pageID;

        function onSuccess(resp) {
            const deleteEndPoint = '/page?page_id=' + pageID;
            postReqBody.PAGE = resp.data.PAGE;
            let newScenarioComponents = [...scenarioComponents];
            console.log(newScenarioComponents);
            newScenarioComponents.find((x) => x.id === pageID).id =
                resp.data.PAGE;
            setPageID(resp.data.PAGE);
            setScenarioComponents(newScenarioComponents);
            setSuccessBannerFade(true);
            setSuccessBannerMessage('Successfully saved page!');
            universalDelete(setDeleteValues, deleteEndPoint, null, null, {
                PAGE: pageID,
            });
        }

        function onFailure() {
            console.log('Post failed');
            setErrorBannerFade(true);
            setErrorBannerMessage('Failed to save page! Please try again.');
        }
        console.log(postReqBody);
        universalPost(
            setPostValues,
            endpoint,
            onFailure,
            onSuccess,
            postReqBody
        );
    }

    const savePage = () => {
        handlePost(setPostValues, postReqBody, scenario_ID, false);
    };

    const [successBannerMessage, setSuccessBannerMessage] = useState('');
    const [successBannerFade, setSuccessBannerFade] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setSuccessBannerFade(false);
        }, 1000);

        return () => clearTimeout(timeout);
    }, [successBannerFade]);

    const [errorBannerMessage, setErrorBannerMessage] = useState('');
    const [errorBannerFade, setErrorBannerFade] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setErrorBannerFade(false);
        }, 1000);

        return () => clearTimeout(timeout);
    }, [errorBannerFade]);

    return (
        <Container component="main">
            <SuccessBanner
                successMessage={successBannerMessage}
                fade={successBannerFade}
            />
            <ErrorBanner
                errorMessage={errorBannerMessage}
                fade={errorBannerFade}
            />
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
            <Body body={bodyText} setBody={setBodyText} />
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
