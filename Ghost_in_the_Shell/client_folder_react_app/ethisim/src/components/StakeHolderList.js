import React from 'react';
import StakeHolderListNode from '../components/StakeHolderListNode';
import PropTypes from 'prop-types';

StakeHolderList.propTypes = {
    stakeholders: PropTypes.number.isRequired,
};

export default function StakeHolderList({ stakeholders }) {
    StakeHolderList.propTypes.stakeholders = { stakeholders };
    return (
        <div>
            {stakeholders.map((stakeholder) => (
                <StakeHolderListNode key={stakeholder.id} {...stakeholder} />
            ))}
        </div>
    );
}
