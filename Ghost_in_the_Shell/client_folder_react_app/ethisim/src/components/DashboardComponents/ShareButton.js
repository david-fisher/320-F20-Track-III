import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Typography,
    Button,
    Dialog,
    DialogActions,
    TextField,
    IconButton,
} from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
        textAlign: 'center',
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    shareInfo: {
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        paddingBottom: '6px',
        marginBottom: '6px',
    },
    saveButton: {
        margin: theme.spacing(2),
        float: 'right',
        textTransform: 'unset',
    },
}));

DialogTitle.propTypes = {
    onClose: PropTypes.any.isRequired,
};

function DialogTitle(props) {
    const classes = useStyles();
    const { onClose } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root}>
            <Typography variant="h6">Enter the Email Address of the Instructor</Typography>
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
}

export default function ShareDialog(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const [EnterEmail, setEnterEmail] = useState('');

    const onChangeEnterEmail = (event) => {
        setEnterEmail(event.target.value);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button
                variant="outlined"
                color="primary"
                onClick={handleClickOpen}
            >
                Share 
            </Button>
            <Dialog
                fullWidth={true}
                maxWidth="sm"
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle onClose={handleClose}></DialogTitle>
                
                <DialogActions>
                <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="Enter Email"
                        label="Enter Email"
                        name="Enter Email"
                        value={EnterEmail}
                        onChange={onChangeEnterEmail}
                    />
                    <Button
                        className={classes.saveButton}
                        autoFocus
                        color="primary"
                        onClick={handleClose}
                    >
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}