
import React from 'react';
import NavSideBarNode from '../components/NavSideBarNode';

export default function StakeHolderList({onClick,deleteByID,scenarioPages}){
  return(
    <div>
      {scenarioPages.map(scenarioPage=>(
        <NavSideBarNode key={scenarioPage.id} onClick={onClick} deleteByID={deleteByID} {...scenarioPage} />
      ))}
    </div>
  );
}
