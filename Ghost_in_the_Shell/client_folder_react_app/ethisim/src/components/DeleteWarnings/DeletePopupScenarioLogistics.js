import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const useStyles = makeStyles((theme) => ({
    buttons: {
        '& > *': {
            margin: theme.spacing(1),
            marginBottom: theme.spacing(1),
            width: '100%',
            textTransform: 'unset',
        },
    },
}));

DeletePopupScenarioLogistics.propTypes = {
    remove: PropTypes.any.isRequired,
};

export default function DeletePopupScenarioLogistics(props) {
    DeletePopupScenarioLogistics.propTypes = props.data;
    const data = props;
    const { remove } = data;
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    /*TODO
     * Set the onClick of the "No" button below to "remove" imported from props,
     * instead of handleClose. A remove func should be passed to Our
     * DeletePopupScenarioLogistics component in Logistics.js to allow for Deletion
     * functionailty of a scenario
     */
    return (
        <div>
            <Button
                className={classes.buttons}
                color="primary"
                onClick={handleClickOpen}
            >
                Delete Scenario
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
                        This action will delete the entire scenario and all the
                        work associated with this scenario. Once this action is
                        performed it cannot be undone!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Yes
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        No
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
