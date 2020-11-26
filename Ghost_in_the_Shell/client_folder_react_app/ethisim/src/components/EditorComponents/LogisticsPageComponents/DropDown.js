/* eslint-disable no-use-before-define */
import React, { useState } from 'react';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
// import Autocomplete from "@material-ui/lab/Autocomplete";
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Divider from '@material-ui/core/Divider';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes from 'prop-types';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" color="primary" />;

const useStyles = makeStyles((theme) => ({
    root: {
        width: 500,
        '& > * + *': {
            marginTop: theme.spacing(3),
        },
    },
}));

Tags.propTypes = {
    update: PropTypes.func,
    courses: PropTypes.array,
    current: PropTypes.array,
};

export default function Tags(props) {
    const classes = useStyles();
    const onTagsChange = (event, values) => {
        props.update(values);
    };

    return (
        <div className={classes.root}>
            <Autocomplete
                multiple
                id="checkboxes-tags-demo"
                options={props.courses}
                disableCloseOnSelect
                getOptionLabel={(option) => option.NAME}
                onChange={onTagsChange}
                defaultValue={props.current}
                renderOption={(option, { selected, inputValue }) => {
                    console.log('inputvalue', selected, inputValue);
                    return (
                        <React.Fragment>
                            <Checkbox
                                icon={icon}
                                checkedIcon={checkedIcon}
                                style={{ marginRight: 8 }}
                                checked={selected}
                            />
                            {option.NAME}
                        </React.Fragment>
                    );
                }}
                style={{ width: 500 }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="outlined"
                        label="Courses"
                        placeholder="Courses"
                        fullWidth
                    />
                )}
            />
            <Divider style={{ margin: '20px 0' }} />
        </div>
    );
}
