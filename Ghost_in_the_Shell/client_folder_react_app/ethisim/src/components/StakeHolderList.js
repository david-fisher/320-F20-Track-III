
import React from 'react';
import StakeHolderListNode from '../components/StakeHolderListNode';

export default function StakeHolderList({stakeholders}){

  return(
      <div>
      {stakeholders.map(stakeholder=>(
        <StakeHolderListNode key={stakeholder.id} {...stakeholder} />
      ))}
    </div>
  );
}
