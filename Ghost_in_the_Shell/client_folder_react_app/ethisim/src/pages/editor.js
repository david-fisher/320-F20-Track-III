import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer, Button, Typography } from '@material-ui/core';
import Logistics from '../components/scenario_components/Logistics';
import Generic from '../components/scenario_components/Generic';
import ConfigureIssues from '../components/scenario_components/ConfigureIssues';
import ConversationEditor from '../components/scenario_components/ConversationEditor';
import Reflection from '../components/scenario_components/Reflection';
import Action from '../components/scenario_components/Action';
import AddNewSimulationScenarioPageDialog from '../components/AddNewSimulationScenarioPageDialog';
import NavSideBarList from '../components/NavSideBarList';
import AddIcon from '@material-ui/icons/Add';
import { mockUnfinishedScenarioData } from '../shared/mockScenarioData';

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
    return array.concat({ id, title, component: c });
};

//Sidebar Components
var startList = [
    { id: 0, title: 'Logistics', type: 'Logistics' },
    { id: 1, title: 'Configure Issues', type: 'Configure Issues' },
    { id: 2, title: 'Conversation Editor', type: 'Conversation Editor' },
];

export default function Editor(props) {
    const classes = useStyles();
    const [openPopup, setOpenPopup] = useState(false);
    //Fake fetch of scenarioData with components
    let fetchedComponents = mockUnfinishedScenarioData.components;
    let combinedComponents = startList.concat(fetchedComponents);
    let initialComponents = combinedComponents.reduce(
        (result, currentValue) => {
            return addPage(
                result,
                currentValue.id,
                currentValue.title,
                currentValue.type,
                mockUnfinishedScenarioData
            );
        },
        []
    );
    const [scenarioComponents, setScenarioComponents] = useState(
        initialComponents
    );
    const [scenarioComponent, setScenarioComponent] = useState(
        scenarioComponents[0].component
    );
    const deleteByID = (d_id) => {
        setScenarioComponents(scenarioComponents.filter((i) => i.id !== d_id));
    };

    function Sidebar() {
        const classes = useStyles();

        const onClick = function (component) {
            setScenarioComponent(component);
        };

        const addNewPage = (id, title, componentType) => {
            var c = null;
            switch (componentType) {
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
            setScenarioComponents(
                scenarioComponents.concat({ id, title, component: c })
            );
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
