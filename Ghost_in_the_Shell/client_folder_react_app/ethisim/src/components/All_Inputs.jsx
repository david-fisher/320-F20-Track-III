import React, { Component } from "react";
import EntryField from "../Input";
import Button from "@material-ui/core/Button";

class EntryFields extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: [],
      entryCur: {
        key: " ",
        id: 0,
      },
    };
    this.addItem = this.addItem.bind(this);
  }

  handleDelete = (entryID) => {
    const entries = this.state.entries.filter((q) => q.id !== entryID);
    this.setState({ entries });
  };

  addItem(e) {
    e.preventDefault();
    const newEntry = this.state.entryCur;
    const newEntries = [...this.state.entries, newEntry];

    this.setState({
      entries: newEntries,
      entryCur: {
        key: " ",
        id: this.state.entryCur.id + 1,
      },
    });
  }

  render() {
    return (
      <div className="entries">
        <Button
          id="button"
          onClick={this.addItem}
          variant="contained"
          color="primary"
        >
          Create Issue
        </Button>

        <form id="form">
          {this.state.entries.map((entry) => (
            <EntryField
              key={entry.id}
              onDelete={this.handleDelete}
              entry={entry}
            />
          ))}
        </form>
      </div>
    );
  }
}

export default EntryFields;