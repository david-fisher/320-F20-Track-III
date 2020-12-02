import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import BasicTable from './table';
import './stakeHolder.css';
import QuestionFields from './StakeHolderQuestions/questions';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import shemptylogo from './shemptylogo.png';
import PropTypes from 'prop-types';
import SuccessBanner from './../../../Banners/SuccessBanner';
import ErrorBanner from './../../../Banners/ErrorBanner';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    input: {
        display: 'none',
    },
}));

const styles = (theme) => ({
    root: {
        margin: 1,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton
                    aria-label="close"
                    className={classes.closeButton}
                    onClick={onClose}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

StakeHolder.propTypes = {
    name: PropTypes.string,
    bio: PropTypes.string,
    mainConvo: PropTypes.string,
    questionsResponses: PropTypes.any,
    stakeHolderIssues: PropTypes.any,
    id: PropTypes.number,
    removeStakeHolder: PropTypes.any,
    stakeHolder: PropTypes.any,
    stakeHolders: PropTypes.any,
    setStakeHolders: PropTypes.func,
};

export default function StakeHolder({
    name,
    bio,
    mainConvo,
    id,
    removeStakeHolder,
    job,
    stakeHolders,
    setStakeHolders,
}) {
    const classes = useStyles();

    const [openBio, setOpenBio] = useState(false);
    const [openMainConvo, setOpenMainConvo] = useState(false);
    const [openPointSelection, setOpenPointSelection] = useState(false);
    const [openQuestions, setOpenQuestions] = useState(false);
    const [stakeHolderName, setStakeHolderName] = useState(name);
    const [stakeHolderJob, setStakeHolderJob] = useState(job);
    const [stakeHolderBiography, setStakeHolderBiography] = useState(bio);
    const [stakeHolderConversation, setStakeHolderConversation] = useState(mainConvo);
    const [issues, setIssues] = useState([]);
    const [qRData, setQRData] = useState([]);

    const baseURL = 'http://127.0.0.1:8000/';

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

    //TABLE
    const [rows, setRows] = useState([]);

    const [row, setEdit] = useState({
        id: Math.floor(Math.random() * 10000),
        issuename: '  ',
        score: ' ',
        maxpoints: ' ',
    });

    const removeRow = (rowID) => {
        const leftRows = rows.filter((r) => r.id !== rowID);
        setRows(leftRows);
    };

    const addRow = (e) => {
        const newRows = [...rows, row];
        setRows(newRows);
        setEdit({ id: Math.floor(Math.random() * 10000) });
    };

    //TABLE
    const handleClickOpenBio = () => {
        setOpenBio(true);
    };
    const handleCloseBio = () => {
        updateBasicText(stakeHolderName, stakeHolderJob, stakeHolderBiography, stakeHolderConversation);
        setOpenBio(false);
    };
    const handleClickOpenMainConvo = () => {
        setOpenMainConvo(true);
    };
    const handleCloseMainConvo = () => {
        updateBasicText(stakeHolderName, stakeHolderJob, stakeHolderBiography, stakeHolderConversation);
        setOpenMainConvo(false);
    };

    const handleClickOpenPointSelection = () => {
        getIssues();
    };
    const handleClosePointSelection = () => {
        setOpenPointSelection(false);
    };

    const handleClickOpenQuestions = () => {
        getQRs();
    };
    const handleCloseQuestions = () => {
        setOpenQuestions(false);
    };

    let handleChangeBiography = (content, editor) => {
        setStakeHolderBiography(content);
    };

    let handleChangeConversation = (content, editor) => {
        setStakeHolderConversation(content);
    };

    const onChangeName = (e) => {
        setStakeHolderName(e.target.value);
        updateBasicText(e.target.value, stakeHolderJob, stakeHolderBiography, stakeHolderConversation);
    }

    const onChangeJob = (e) => {
        setStakeHolderJob(e.target.value);
        updateBasicText(stakeHolderName, e.target.value, stakeHolderBiography, stakeHolderConversation);
    }

    function updateBasicText(shname, shjob, shbio, shconvo) {
        const updatedStakeHolders = [...stakeHolders];
        setStakeHolders(updatedStakeHolders.map((sh) => {
            if (sh.STAKEHOLDER == id) {
                sh.NAME = shname;
                sh.JOB = shjob;
                sh.DESCRIPTION = shbio;
                sh.INTRODUCTION = shconvo;
            }
            return sh;
        }));
    }

    function getQRs() {
        var axios = require('axios');
        var data = {};

        var config = {
            method: 'get',
            url: baseURL + 'api/conversations/?STAKEHOLDER=' + id,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                setQRData(response.data);
                setOpenQuestions(true);
            })
            .catch(function (error) {
                setErrorBannerMessage('Failed to get the conversation(s) for this stakeholder! Please try again.');
                setErrorBannerFade(true);
            });
    }

    function getIssues() {
        var axios = require('axios');
        var data = '';

        var config = {
            method: 'get',
            url: baseURL + 'coverages?stakeholder_id=' + id,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                setIssues(response.data);
                setOpenPointSelection(true);
            })
            .catch(function (error) {
                setErrorBannerMessage('Failed to get the issue(s) for this stakeholder! Please try again.');
                setErrorBannerFade(true);
            });
    }

    return (
        <div id="parent">
            <div id="SHname">
                <TextField
                    label="StakeHolder Name"
                    value={stakeHolderName}
                    onChange={onChangeName}
                />
            </div>
            <div id="SHjob">
                <TextField
                    label="StakeHolder Job"
                    value={stakeHolderJob}
                    onChange={onChangeJob}
                />
            </div>
            <img id="stakeimg" src={shemptylogo} alt=" "></img>
            <label id="upl" htmlFor="contained-button-file">
                <input
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file"
                    multiple
                    type="file"
                />
                <label htmlFor="contained-button-file">
                    <Button
                        variant="contained"
                        color="primary"
                        component="span"
                        style={{ textTransform: 'unset' }}
                    >
                        Upload
                    </Button>
                </label>
                <input
                    accept="image/*"
                    className={classes.input}
                    id="icon-button-file"
                    type="file"
                />
            </label>

            <div id="Bio">
                <TextField
                    label="Biography"
                    style={{ width: 500 }}
                    multiline
                    rows={2}
                    variant="outlined"
                    onClick={handleClickOpenBio}
                />
            </div>

            <div id="MainConversationField">
                <TextField
                    label="Main Conversation"
                    style={{ width: 500 }}
                    multiline
                    rows={2}
                    variant="outlined"
                    onClick={handleClickOpenMainConvo}
                />
            </div>

            <div id="DeleteButton">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        removeStakeHolder(id);
                    }}
                >
                    Delete
                </Button>
            </div>

            <div id="PointButton">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleClickOpenPointSelection}
                >
                    Point Selection
                </Button>
            </div>

            <div id="stakequestion">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleClickOpenQuestions}
                >
                    View Questions
                </Button>
            </div>

            <Dialog
                onClose={handleCloseBio}
                aria-labelledby="customized-dialog-title"
                open={openBio}
                maxWidth={false}
            >
                <div style={{ width: 900 }}>
                    <DialogTitle
                        id="customized-dialog-title"
                        onClose={handleCloseBio}
                    >
                        Biography
                        (Changes are automatically saved upon closing)
                    </DialogTitle>
                    <DialogContent>
                        <SunEditor
                            setContents={bio}
                            setOptions={{
                                width: '100%',
                                height: 400,
                                placeholder:
                                    'Enter in introduction of component...',
                                buttonList: [
                                    ['font', 'fontSize', 'formatBlock'],
                                    ['paragraphStyle', 'blockquote'],
                                    [
                                        'bold',
                                        'underline',
                                        'italic',
                                        'strike',
                                        'subscript',
                                        'superscript',
                                    ],
                                    ['fontColor', 'hiliteColor', 'textStyle'],
                                    '/', // Line break
                                    ['undo', 'redo'],
                                    ['removeFormat'],
                                    ['outdent', 'indent'],
                                    [
                                        'align',
                                        'horizontalRule',
                                        'list',
                                        'lineHeight',
                                    ],
                                    [
                                        'table',
                                        'link',
                                        'image',
                                        'video',
                                        'audio',
                                    ],
                                    ['fullScreen', 'showBlocks', 'codeView'],
                                    ['preview'],
                                    // (min-width: 1000px)
                                    [
                                        '%1000',
                                        [
                                            ['undo', 'redo'],
                                            [
                                                ':p-More Paragraph-default.more_paragraph',
                                                'font',
                                                'fontSize',
                                                'formatBlock',
                                                'paragraphStyle',
                                                'blockquote',
                                            ],
                                            [
                                                'bold',
                                                'underline',
                                                'italic',
                                                'strike',
                                            ],
                                            [
                                                ':t-More Text-default.more_text',
                                                'subscript',
                                                'superscript',
                                                'fontColor',
                                                'hiliteColor',
                                                'textStyle',
                                            ],
                                            ['removeFormat'],
                                            ['outdent', 'indent'],
                                            [
                                                ':e-More Line-default.more_horizontal',
                                                'align',
                                                'horizontalRule',
                                                'list',
                                                'lineHeight',
                                            ],
                                            [
                                                '-right',
                                                ':i-More Misc-default.more_vertical',
                                                'fullScreen',
                                                'showBlocks',
                                                'codeView',
                                                'preview',
                                            ],
                                            [
                                                '-right',
                                                ':r-More Rich-default.more_plus',
                                                'table',
                                                'link',
                                                'image',
                                                'video',
                                                'audio',
                                            ],
                                        ],
                                    ],
                                    // (min-width: 875px)
                                    [
                                        '%875',
                                        [
                                            ['undo', 'redo'],
                                            [
                                                ':p-More Paragraph-default.more_paragraph',
                                                'font',
                                                'fontSize',
                                                'formatBlock',
                                                'paragraphStyle',
                                                'blockquote',
                                            ],
                                            [
                                                ':t-More Text-default.more_text',
                                                'bold',
                                                'underline',
                                                'italic',
                                                'strike',
                                                'subscript',
                                                'superscript',
                                                'fontColor',
                                                'hiliteColor',
                                                'textStyle',
                                                'removeFormat',
                                            ],
                                            [
                                                ':e-More Line-default.more_horizontal',
                                                'outdent',
                                                'indent',
                                                'align',
                                                'horizontalRule',
                                                'list',
                                                'lineHeight',
                                            ],
                                            [
                                                ':r-More Rich-default.more_plus',
                                                'table',
                                                'link',
                                                'image',
                                                'video',
                                                'audio',
                                            ],
                                            [
                                                '-right',
                                                ':i-More Misc-default.more_vertical',
                                                'fullScreen',
                                                'showBlocks',
                                                'codeView',
                                                'preview',
                                            ],
                                        ],
                                    ],
                                ],
                            }}
                            onChange={handleChangeBiography}
                        />
                    </DialogContent>
                </div>
            </Dialog>

            <Dialog
                onClose={handleCloseMainConvo}
                aria-labelledby="customized-dialog-title"
                maxWidth={false}
                open={openMainConvo}
            >
                <div style={{ width: 900 }}>
                    <DialogTitle
                        id="customized-dialog-title"
                        onClose={handleCloseMainConvo}
                    >
                        Main Coversation
                        (Changes are automatically saved upon closing)
                    </DialogTitle>
                    <DialogContent>
                        <SunEditor
                            setContents={mainConvo}
                            setOptions={{
                                height: 400,
                                placeholder:
                                    'Enter in introduction of component...',
                                buttonList: [
                                    ['font', 'fontSize', 'formatBlock'],
                                    ['paragraphStyle', 'blockquote'],
                                    [
                                        'bold',
                                        'underline',
                                        'italic',
                                        'strike',
                                        'subscript',
                                        'superscript',
                                    ],
                                    ['fontColor', 'hiliteColor', 'textStyle'],
                                    '/', // Line break
                                    ['undo', 'redo'],
                                    ['removeFormat'],
                                    ['outdent', 'indent'],
                                    [
                                        'align',
                                        'horizontalRule',
                                        'list',
                                        'lineHeight',
                                    ],
                                    [
                                        'table',
                                        'link',
                                        'image',
                                        'video',
                                        'audio',
                                    ],
                                    ['fullScreen', 'showBlocks', 'codeView'],
                                    ['preview'],
                                    // (min-width: 1000px)
                                    [
                                        '%1000',
                                        [
                                            ['undo', 'redo'],
                                            [
                                                ':p-More Paragraph-default.more_paragraph',
                                                'font',
                                                'fontSize',
                                                'formatBlock',
                                                'paragraphStyle',
                                                'blockquote',
                                            ],
                                            [
                                                'bold',
                                                'underline',
                                                'italic',
                                                'strike',
                                            ],
                                            [
                                                ':t-More Text-default.more_text',
                                                'subscript',
                                                'superscript',
                                                'fontColor',
                                                'hiliteColor',
                                                'textStyle',
                                            ],
                                            ['removeFormat'],
                                            ['outdent', 'indent'],
                                            [
                                                ':e-More Line-default.more_horizontal',
                                                'align',
                                                'horizontalRule',
                                                'list',
                                                'lineHeight',
                                            ],
                                            [
                                                '-right',
                                                ':i-More Misc-default.more_vertical',
                                                'fullScreen',
                                                'showBlocks',
                                                'codeView',
                                                'preview',
                                            ],
                                            [
                                                '-right',
                                                ':r-More Rich-default.more_plus',
                                                'table',
                                                'link',
                                                'image',
                                                'video',
                                                'audio',
                                            ],
                                        ],
                                    ],
                                    // (min-width: 875px)
                                    [
                                        '%875',
                                        [
                                            ['undo', 'redo'],
                                            [
                                                ':p-More Paragraph-default.more_paragraph',
                                                'font',
                                                'fontSize',
                                                'formatBlock',
                                                'paragraphStyle',
                                                'blockquote',
                                            ],
                                            [
                                                ':t-More Text-default.more_text',
                                                'bold',
                                                'underline',
                                                'italic',
                                                'strike',
                                                'subscript',
                                                'superscript',
                                                'fontColor',
                                                'hiliteColor',
                                                'textStyle',
                                                'removeFormat',
                                            ],
                                            [
                                                ':e-More Line-default.more_horizontal',
                                                'outdent',
                                                'indent',
                                                'align',
                                                'horizontalRule',
                                                'list',
                                                'lineHeight',
                                            ],
                                            [
                                                ':r-More Rich-default.more_plus',
                                                'table',
                                                'link',
                                                'image',
                                                'video',
                                                'audio',
                                            ],
                                            [
                                                '-right',
                                                ':i-More Misc-default.more_vertical',
                                                'fullScreen',
                                                'showBlocks',
                                                'codeView',
                                                'preview',
                                            ],
                                        ],
                                    ],
                                ],
                            }}
                            onChange={handleChangeConversation}
                        />
                    </DialogContent>
                </div>
            </Dialog>

            <Dialog
                onClose={handleCloseQuestions}
                aria-labelledby="customized-dialog-title"
                maxWidth={false}
                open={openQuestions}
            >
                <div style={{ width: 900 }}>
                    <DialogTitle
                        id="customized-dialog-title"
                        onClose={handleCloseQuestions}
                    >
                        <h2 className="questions-header">Questions</h2>
                    </DialogTitle>
                    <DialogContent>
                        <QuestionFields
                            qrs={qRData}
                            stakeholder_id={id}
                        />
                    </DialogContent>
                </div>
            </Dialog>

            <Dialog
                onClose={handleClosePointSelection}
                aria-labelledby="customized-dialog-title"
                open={openPointSelection}
            >
                <div className="point-selection-body" style={{ width: 500 }}>
                    <DialogTitle
                        id="customized-dialog-title"
                        onClose={handleClosePointSelection}
                    >
                        <h2 className="point-selection-header">
                            Point Selection
                        </h2>
                    </DialogTitle>
                    <DialogContent>
                        <BasicTable 
                            removeRow={removeRow} 
                            rows={rows}
                            //additional parameters here
                        />
                    </DialogContent>
                </div>
            </Dialog>
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
