import React from 'react';
import Typography from '@material-ui/core/Typography';
import SunEditor from "suneditor-react";
import 'suneditor/dist/css/suneditor.min.css';
import htmlToText from 'html-to-text';

export default function Introduction() {

  let handleChange = (content) => {
    //TODO Implement
    console.log(content);
    console.log(htmlToText.fromString(content));
  };

  return (
    <div>
      <Typography variant="h4" >
        Introduction:
      </Typography>
      <SunEditor 
        setOptions={{
          width:'100%',
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
        onChange={handleChange}
      />
    </div>
  );
}
