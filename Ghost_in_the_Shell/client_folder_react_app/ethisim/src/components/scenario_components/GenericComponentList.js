import React, {useState} from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import GenericComponent from './GenericComponent.js';


export default function GenericComponentList() {
  const [components, setComponent] = useState([<GenericComponent />])

  const addComponent = event => {
    setComponent(components.concat(<GenericComponent />))
    event.preventDefault()
  }

  return (
    <div>
      <Typography align="center" variant="h2">
        Generic Component List
              </Typography>
      {components}
      <Button variant="contained" color="grey" onClick={addComponent}>
        Add Generic Component
              </Button>
    </div>
  )
}