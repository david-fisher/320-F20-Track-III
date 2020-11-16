import React from 'react';
import { Button, Grid } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import PropTypes from 'prop-types';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    deleteButton: {
        minWidth: '40px',
        border: '3px solid',
        borderColor: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.light,
    },
    deleteButtonContainer: {
        display: 'flex',
        alignItems: 'center',
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

DeletePopup.propTypes = {
    id: PropTypes.number.isRequired,
    deleteByID: PropTypes.any.isRequired,
};

export default function DeletePopup(props) {
    DeletePopup.propTypes = props.data;
    const classes = useStyles();
    const data = props;
    const { deleteByID, id } = data;

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function handleDelete() {
        deleteByID(id);
    }

    return (
        <Grid item xs={2} className={classes.deleteButtonContainer}>
            <Button
                className={classes.deleteButton}
                color="primary"
                onClick={handleClickOpen}
            >
                <DeleteForeverIcon />
            </Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">
                    {'Are you sure you want to delete this?'}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Once this action is performed it cannot be undone
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDelete} color="primary">
                        Yes
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        No
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
}
