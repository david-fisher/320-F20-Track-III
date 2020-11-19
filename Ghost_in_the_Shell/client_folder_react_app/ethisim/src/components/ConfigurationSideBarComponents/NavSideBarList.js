import React from 'react';
import NavSideBarNode from '../ConfigurationSideBarComponents/NavSideBarNode';
import PropTypes from 'prop-types';

NavSideBarList.propTypes = {
    onClick: PropTypes.any.isRequired,
    deleteByID: PropTypes.any.isRequired,
    scenarioPages: PropTypes.any.isRequired,
};

export default function NavSideBarList(props) {
    NavSideBarList.propTypes = props.data;
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
