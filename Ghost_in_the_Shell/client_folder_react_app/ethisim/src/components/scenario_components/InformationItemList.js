import React, { Component } from "react";
import InformationItem from "./InformationItem";
import Button from "@material-ui/core/Button";

class InformationItemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      iItems: [],
      iItemCur: {
        body: "",
        id: 0,
      },
    };
    this.addItem = this.addItem.bind(this);
  }

  addItem(e) {
    e.preventDefault();
    const newIItem = this.state.iItemCur;
    const newIItems = [...this.state.iItems, newIItem];

    this.setState({
      iItems: newIItems,
      iItemCur: {
        body: "",
        id: this.state.iItemCur.id + 1,
      },
    });
  }

  handleDelete = (iItemID) => {
    const iItems = this.state.iItems.filter((q) => q.id !== iItemID);
    this.setState({ iItems });
  };

  updateItem = (iItemID, iItemBody) => {
    const newIItems = [...this.state.iItems];
    
    //does this even save stuff to the backend?
    newIItems.forEach(element => {if(element.props.id === iItemID){element.props.body = iItemBody}})
    this.setState({
      iItems: {newIItems},
      iItemCur: this.state.iItemCur
    })
  }

  render() {
    return (
      <div className="InformationItems">
        <Button
          id="button"
          onClick={this.addItem}
          variant="contained"
          color="primary"
        >
          Add Information Item
        </Button>

        <form id="form">
          {this.state.iItems.map((iItem) => (
            <InformationItem
              key={iItem.id}
              onDelete={this.handleDelete}
              iItem={iItem}
            />
          ))}
        </form>
      </div>
    );
  }
}

export default InformationItemList;