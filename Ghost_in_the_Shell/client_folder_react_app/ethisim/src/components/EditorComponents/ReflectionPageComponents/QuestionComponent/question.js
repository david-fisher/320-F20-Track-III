import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(0.5),
        marginTop: theme.spacing(0),
        width: 50,
    },
}));

QuestionField.propTypes = {
    removeQuestion: PropTypes.any.isRequired,
    question: PropTypes.any.isRequired,
};

export default function QuestionField(props) {
    const classes = useStyles();
    QuestionField.propTypes = props.data;

    return (
        <div>
            <Box
                display="flex"
                flexDirection="row"
                p={1}
                m={1}
                bgcolor="background.paper"
            >
                <Box p={1}>
                    <form noValidate autoComplete="off">
                        <TextField
                            style={{ width: 500 }}
                            id="outlined-multiline-static"
                            label="Question"
                            multiline
                            rows={2}
                            variant="outlined"
                        />
                    </form>
                </Box>
                <Box p={1}>
                    <div>
                        <Button
                            className={classes.margin}
                            variant="contained"
                            color="primary"
                        >
                            Save
                        </Button>
                    </div>
                    <div>
                        <Button
                            className={classes.margin}
                            variant="contained"
                            color="primary"
                            onClick={() =>
                                props.removeQuestion(props.question.id)
                            }
                        >
                            Delete
                        </Button>
                    </div>
                </Box>
            </Box>
        </div>
    );
}
