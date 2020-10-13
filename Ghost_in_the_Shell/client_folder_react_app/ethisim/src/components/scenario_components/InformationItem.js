import React, { useState } from 'react';
import suneditor from 'suneditor'
import SunEditor from "suneditor-react";
import Button from '@material-ui/core/Button';
import { getByText } from '@testing-library/react';

export default function InformationItem() {
  const [body, setBody] = useState("1ed");

  const saveIItem = event => {
    //TODO
    /*
      how do I get the body from the SunEditor?
    */
    setBody()
    event.preventDefault()
  }

  const deleteIItem = event => {
    //TODO
    /*
      we can simply filter by body text, and if any match this one's body text, we delete it
      but where is the body text stored?
    */
    event.preventDefault()
  }


  return (
    <div>
      {body}
      <SunEditor
        setOptions={{
          width: '100%',
          height: 400,
          placeholder: "Enter in introduction of component...",
          buttonList: [
            ['font', 'fontSize', 'formatBlock'],
            ['paragraphStyle', 'blockquote'],
            ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
            ['fontColor', 'hiliteColor', 'textStyle'],
            '/', // Line break
            ['undo', 'redo'],
            ['removeFormat'],
            ['outdent', 'indent'],
            ['align', 'horizontalRule', 'list', 'lineHeight'],
            ['table', 'link', 'image', 'video', 'audio'],
            ['fullScreen', 'showBlocks', 'codeView'],
            ['preview',],
          ]
        }}
      />

      <Button variant="contained" color="grey" onClick={saveIItem}>
        Save Information Item
              </Button>
      <Button variant="contained" color="primary" onClick={deleteIItem}>
        Delete Information Item
              </Button>

    </div>
  );
}
