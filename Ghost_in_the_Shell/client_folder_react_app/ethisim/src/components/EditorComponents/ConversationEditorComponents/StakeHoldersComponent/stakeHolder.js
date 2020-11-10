import React, { useState } from 'react';
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
import htmlToText from 'html-to-text';
import shemptylogo from './shemptylogo.png';
import PropTypes from 'prop-types';

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
};

export default function StakeHolder({
    name,
    bio,
    mainConvo,
    questionsResponses,
    stakeHolderIssues,
    id,
    removeStakeHolder,
}) {
    const classes = useStyles();

    const [openBio, setOpenBio] = useState(false);
    const [openMainConvo, setOpenMainConvo] = useState(false);
    const [openPointSelection, setOpenPointSelection] = useState(false);
    const [openQuestions, setOpenQuestions] = useState(false);

    //TABLE
    const [rows, setRows] = useState([]);

    const [row, setEdit] = useState({
        id: Math.floor(Math.random() * 10000),
        issuename: '  ',
        score: ' ',
        maxpoints: ' ',
    });

    const removeRow = (rowID) => {
        console.log(rowID);
        const leftRows = rows.filter((r) => r.id !== rowID);
        setRows(leftRows);
    };

    const addRow = (e) => {
        const newRows = [...rows, row];
        setRows(newRows);
        console.log(...rows);
        setEdit({ id: Math.floor(Math.random() * 10000) });
    };

    // eslint-disable-next-line
    function updateRow(rowID, rowBody) {
        //TODO
        //functional code to save items to backend
    }

    //TABLE

    const handleClickOpenBio = () => {
        setOpenBio(true);
    };
    const handleCloseBio = () => {
        setOpenBio(false);
    };
    const handleClickOpenMainConvo = () => {
        setOpenMainConvo(true);
    };
    const handleCloseMainConvo = () => {
        setOpenMainConvo(false);
    };

    const handleClickOpenPointSelection = () => {
        setOpenPointSelection(true);
    };
    const handleClosePointSelection = () => {
        setOpenPointSelection(false);
    };

    const handleClickOpenQuestions = () => {
        setOpenQuestions(true);
    };
    const handleCloseQuestions = () => {
        setOpenQuestions(false);
    };

    let handleChange = (content, editor) => {
        //TODO Implement
        console.log(content);
        console.log(htmlToText.fromString(content));
    };

    return (
        <div id="parent">
            <div id="SHname">
                <TextField label="StakeHolder Name" value={name} />
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

            <div id="SaveButton">
                <Button
                    variant="contained"
                    color="primary"
                    //onClick={() => updateStakeHolder(id)}
                >
                    Save
                </Button>
            </div>

            <div id="DeleteButton">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => removeStakeHolder(id)}
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
                            onChange={handleChange}
                        />
                    </DialogContent>
                    {/*
                    //may use this in the future
                    <DialogActions>
                        <Button
                            autoFocus
                            onClick={handleCloseBio}
                            color="primary"
                        >
                            Save changes
                        </Button>
                    </DialogActions>
                    */}
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
                            onChange={handleChange}
                        />
                    </DialogContent>
                    {/*
                    //may use in the future
                    <DialogActions>
                        <Button
                            autoFocus
                            onClick={handleCloseMainConvo}
                            color="primary"
                        >
                            Save changes
                        </Button>
                    </DialogActions>
                    */}
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
                        <h2>Questions</h2>
                    </DialogTitle>
                    <DialogContent>
                        <QuestionFields
                            questionsResponses={questionsResponses}
                        />
                    </DialogContent>
                </div>
            </Dialog>

            <Dialog
                onClose={handleClosePointSelection}
                aria-labelledby="customized-dialog-title"
                open={openPointSelection}
            >
                <DialogTitle
                    id="customized-dialog-title"
                    onClose={handleClosePointSelection}
                >
                    <h2>Point Selection</h2>
                    {
                        //TODO
                        //remove 'Add Issue' button; currently exists for testing
                    }
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={addRow}
                    >
                        Add Issue
                    </Button>
                </DialogTitle>
                <DialogContent>
                    <BasicTable removeRow={removeRow} rows={rows} />
                </DialogContent>
            </Dialog>
        </div>
    );
}
