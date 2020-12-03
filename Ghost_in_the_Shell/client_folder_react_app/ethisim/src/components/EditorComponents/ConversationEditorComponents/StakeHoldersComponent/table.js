import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import './table.css';
import PropTypes from 'prop-types';
import SuccessBanner from './../../../Banners/SuccessBanner';
import ErrorBanner from './../../../Banners/ErrorBanner';

const useStyles = makeStyles({
    table: {
        minWidth: 300,
    },
});

const baseURL = 'http://127.0.0.1:8000/';

BasicTable.propTypes = {
    rows: PropTypes.any.isRequired,
    removeRow: PropTypes.any.isRequired,
    stakeholder_id: PropTypes.number,
    issues: PropTypes.any,
    setIssues: PropTypes.any,
    data: PropTypes.string,
};

const handleSave = (e) => {
    var axios = require('axios');
    var data = issues;

    var config = {
        method: 'put',
        url: baseURL + 'multi_coverage?STAKEHOLDER=' + stakeholder_id,
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    axios(config)
        .then(function (response) {
            setSuccessBannerMessage('Successfully saved the issues for this stakeholder!');
            setSuccessBannerFade(true);
        })
        .catch(function (error) {
            setErrorBannerMessage('Failed to save the issues for this stakeholder! Please try again.');
            setErrorBannerFade(true);
        });
}

//for success and error banners
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

export default function BasicTable(props) {
    const classes = useStyles();
    BasicTable.propTypes = props.data;

    return (
        <div>
            <Button
                id="button-save"
                variant="contained"
                color="primary"
                onClick={handleSave}
            >
                Save Changes
            </Button>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Issue</TableCell>
                            <TableCell>Score</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.rows.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    <TextField
                                        id="filled"
                                        defaultValue={row.issuename}
                                        variant="filled"
                                    />
                                </TableCell>

                                <TableCell>
                                    <TextField
                                        id="filled"
                                        defaultValue={row.score}
                                        variant="filled"
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <SuccessBanner
                successMessage={successBannerMessage}
                fade={successBannerFade}
            />
            <ErrorBanner
                errorMessage={errorBannerMessage}
                fade={errorBannerFade}
            />
        </div>
    );
}