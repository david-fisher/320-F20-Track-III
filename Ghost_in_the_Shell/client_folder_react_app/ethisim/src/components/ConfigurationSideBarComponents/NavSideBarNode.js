import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    pageButton: {
        width: '100%',
        minHeight: '50px',
        border: '3px solid',
        borderColor: theme.palette.primary.light,
        textTransform: 'unset',
    },
    deleteButtonContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    deleteButton: {
        minWidth: '40px',
        border: '3px solid',
        borderColor: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.light,
    },
}));

NavSideBarNode.propTypes = {
    onClick: PropTypes.any.isRequired,
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    deleteByID: PropTypes.any.isRequired,
    component: PropTypes.any.isRequired,
};

export default function NavSideBarNode(props) {
    const classes = useStyles();
    NavSideBarNode.propTypes = props.data;
    const data = props;
    const { onClick, deleteByID, id, title, component } = data;

    function handleDelete() {
        deleteByID(id);
    }

    function pageType(title) {
        if (
            title === 'Logistics' ||
            title === 'Conversation Editor' ||
            title === 'Configure Issues'
        ) {
            return (
                <Grid container direction="row" justify="flex-start">
                    <Grid item xs={10}>
                        <Button
                            className={classes.pageButton}
                            variant="contained"
                            color="primary"
                            onClick={handleDisplayComponent}
                        >
                            {title}
                        </Button>
                    </Grid>
                </Grid>
            );
        } else {
            return (
                <Grid container direction="row" justify="flex-start">
                    <Grid item xs={10}>
                        <Button
                            className={classes.pageButton}
                            variant="contained"
                            color="primary"
                            onClick={handleDisplayComponent}
                        >
                            {title}
                        </Button>
                    </Grid>

                    <Grid item xs={2} className={classes.deleteButtonContainer}>
                        <Button
                            className={classes.deleteButton}
                            color="primary"
                            onClick={handleDelete}
                        >
                            <DeleteForeverIcon />
                        </Button>
                    </Grid>
                </Grid>
            );
        }
    }

    function handleDisplayComponent() {
        onClick(component);
    }

    return <div>{pageType(title)}</div>;
}
