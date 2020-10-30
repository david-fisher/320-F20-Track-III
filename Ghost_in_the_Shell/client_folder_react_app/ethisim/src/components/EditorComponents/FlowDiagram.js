import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Button } from '@material-ui/core';
import ReactFlow, {
    Handle,
    removeElements,
    isEdge,
    MiniMap,
    Controls,
    Background,
} from 'react-flow-renderer';
import { mockComponentsFlowChart } from '../../shared/mockScenarioData';

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
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

const actionNode = ({ data }) => {
    return (
        <>
            <Handle
                type="target"
                position="top"
                onConnect={(params) => console.log('handle onConnect', params)}
            />
            {data.label}
            <Handle
                type="source"
                position="bottom"
                id="a"
                style={{ left: '20%' }}
            />
            <Handle
                type="source"
                position="bottom"
                id="b"
                style={{ left: '80%' }}
            />
        </>
    );
};

const reflectionNode = ({ data }) => {
    return (
        <>
            <Handle type="target" position="top" />
            {data.label}
            <Handle type="source" position="bottom" />
        </>
    );
};

const genericNode = ({ data }) => {
    return (
        <>
            <Handle type="target" position="top" />
            {data.label}
            <Handle type="source" position="bottom" />
        </>
    );
};

const conversationNode = ({ data }) => {
    return (
        <>
            <Handle type="target" position="top" />
            {data.label}
            <Handle type="source" position="bottom" />
        </>
    );
};

function initializeElements(componentData) {
    if (componentData.type === 'Action') {
        return {
            id: componentData.id,
            type: 'actionNode',
            data: { label: componentData.title },
            style: {
                border: '3px solid green',
                borderRadius: '5%',
                padding: 10,
            },
            position: componentData.position,
        };
    } else if (componentData.type === 'Generic') {
        return {
            id: componentData.id,
            type: 'genericNode',
            data: { label: componentData.title },
            style: { border: '3px solid red', borderRadius: '5%', padding: 10 },
            position: componentData.position,
        };
    } else if (componentData.type === 'Reflection') {
        return {
            id: componentData.id,
            type: 'reflectionNode',
            data: { label: componentData.title },
            style: {
                border: '3px solid purple',
                borderRadius: '5%',
                padding: 10,
            },
            position: componentData.position,
        };
    } else if (componentData.type === 'Conversation') {
        return {
            id: componentData.id,
            type: 'conversationNode',
            data: { label: componentData.title },
            style: {
                border: '3px solid blue',
                borderRadius: '5%',
                padding: 10,
            },
            position: componentData.position,
        };
    }
}
export default function FlowDiagram(props) {
    const initialElements = mockComponentsFlowChart.components.map(
        (componentData) => {
            return initializeElements(componentData);
        }
    );

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

    const graphStyles = { width: '100%', height: '500px', border: 'solid' };

    const addEdge = (params, elements) => {
        const { source, target } = params;
        const id = 'edge-' + source + '-' + target;
        //Node path to itself
        if (source === target) {
            return elements;
        }
        //Edge already exists
        if (elements.find((elements) => elements.id === id)) {
            return elements;
        }
        //Source already has an edge (A source node can't link to 2 different pages)
        if (elements.find((elements) => elements.source === source)) {
            return elements;
        }
        const newEdge = {
            id,
            source,
            target,
            animated: true,
            arrowHeadType: 'arrowclosed',
            style: { strokeWidth: '5px', arrowWidth: '2px' },
        };
        return elements.concat(newEdge);
    };

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

    console.log(elements);

    return (
        <Container className={classes.container} component="main" maxWidth="lg">
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
        </Container>
    );
}
