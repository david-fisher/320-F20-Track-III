import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';
import ReactFlow, {
    removeElements,
    isEdge,
    isNode,
    MiniMap,
    Controls,
    Background,
} from 'react-flow-renderer';
import initializeElements from './HelperFunctions/initializeElements';
import {
    actionNode,
    reflectionNode,
    genericNode,
    conversationNode,
    introNode,
} from './HelperFunctions/node';
import addEdge from './HelperFunctions/addEdge';
import get from '../../../universalHTTPRequests/get';
import put from '../../../universalHTTPRequests/put';
import LoadingSpinner from '../../LoadingSpinner';
import RefreshIcon from '@material-ui/icons/Refresh';
import ErrorIcon from '@material-ui/icons/Error';
import SuccessBanner from '../../Banners/SuccessBanner';
import ErrorBanner from '../../Banners/ErrorBanner';

const useStyles = makeStyles((theme) => ({
    errorContainer: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '90vh',
    },
    margin: {
        marginBottom: '15px',
    },
    title: {
        textAlign: 'center',
    },
    copyright: {
        margin: theme.spacing(2),
    },
    buttonContainer: {
        display: 'flex',
        float: 'right',
        flexDirection: 'column',
    },
    button: {
        zIndex: 5,
        float: 'right',
    },
    iconError: {
        fontSize: '75px',
    },
    iconRefreshLarge: {
        fontSize: '75px',
    },
    iconRefreshSmall: {
        fontSize: '30px',
    },
}));

//Needs scenario id
const endpointGET = '/flowchart?scenario_id=';
//Needs scenario id
const endpointPUT = '/flowchart?scenario_id=';
const tempScenarioID = '1';

export default function FlowDiagram(props) {
    const classes = useStyles();
    const [fetchedElements, setFetchedElements] = useState({
        data: null,
        loading: true,
        error: null,
    });
    // eslint-disable-next-line
    const [elementsPUT, setElementsPUT] = useState({
        data: null,
        loading: true,
        error: null,
    });

    const [elements, setElements] = useState([]);

    let getData = () => {
        function onSuccess(resp) {
            let initialElements = resp.data.map((componentData) => {
                return initializeElements(componentData);
            });

            //Set position of elements if elements are new ({x: 0,y: 0})
            //Height of nodes are 51.2 pixels
            initialElements.reduce((acc, currentValue) => {
                if (
                    currentValue.position.x === 0 &&
                    currentValue.position.y === 0
                ) {
                    currentValue.position.y += acc;
                    return acc + 51.2;
                }
                return acc;
            }, 0);

            //Add edges
            initialElements.forEach((currentElement) => {
                //TODO
                if (currentElement.type === 'actionNode') {
                    //Only 2 action options
                    if (currentElement.ACTION[0].RESULT_PAGE) {
                        initialElements = addEdge(
                            {
                                source: currentElement.id.toString() + '__a',
                                target: currentElement.ACTION[0].RESULT_PAGE.toString(),
                            },
                            initialElements
                        );
                    }
                    if (currentElement.ACTION[1].RESULT_PAGE) {
                        initialElements = addEdge(
                            {
                                source: currentElement.id.toString() + '__b',
                                target: currentElement.ACTION[1].RESULT_PAGE.toString(),
                            },
                            initialElements
                        );
                    }
                } else if (currentElement.NEXT_PAGE_id) {
                    initialElements = addEdge(
                        {
                            source: currentElement.id.toString(),
                            target: currentElement.NEXT_PAGE_id.toString(),
                        },
                        initialElements
                    );
                }
            });
            setElements(initialElements);
        }
        get(setFetchedElements, endpointGET + tempScenarioID, null, onSuccess);
    };

    useEffect(getData, []);

    const [isRemoveButtonDisabled, setIsRemoveButtonDisabled] = useState(true);
    const [currentEdgeSelected, setCurrentEdgeSelected] = useState();

    const nodeTypes = {
        actionNode: actionNode,
        reflectionNode: reflectionNode,
        genericNode: genericNode,
        introNode: introNode,
        conversationNode: conversationNode,
    };

    //Height and Width of flow diagram
    const graphStyles = { width: '100%', height: '100%', border: 'solid' };

    const onConnect = (params) => {
        setElements((elements) => addEdge(params, elements));
    };

    const onRemoveEdge = (params, element) => {
        if (isEdge(element)) {
            setIsRemoveButtonDisabled(false);
            setCurrentEdgeSelected([element]);
        }
    };

    const deleteEdge = () => {
        if (currentEdgeSelected != null) {
            setElements((elements) =>
                removeElements(currentEdgeSelected, elements)
            );
            setCurrentEdgeSelected(null);
            setIsRemoveButtonDisabled(true);
        }
    };

    //Update of nodes position
    const onNodeDrag = (event, element) => {
        //ID's in flow diagram library are stored as strings
        const index = elements.findIndex(
            (ele) => ele.id === Number(element.id)
        );
        // important to create a copy, otherwise you'll modify state outside of setState call
        let elementsCopy = [...elements];
        elementsCopy[index] = {
            ...elementsCopy[index],
            position: element.position,
        };
        setElements(elementsCopy);
    };

    const save = () => {
        function onSuccess() {
            setSuccessBannerFade(true);
            setSuccessBannerMessage('Successfully Saved!');
        }

        function onError() {
            setErrorBannerFade(true);
            setErrorBannerMessage('Failed to Save!');
        }

        const updatedElements = elements.reduce((array, currentElement) => {
            if (isNode(currentElement)) {
                let nodeElement = {
                    PAGE: currentElement.PAGE,
                    PAGE_TYPE: currentElement.PAGE_TYPE,
                    PAGE_TITLE: currentElement.PAGE_TITLE,
                    SCENARIO: currentElement.SCENARIO_id,
                    VERSION: currentElement.VERSION_id,
                    NEXT_PAGE: null,
                    X_COORDINATE: Math.floor(currentElement.position.x),
                    Y_COORDINATE:
                        Math.floor(currentElement.position.x) !== 0
                            ? Math.floor(currentElement.position.y)
                            : 0,
                };

                if (currentElement.type === 'actionNode') {
                    nodeElement.ACTION = currentElement.ACTION.map(
                        (actionData) => {
                            return {
                                id: actionData.id,
                                PAGE: actionData.PAGE_id,
                                CHOICE: actionData.CHOICE,
                                RESULT_PAGE: null,
                            };
                        }
                    );

                    elements.forEach((currElement) => {
                        //First option
                        if (
                            isEdge(currElement) &&
                            currElement.source === currentElement.id + '__a'
                        ) {
                            nodeElement.ACTION[0] = {
                                id: currentElement.ACTION[0].id,
                                CHOICE: currentElement.ACTION[0].CHOICE,
                                PAGE: currentElement.id,
                                RESULT_PAGE: Number(currElement.target),
                            };
                            //Second option
                        } else if (
                            isEdge(currElement) &&
                            currElement.source === currentElement.id + '__b'
                        ) {
                            nodeElement.ACTION[1] = {
                                id: currentElement.ACTION[1].id,
                                CHOICE: currentElement.ACTION[1].CHOICE,
                                PAGE: currentElement.id,
                                RESULT_PAGE: Number(currElement.target),
                            };
                        }
                    });
                } else {
                    //Set next page ID for all other node types
                    elements.some((currElement) => {
                        //currElement.source is type string, convert to number
                        if (
                            isEdge(currElement) &&
                            Number(currElement.source) === currentElement.id
                        ) {
                            //Set NEXT_PAGE id to type number
                            nodeElement.NEXT_PAGE = Number(currElement.target);
                            return true;
                        }
                        return false;
                    });
                }
                return array.concat(nodeElement);
            }
            return array;
        }, []);

        put(
            setElementsPUT,
            endpointPUT + tempScenarioID,
            onError,
            onSuccess,
            updatedElements
        );
    };

    const [successBannerFade, setSuccessBannerFade] = useState(false);
    const [successBannerMessage, setSuccessBannerMessage] = useState('');
    const [errorBannerFade, setErrorBannerFade] = useState(false);
    const [errorBannerMessage, setErrorBannerMessage] = useState('');

    useEffect(() => {
        const timeout = setTimeout(() => {
            setSuccessBannerFade(false);
        }, 1000);

        return () => clearTimeout(timeout);
    }, [successBannerFade]);

    if (fetchedElements.loading) {
        return <LoadingSpinner />;
    }

    if (fetchedElements.error) {
        return (
            <div className={classes.errorContainer}>
                <div className={classes.container}>
                    <ErrorIcon className={classes.iconError} />
                    <Typography align="center" variant="h3">
                        Error in fetching issues.
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={getData}
                    >
                        <RefreshIcon className={classes.iconRefreshLarge} />
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className={classes.container}>
            <Typography variant="h2">Order Scenario Pages</Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={getData}
                className={classes.margin}
            >
                <RefreshIcon className={classes.iconRefreshSmall} />
            </Button>
            <SuccessBanner
                successMessage={successBannerMessage}
                fade={successBannerFade}
            />
            <ErrorBanner
                errorMessage={errorBannerMessage}
                fade={errorBannerFade}
            />
            <ReactFlow
                elements={elements}
                style={graphStyles}
                onConnect={onConnect}
                onElementClick={onRemoveEdge}
                onNodeDragStop={onNodeDrag}
                nodeTypes={nodeTypes}
            >
                <div className={classes.buttonContainer}>
                    <Button
                        className={classes.button}
                        variant="contained"
                        color="primary"
                        onClick={save}
                    >
                        <Typography variant="h6" display="block" noWrap>
                            Save Changes
                        </Typography>
                    </Button>
                    <Button
                        className={classes.button}
                        variant="contained"
                        color="primary"
                        disabled={isRemoveButtonDisabled}
                        onClick={deleteEdge}
                    >
                        <Typography variant="h6" display="block" noWrap>
                            Remove Edge
                        </Typography>
                    </Button>
                </div>
                <MiniMap />
                <Controls />
                <Background />
            </ReactFlow>
        </div>
    );
}
