import React, { Component, useState } from "react";
import InformationItem from "./InformationItem";
import Button from "@material-ui/core/Button";

export default function InformationItemList() {
  const [iItems, setIItems] = useState([]);
  const [nextIID, setIID] = useState(0);

  function addIItem(e) {
    e.preventDefault();
    const newIItem = {
      body: "",
      id: nextIID,
    }

    setIItems([...iItems, newIItem]);
    setIID(nextIID + 1);
  }

  function handleDelete(iItemID) {
    const newIItems = iItems.filter((q) => q.id !== iItemID);
    setIItems({ newIItems });
  };


  function updateIItem(iItemID, iItemBody) {
    //TODO
    //functional code to save items to backend
  }

  return (
    <div className="InformationItems">
      <Button
        id="button"
        onClick={addIItem}
        variant="contained"
        color="primary"
      >
        Add Information Item
      </Button>

      <form id="form">
        {iItems.map((iItem) => (
          <InformationItem
            key={iItem.id}
            onDelete={handleDelete}
            iItem={iItem}
          />
        ))}
      </form>
    </div>
  );
}