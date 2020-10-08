import React from 'react';
import Typography from '@material-ui/core/Typography';
import SunEditor from "suneditor-react";
import 'suneditor/dist/css/suneditor.min.css';
import htmlToText from 'html-to-text';


export default function Title() {

  let handleChange = (content, editor) => {
    //TODO Implement
    console.log(content);
    console.log(htmlToText.fromString(content));
  }

  return (
    <div>
      <Typography variant="h4" >
        Title:
      </Typography>
      <SunEditor
        setOptions={{
          width:'100%',
          height: 150,
          placeholder: "Enter in Title of component...",
          buttonList: [
            ['undo', 'redo'],
            ['fullScreen', 'preview'],
          ]}}
        onChange={handleChange}
      />
    </div>
  );
}
