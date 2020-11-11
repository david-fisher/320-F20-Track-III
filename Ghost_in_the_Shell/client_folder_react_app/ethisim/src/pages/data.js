import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
    Container,
    Box,
    Button,
    Typography,
    CssBaseline,
    AppBar,
    Toolbar,
} from '@material-ui/core';
import Copyright from '../components/Copyright';
import PropTypes from 'prop-types';
import MaterialTable from 'material-table';
import { forwardRef } from 'react';
import StudentResponseDialog from '../components/StudentResponsesComponents/StudentResposeDialog';
import { mockStudents } from '../shared/mockScenarioData';
import './data.css';
import { Link } from 'react-router-dom';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import RateReviewIcon from '@material-ui/icons/RateReview';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
        <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
        <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => (
        <ArrowDownward {...props} ref={ref} />
    )),
    ThirdStateCheck: forwardRef((props, ref) => (
        <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
    RateReview: forwardRef((props, ref) => (
        <RateReviewIcon {...props} ref={ref} />
    )),
};

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(12),
        textAlign: 'center',
    },
    button: {
        marginBottom: theme.spacing(1),
        textTransform: 'unset',
    },
    exitButton: {
        margin: theme.spacing(2),
        borderStyle: 'solid',
        borderColor: 'white',
        border: 2,
    },
    title: {
        textAlign: 'center',
    },
    copyright: {
        margin: theme.spacing(2),
    },
}));

Data.propTypes = {
    id: PropTypes.number.isRequired,
    scenarioName: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    scenarioData: PropTypes.any.isRequired,
    location: PropTypes.any.isRequired,
};

export default function Data(props) {
    const classes = useStyles();
    Data.propTypes = props.data;
    const title =
        'Student Data: ' +
        props.location.scenarioData.scenarioName +
        ' | ' +
        props.location.scenarioData.className;
    const [open, setOpen] = useState(false);
    const [selectedResponseData, setSelectedResponseData] = useState({});

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const WhiteTextTypography = withStyles({
        root: {
            color: '#FFFFFF',
        },
    })(Typography);

    return (
        <Container component="main" className={classes.container}>
            <CssBaseline />
            <AppBar position="fixed">
                <Toolbar>
                    <Box display="flex" flexGrow={1}>
                        <Typography variant="h4" noWrap>
                            Student Data
                        </Typography>
                    </Box>

                    <Button
                        component={Link}
                        to={{
                            pathname: '/dashboard',
                        }}
                        className={classes.exitButton}
                    >
                        <WhiteTextTypography noWrap>
                            Return to Dashboard
                        </WhiteTextTypography>
                    </Button>
                </Toolbar>
            </AppBar>

            <StudentResponseDialog
                open={open}
                handleClickOpen={handleClickOpen}
                handleClose={handleClose}
                setSelectedResponseData={setSelectedResponseData}
                selectedResponseData={selectedResponseData}
            />
            <MaterialTable
                icons={tableIcons}
                title={title}
                options={{
                    exportButton: true,
                }}
                actions={[
                    {
                        icon: () => <RateReviewIcon />,
                        tooltip: 'View Student Response',
                        onClick: (event, rowData) => {
                            setOpen(true);
                            setSelectedResponseData(rowData);
                        },
                    },
                ]}
                columns={[
                    { title: 'Name', field: 'name' },
                    { title: 'Age', field: 'age', type: 'numeric' },
                    { title: 'Grade', field: 'grade' },
                    { title: 'Gender', field: 'gender' },
                    { title: 'Race', field: 'race' },
                    { title: 'Major', field: 'major' },
                ]}
                data={mockStudents}
            />
            <Box className={classes.copyright}>
                <Copyright />
            </Box>
        </Container>
    );
}
