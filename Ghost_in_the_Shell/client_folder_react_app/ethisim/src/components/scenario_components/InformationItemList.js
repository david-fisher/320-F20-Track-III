import React, { useState } from 'react';
import InformationItem from './InformationItem';
import Button from '@material-ui/core/Button';

export default function InformationItemList() {
    //const [iItems, setIItems] = useState([]);
    //const [nextIID, setIID] = useState(0);
    const [state, setState] = useState({
        iItems: [],
        id: 0,
    });

    function addIItem(e) {
        e.preventDefault();
        const newIItem = {
            body: '',
            id: state.id,
        };

        const newIItems = [...state.iItems, newIItem];
        const newID = state.id + 1;

        setState({
            iItems: newIItems,
            id: newID,
        });
    }

    function handleDelete(iItemID) {
        const newIItems = state.iItems.filter((q) => q.id !== iItemID);
        setState({
            iItems: newIItems,
            id: state.id,
        });
    }

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
                {state.iItems.map((iItem) => (
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
