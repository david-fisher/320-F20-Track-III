import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button, Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import GenericDeleteWarning from '../../DeleteWarnings/GenericDeleteWarning';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(0.5),
        marginTop: theme.spacing(0),
        width: '100%',
        textTransform: 'unset',
    },
}));

IssueEntryField.propTypes = {
    onDelete: PropTypes.any.isRequired,
    entry: PropTypes.any.isRequired,
};

export default function IssueEntryField(props) {
    const classes = useStyles();
    IssueEntryField.propTypes = props.data;
    const { issue, score } = props;

    //Used for Delete Warning
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    return (
        <div>
            <Box display="flex" flexDirection="row" p={1} m={1}>
                <Box p={1}>
                    <TextField
                        style={{ width: '75%' }}
                        id="outlined-text"
                        label="Issue"
                        value={issue}
                        multiline
                        rows={2}
                        variant="outlined"
                    />
                    <TextField
                        style={{ width: '25%' }}
                        margin="normal"
                        id="outlined-number"
                        label="Score"
                        value={score}
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
                        >
                            Save
                        </Button>
                    </div>
                    <Button
                        className={classes.button}
                        variant="contained"
                        color="primary"
                        onClick={handleClickOpen}
                    >
                        Delete
                    </Button>
                    <GenericDeleteWarning
                        remove={() => props.onDelete(props.entry.id)}
                        open={open}
                        setOpen={setOpen}
                    />
                </Box>
            </Box>
        </div>
    );
}
