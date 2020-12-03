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

const useStyles = makeStyles({
    table: {
        minWidth: 300,
    },
});

/*
function createData(issuename, score, maxpoints) {
  return { issuename, score, maxpoints };
}
*/

/*
const rows = [
  createData("Money", 1.0, 5.0),
  createData("Life", 3.0, 5.0),
  createData("Privacy", 4.0, 5.0),
]; */

BasicTable.propTypes = {
    rows: PropTypes.any.isRequired,
    removeRow: PropTypes.any.isRequired,
    issues: PropTypes.any,
    data: PropTypes.string,
};

const handleSave = (e) => {
    var axios = require('axios');
    var data = QRs;

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
        </div>
    );
}