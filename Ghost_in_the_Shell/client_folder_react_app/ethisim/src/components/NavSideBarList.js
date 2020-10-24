import React from 'react';
import NavSideBarNode from '../components/NavSideBarNode';
import PropTypes from 'prop-types';

StakeHolderList.propTypes = {
    onClick: PropTypes.any.isRequired,
    deleteByID: PropTypes.any.isRequired,
    scenarioPages: PropTypes.any.isRequired,
};

export default function StakeHolderList({
    onClick,
    deleteByID,
    scenarioPages,
}) {
    StakeHolderList.propTypes.onClick = { onClick };
    StakeHolderList.propTypes.scenarioPages = { scenarioPages };
    StakeHolderList.propTypes.deleteByID = { deleteByID };
    return (
        <div>
            {scenarioPages.map((scenarioPage) => (
                <NavSideBarNode
                    key={scenarioPage.id}
                    onClick={onClick}
                    deleteByID={deleteByID}
                    {...scenarioPage}
                />
            ))}
        </div>
    );
}
