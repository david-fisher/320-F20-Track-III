import React from 'react';
import Typography from '@material-ui/core/Typography';
import ResponseNode from './ResponseNode.js'

class ResponseList extends React.Component{
    state = {
        responses: [<ResponseNode />]
    }

    render(){
        return (
            <div>
              <Typography align="center" variant="h2">
                Responses
              </Typography>
              {this.state.responses}
              <button onClick={() => this.setState({responses: [...this.state.responses, <ResponseNode />]})}>
                Add Response
              </button>
            </div>
          );
    }
}

export default ResponseList