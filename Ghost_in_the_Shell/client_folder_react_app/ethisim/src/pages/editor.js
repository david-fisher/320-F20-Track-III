import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer, Button, Typography } from '@material-ui/core';
import Logistics from '../components/EditorComponents/LogisticsPageComponents/Logistics';
import Event from '../components/EditorComponents/GenericPageComponents/Event';
import ConfigureIssues from '../components/EditorComponents/ConfigureIssuesComponents/ConfigureIssues';
import ConversationEditor from '../components/EditorComponents/ConversationEditorComponents/ConversationEditor';
import Reflection from '../components/EditorComponents/ReflectionPageComponents/Reflection';
import Action from '../components/EditorComponents/ActionPageComponents/Action';
import FlowDiagram from '../components/EditorComponents/FlowDiagram';
import AddNewSimulationScenarioPageDialog from '../components//EditorComponents/AddNewSimulationScenarioPageDialog';
import NavSideBarList from '../components/ConfigurationSideBarComponents/NavSideBarList';
import AddIcon from '@material-ui/icons/Add';

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

//Sidebar Components
var startList = [
    { id: 0, name: 'Logistics', component: <Logistics /> },
    { id: 1, name: 'Configure Issues', component: <ConfigureIssues /> },
    { id: 2, name: 'Conversation Editor', component: <ConversationEditor /> },
    { id: 3, name: 'Flow Diagram', component: <FlowDiagram /> },
    { id: 4, name: 'Event', component: <Event /> },
    { id: 5, name: 'Reflection', component: <Reflection /> },
    { id: 6, name: 'Action', component: <Action /> },
];

export default function Editor(props) {
    const classes = useStyles();
    const [scenarioComponent, setScenarioComponent] = useState(<Logistics />);
    const [openPopup, setOpenPopup] = useState(false);
    const [scenarioComponents, setScenarioComponents] = useState(startList);

    const deleteByID = (d_id) => {
        console.log('we are currently deleteing:');
        console.log(d_id);
        setScenarioComponents(scenarioComponents.filter((i) => i.id !== d_id));
    };

    function Sidebar() {
        const classes = useStyles();

        const onClick = function (component) {
            console.log(component);
            setScenarioComponent(component);
        };

        const addPage = (newId, newName, componentType) => {
            console.log('Component type: ');
            console.log(componentType);
            var c = null;
            switch (componentType) {
                case 'Generic':
                    c = <Event />;
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
            scenarioComponents.push({ id: newId, name: newName, component: c });
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
                    addPage={addPage}
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
