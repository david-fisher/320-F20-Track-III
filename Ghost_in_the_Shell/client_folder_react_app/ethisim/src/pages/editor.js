import React, { useState } from 'react';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import {
    Drawer,
    Box,
    Grid,
    Container,
    Button,
    Typography,
} from '@material-ui/core';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
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
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    exitButton: {
        margin: theme.spacing(2),
        borderStyle: 'solid',
        borderColor: 'white',
        border: 2,
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
        flexDirection: 'row',
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
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content1: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
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
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    const WhiteTextTypography = withStyles({
        root: {
            color: '#FFFFFF',
        },
    })(Typography);

    const BlackTextTypography = withStyles({
        root: {
            color: '#000000',
        },
    })(Typography);

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
                    variant="persistent"
                    anchor="left"
                    open={open}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? (
                            <ChevronLeftIcon />
                        ) : (
                            <ChevronRightIcon />
                        )}
                        <BlackTextTypography variant="h6">
                            Hide Menu
                        </BlackTextTypography>
                    </IconButton>

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
        <div className={classes.container}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <Box display="flex" flexGrow={1}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            className={clsx(
                                classes.menuButton,
                                open && classes.hide
                            )}
                        >
                            <MenuIcon />
                        </IconButton>

                        <Typography variant="h4" noWrap>
                            Ethisim Scenario Editor
                        </Typography>
                    </Box>

                    <Button
                        component={Link}
                        to={{
                            pathname: '/dashboard',
                        }}
                        className={classes.exitButton}
                    >
                        <WhiteTextTypography>
                            Return to Dashboard
                        </WhiteTextTypography>
                    </Button>
                </Toolbar>
            </AppBar>

            <Sidebar />

            <main
                className={clsx(classes.content1, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
                {scenarioComponent}
            </main>
        </div>
    );
}
