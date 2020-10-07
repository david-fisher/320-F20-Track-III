import React from 'react';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';

import GenericNode from './GenericNode.js';


class GenericNodeList extends React.Component{
    state = {
        nodes: [<GenericNode />]
    }

    addNode(){
        //just like for responses, this doesn't work :()
        this.setState({
            nodes: [...this.state.nodes, <GenericNode />]
        })
    }

    render(){
        return (
            <div>
              <Typography align="center" variant="h2">
                Generic Node
              </Typography>
              {this.state.nodes}
              <button onClick={() => this.addNode}>
                <AddIcon></AddIcon> 
              </button>
            </div>
        )
    }
}

export default GenericNodeList