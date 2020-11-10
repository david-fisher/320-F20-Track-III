import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';
import ReactFlow, {
    removeElements,
    isEdge,
    MiniMap,
    Controls,
    Background,
} from 'react-flow-renderer';
import { mockComponentsFlowChart } from '../../../shared/mockScenarioData';
import initializeElements from './HelperFunctions/initializeElements';
import {
    actionNode,
    reflectionNode,
    genericNode,
    conversationNode,
} from './HelperFunctions/node';
import addEdge from './HelperFunctions/addEdge';

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
}));

export default function FlowDiagram(props) {
    const initialElements = mockComponentsFlowChart.components.map(
        (componentData) => {
            return initializeElements(componentData);
        }
    );

    //Set position of elements if elements are new ({x: 0,y: 0})
    initialElements.reduce((acc, currentValue) => {
        if (currentValue.position.x === 0 && currentValue.position.y === 0) {
            currentValue.position.y += acc;
            return acc + 51.2;
        }
        return acc;
    }, 0);

    const [elements, setElements] = useState(initialElements);
    const [isRemoveButtonDisabled, setIsRemoveButtonDisabled] = useState(true);
    const [currentEdgeSelected, setCurrentEdgeSelected] = useState();

    const classes = useStyles();

    const nodeTypes = {
        actionNode: actionNode,
        reflectionNode: reflectionNode,
        genericNode: genericNode,
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
        const index = elements.findIndex((ele) => ele.id === element.id);
        let elementsCopy = [...elements]; // important to create a copy, otherwise you'll modify state outside of setState call
        elementsCopy[index] = element;
        setElements(elementsCopy);
    };

    //TODO implement
    const save = () => {};

    //console.log(elements);

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
