import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button, Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import deleteReq from '../../../delete';
import post from '../../../post';
import put from '../../../put';

const endpointPOST = 'http://localhost:8000/api/Issues/';
//Need issueID
const endpointPUT = 'http://localhost:8000/api/Issues/';
//Need issueID
const endpointDELETE = 'http://localhost:8000/api/Issues/';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(0.5),
        marginTop: theme.spacing(0),
        width: '100%',
        textTransform: 'unset',
    },
}));

IssueEntryField.propTypes = {
    id: PropTypes.number.isRequired,
    issue: PropTypes.string,
    score: PropTypes.number,
    isNewIssue: PropTypes.bool,
    issueEntryFieldList: PropTypes.any.isRequired,
    setIssueEntryFieldList: PropTypes.any.isRequired,
    listChange: PropTypes.any.isRequired,
    setListChange: PropTypes.any.isRequired,
};

export default function IssueEntryField({
    id,
    issue,
    score,
    listChange,
    setListChange,
    isNewIssue,
    setIssueEntryFieldList,
    issueEntryFieldList,
}) {
    const classes = useStyles();
    //TODO replace
    const scenarioID = 1;
    const versionID = 2;

    const [postValue, setPost] = useState(null);
    const [putValue, setPut] = useState(null);
    const [deleteReqValue, setDeleteReq] = useState(null);
    const [issueScore, setIssueScore] = useState(score ? score : 0);
    const [issueName, setIssueName] = useState(issue ? issue : 0);

    const handleChangeScore = (content) => {
        setIssueScore(content.target.value);
    };

    const handleChangeName = (content) => {
        setIssueName(content.target.value);
    };

    const saveIssue = () => {
        if (isNewIssue) {
            post(setPost, endpointPOST, null, null, {
                SCENARIO_ID: scenarioID,
                VERSION_ID: versionID,
                IMPORTANCE_SCORE: issueScore,
                NAME: issueName,
            });
        } else {
            put(setPut, endpointPUT + id + '/', null, null, {
                SCENARIO_ID: scenarioID,
                VERSION_ID: versionID,
                IMPORTANCE_SCORE: issueScore,
                NAME: issueName,
                ISSUE_ID: id,
            });
        }
        setListChange(!listChange);
    };

    const deleteIssue = (e) => {
        if (isNewIssue) {
            setIssueEntryFieldList(
                issueEntryFieldList.filter((entry) => entry.ISSUE_ID !== id)
            );
        } else {
            deleteReq(setDeleteReq, endpointDELETE + id + '/', null, null, {
                SCENARIO_ID: scenarioID,
                ISSUE_ID: id,
            });
            setListChange(!listChange);
        }
    };

    return (
        <div>
            <Box display="flex" flexDirection="row" p={1} m={1}>
                <Box p={1}>
                    <TextField
                        style={{ width: '75%' }}
                        id="outlined-text"
                        label="Issue"
                        value={issueName}
                        onChange={handleChangeName}
                        multiline
                        rows={2}
                        variant="outlined"
                    />
                    <TextField
                        style={{ width: '25%' }}
                        margin="normal"
                        id="outlined-number"
                        label="Score"
                        onChange={handleChangeScore}
                        value={issueScore}
                        rows={1}
                        variant="filled"
                    />
                </Box>
                <Box p={1}>
                    <div>
                        <Button
                            className={classes.button}
                            variant="contained"
                            color="primary"
                            onClick={() => saveIssue(id)}
                        >
                            Save
                        </Button>
                    </div>
                    <div>
                        <Button
                            className={classes.button}
                            variant="contained"
                            color="primary"
                            onClick={() => deleteIssue(id)}
                        >
                            Delete
                        </Button>
                    </div>
                </Box>
            </Box>
        </div>
    );
}
