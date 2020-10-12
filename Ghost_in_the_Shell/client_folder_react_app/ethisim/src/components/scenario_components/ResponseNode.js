import React from 'react';
import SunEditor from "suneditor-react";
import 'suneditor/dist/css/suneditor.min.css';
import Button from '@material-ui/core/Button';

export default function ResponseNode() {
  return (
    <div>
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
      <Button variant="contained" color="grey" >
        Save Response
              </Button>
      <Button variant="contained" color="primary" >
        Delete Response
              </Button>

    </div>
  );
}
