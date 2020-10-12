import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import ResponseNode from './ResponseNode.js'
import Button from '@material-ui/core/Button';

export default function ResponseList() {

  const [responses, setResponse] = useState([<ResponseNode />])

  const addResponse = event => {
    setResponse(responses.concat(<ResponseNode />))
    event.preventDefault()
  }

  return (
    <div>
      <Typography align="center" variant="h2">
        Responses
              </Typography>
      {responses}
      <Button variant="contained" color="grey" onClick={addResponse}>
        Add Response
      </Button>
    </div>
  );
}