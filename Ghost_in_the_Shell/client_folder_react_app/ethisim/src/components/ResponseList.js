import React from 'react';
import Typography from '@material-ui/core/Typography';
import ResponseNode from './ResponseNode.js'

class ResponseList extends React.Component{
    state = {
        responses: [<ResponseNode />]
    }

    addResponse(){
        //this part doesn't actually work :()
        this.setState({
            responses: [...this.state.responses, <ResponseNode />]
        })
    }

    render(){
        return (
            <div>
              <Typography align="center" variant="h2">
                Responses
              </Typography>
              {this.state.responses}
              <button onClick={() => this.addResponse}>
                Add Response
              </button>
            </div>
          );
    }
}

export default ResponseList