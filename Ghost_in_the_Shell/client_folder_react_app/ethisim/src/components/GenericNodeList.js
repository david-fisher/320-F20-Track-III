import React from 'react';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';

import GenericNode from './GenericNode.js';


class GenericNodeList extends React.Component{
    state = {
        nodes: [<GenericNode />]
    }

    render(){
        return (
            <div>
              <Typography align="center" variant="h2">
                Generic Node
              </Typography>
              {this.state.nodes}
              <button onClick={() => this.setState({nodes: [...this.state.nodes, <GenericNode />]})}>
                Add Generic Component
              </button>
            </div>
        )
    }
}

export default GenericNodeList