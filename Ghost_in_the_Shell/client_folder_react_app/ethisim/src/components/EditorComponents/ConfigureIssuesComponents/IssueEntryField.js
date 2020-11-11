import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button, Box, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import deleteReq from '../../../universalHTTPRequests/delete';
import post from '../../../universalHTTPRequests/post';
import put from '../../../universalHTTPRequests/put';

const endpointPOST = '/api/Issues/';
//Need issueID
const endpointPUT = '/api/Issues/';
//Need issueID
const endpointDELETE = '/api/Issues/';

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
    setSuccessBannerFade: PropTypes.any,
    setSuccessBannerMessage: PropTypes.any,
    setErrorBannerMessage: PropTypes.any,
    setErrorBannerFade: PropTypes.any,
};

export default function IssueEntryField({
    id,
    issue,
    score,
    isNewIssue,
    setIssueEntryFieldList,
    issueEntryFieldList,
    setSuccessBannerMessage,
    setSuccessBannerFade,
    setErrorBannerMessage,
    setErrorBannerFade,
}) {
    const classes = useStyles();
    //TODO replace once scenario dashboard page is implemented with backend
    const scenarioID = 1;
    const versionID = 2;

    // eslint-disable-next-line
    const [postValue, setPost] = useState({
        data: null,
        loading: true,
        error: null,
    });
    // eslint-disable-next-line
    const [putValue, setPut] = useState({
        data: null,
        loading: true,
        error: null,
    });
    // eslint-disable-next-line
    const [deleteReqValue, setDeleteReq] = useState({
        data: null,
        loading: true,
        error: null,
    });

    const [issueID, setIssueID] = useState(id);
    const [issueScore, setIssueScore] = useState(score ? score : '');
    const [issueName, setIssueName] = useState(issue ? issue : '');
    const [newIssue, setNewIssue] = useState(isNewIssue);

    const handleChangeScore = (content) => {
        setIssueScore(content.target.value);
    };

    const handleChangeName = (content) => {
        setIssueName(content.target.value);
    };

    const saveIssue = () => {
        //Issue name is null or white space and issue score is null
        if ((!issueName || !issueName.trim()) && !issueScore) {
            setErrorBannerMessage('Issue score and name is not filled in!');
            setErrorBannerFade(true);
            return;
        }
        //Issue name is null or white space
        if (!issueName || !issueName.trim()) {
            setErrorBannerMessage('Issue name is not filled in!');
            setErrorBannerFade(true);
            return;
        }
        //Issue score is null
        if (!issueScore) {
            setErrorBannerMessage('Issue score is not filled in!');
            setErrorBannerFade(true);
            return;
        }
        score = Number(issueScore);
        //Issue score is not an integer between 0 and 5
        if (
            isNaN(issueScore) ||
            issueScore.toString().indexOf('.') !== -1 ||
            score > 5 ||
            score < 0
        ) {
            setErrorBannerMessage(
                'Issue score must be an integer between 0 and 5.'
            );
            setErrorBannerFade(true);
            return;
        }
        if (newIssue) {
            function onSuccess(resp) {
                //if newly created issue, replace fake ID with new ID
                if (resp.data) {
                    setIssueID(resp.data.ISSUE_ID);
                    setSuccessBannerFade(true);
                    setSuccessBannerMessage('Successfully created issue!');
                    setNewIssue(false);
                }
            }
            function onFailure() {
                setErrorBannerMessage('Failed to save! Please try again.');
                setErrorBannerFade(true);
            }
            post(setPost, endpointPOST, onFailure, onSuccess, {
                SCENARIO_ID: scenarioID,
                VERSION_ID: versionID,
                IMPORTANCE_SCORE: score,
                NAME: issueName,
            });
        } else {
            function onSuccess() {
                setSuccessBannerFade(true);
                setSuccessBannerMessage('Successfully updated issue!');
            }
            function onFailure() {
                setErrorBannerMessage('Failed to save! Please try again.');
                setErrorBannerFade(true);
            }
            put(setPut, endpointPUT + issueID + '/', onFailure, onSuccess, {
                SCENARIO_ID: scenarioID,
                VERSION_ID: versionID,
                IMPORTANCE_SCORE: score,
                NAME: issueName,
                ISSUE_ID: id,
            });
        }
    };

    const deleteIssue = () => {
        //remove issue from array, id represents the id in issueEntryFieldList
        //If issue is a new issue, A POST request will replace the fake ID with the ID in database
        //ID in the array will remain the fake id, so that is why we compare with 'id' rather than 'issueID'
        if (newIssue) {
            let newData = issueEntryFieldList.data.filter(
                (entry) => entry.ISSUE_ID !== id
            );
            setIssueEntryFieldList({ ...issueEntryFieldList, data: newData });
        } else {
            function successfullySaved() {
                setSuccessBannerFade(true);
                setSuccessBannerMessage('Successfully deleted issue!');
                let newData = issueEntryFieldList.data.filter(
                    (entry) => entry.ISSUE_ID !== id
                );
                setIssueEntryFieldList({
                    ...issueEntryFieldList,
                    data: newData,
                });
            }
            function onFailure() {
                setErrorBannerMessage('Failed to save! Please try again.');
                setErrorBannerFade(true);
            }
            deleteReq(
                setDeleteReq,
                endpointDELETE + issueID + '/',
                onFailure,
                successfullySaved,
                {
                    SCENARIO_ID: scenarioID,
                    ISSUE_ID: issueID,
                }
            );
        }
    };

    return (
        <div>
            {newIssue ? (
                <Typography variant="h6" align="center" color="error">
                    Unsaved
                </Typography>
            ) : null}
            <Box display="flex" flexDirection="row" p={1} m={1}>
                <Box p={2}>
                    <TextField
                        style={{ width: '65%' }}
                        id="outlined-text"
                        label="Issue"
                        value={issueName}
                        onChange={handleChangeName}
                        multiline
                        rows={2}
                        variant="outlined"
                    />
                    <TextField
                        style={{ width: '35%' }}
                        margin="normal"
                        id="outlined-number"
                        label="Importance Factor"
                        placeholder="0-5"
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
                            onClick={() => saveIssue()}
                        >
                            Save
                        </Button>
                    </div>
                    <div>
                        <Button
                            className={classes.button}
                            variant="contained"
                            color="primary"
                            onClick={() => deleteIssue()}
                        >
                            Delete
                        </Button>
                    </div>
                </Box>
            </Box>
        </div>
    );
}
