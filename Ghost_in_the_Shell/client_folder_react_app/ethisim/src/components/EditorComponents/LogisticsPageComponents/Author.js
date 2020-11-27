import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button, Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(0.5),
        marginTop: theme.spacing(0),
        textTransform: 'unset',
    },
    buttonContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));

Author.propTypes = {
    author: PropTypes.string,
    listOfAuthors: PropTypes.any,
    setListOfAuthors: PropTypes.any,
    id: PropTypes.number,
    removeAuthor: PropTypes.any,
};

export default function Author({
    author,
    listOfAuthors,
    setListOfAuthors,
    id,
    removeAuthor,
}) {
    const classes = useStyles();

    const [authorValue, setAuthorValue] = useState(author);
    const onChangeAuthor = (event) => {
        setAuthorValue(event.target.value);
        setListOfAuthors(
            listOfAuthors.map((data) => {
                if (data.id === id) {
                    return {
                        ...data,
                        author: event.target.value,
                    };
                }
                return data;
            })
        );
    };
    return (
        <div>
            <Grid container>
                <Grid item xs={10}>
                    <Box p={1}>
                        <form noValidate autoComplete="off">
                            <TextField
                                style={{ width: '100%' }}
                                id="outlined-multiline-static"
                                label="Author"
                                value={authorValue}
                                onChange={onChangeAuthor}
                                multiline
                            />
                        </form>
                    </Box>
                </Grid>
                <Grid item xs={2}>
                    <Box p={1} className={classes.buttonContainer}>
                        <Button
                            className={classes.margin}
                            variant="contained"
                            color="primary"
                            onClick={() => {}}
                        >
                            Delete
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
}
