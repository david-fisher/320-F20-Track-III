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

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '90vh',
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
        paddingRight: theme.spacing(2),
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
const tempScenarioID = '14';

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
            console.log(resp);
            const initialElements = resp.data.map((componentData) => {
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
                if (currentElement.type === 'actionNode NOT YET IMPLEMENTED') {
                } else if (currentElement.NEXT_PAGE_id) {
                    addEdge(
                        {
                            source: currentElement.id.toString(),
                            target: currentElement.NEXT_PAGE.toString(),
                        },
                        elements
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

    console.log(elements);

    const save = () => {
        const updatedElements = elements.reduce((array, currentElement) => {
            if (isNode(currentElement)) {
                let nodeElement = {
                    PAGE: currentElement.PAGE,
                    PAGE_TYPE: currentElement.PAGE_TYPE,
                    PAGE_TITLE: currentElement.PAGE_TITLE,
                    SCENARIO: currentElement.SCENARIO_id,
                    VERSION: currentElement.VERSION_id,
                    NEXT_PAGE: null,
                    X_COORDINATE: currentElement.position.x,
                    Y_COORDINATE: currentElement.position.y,
                };
                //TODO
                if (currentElement.type === 'actionNodeNOTYETIMPLEMENTED') {
                    // eslint-disable-next-line
                    const nextPagesActionArray = elements.reduce(
                        (array, currElement) => {
                            if (
                                currElement.isEdge &&
                                currElement.source === currentElement.id + '__a'
                            ) {
                                return array.concat({
                                    PAGE: currentElement.id,
                                    RESULT_PAGE: currElement.target,
                                });
                            } else if (
                                currElement.isEdge &&
                                currElement.source === currentElement.id + '__b'
                            ) {
                                nodeElement.NEXT_PAGE = currElement.target;
                                return array.concat({
                                    PAGE: currentElement.id,
                                    RESULT_PAGE: currElement.target,
                                });
                            }
                            return array;
                        },
                        []
                    );
                } else {
                    //Set next page ID for all other node types
                    elements.forEach((currElement) => {
                        //currElement.source is type string, convert to number
                        if (
                            isEdge(currElement) &&
                            Number(currElement.source) === currentElement.id
                        ) {
                            //Set NEXT_PAGE id to type number
                            nodeElement.NEXT_PAGE = Number(currElement.target);
                        }
                    });
                }
                return array.concat(nodeElement);
            }
            return array;
        }, []);
        console.log(updatedElements);
        put(
            setElementsPUT,
            endpointPUT + tempScenarioID,
            null,
            null,
            updatedElements
        );
    };

    //console.log(elements);
    if (fetchedElements.loading) {
        return <LoadingSpinner />;
    }

    if (fetchedElements.error) {
        return (
            <div className={classes.issue}>
                <div className={classes.container}>
                    <ErrorIcon className={classes.iconError} />
                    <Typography align="center" variant="h3">
                        Error in fetching issues.
                    </Typography>
                </div>
                <Button variant="contained" color="primary" onClick={getData}>
                    <RefreshIcon className={classes.iconRefresh} />
                </Button>
            </div>
        );
    }

    return (
        <div className={classes.container}>
            <Typography variant="h2">Order Scenario Pages</Typography>
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
