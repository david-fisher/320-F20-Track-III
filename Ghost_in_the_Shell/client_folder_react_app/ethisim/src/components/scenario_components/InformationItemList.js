import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import InformationItem from './InformationItem.js'
import Button from '@material-ui/core/Button';

export default function InformationItemList() {

  const [iItems, setIItem] = useState([<InformationItem />])

  const addIItem = event => {
    setIItem(iItems.concat(<InformationItem />))
    event.preventDefault()
  }

  return (
    <div>
      <Typography align="center" variant="h2">
        Information Items
              </Typography>
      {responses}
      <Button variant="contained" color="grey" onClick={addIItem}>
        Add Information Item
      </Button>
    </div>
  );
}