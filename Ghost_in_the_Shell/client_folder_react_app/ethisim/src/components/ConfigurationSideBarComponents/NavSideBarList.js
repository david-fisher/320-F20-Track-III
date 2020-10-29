import React from 'react';
import NavSideBarNode from '../ConfigurationSideBarComponents/NavSideBarNode';
import PropTypes from 'prop-types';

StakeHolderList.propTypes = {
    onClick: PropTypes.any.isRequired,
    deleteByID: PropTypes.any.isRequired,
    scenarioPages: PropTypes.any.isRequired,
};

export default function StakeHolderList(props) {
    StakeHolderList.propTypes = props.data;
    const data = props;
    const { onClick, deleteByID, scenarioPages } = data;

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
