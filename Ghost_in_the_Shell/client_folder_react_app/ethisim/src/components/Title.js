import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Editor } from '@tinymce/tinymce-react';

export default function Title() {

  let handleEditorChange = (content, editor) => {
    //TODO Implement
    console.log('HTML String:', content);
    console.log('Plain Text:', editor.getContent({format: 'text'}));
  }
  const apiKey = process.env.REACT_APP_TINY_MCE_API_KEY;

  return (
    <div>
      <Typography variant="h4" >
        Title:
      </Typography>
      <Editor
        apiKey={apiKey}
        initialValue="<p>Write in the title for your component.</p>"
        init={{
          height: 150,
          menubar: false,
          toolbar:
            'formatselect fontsizeselect | undo redo | help'
        }}
        onEditorChange={handleEditorChange}
       />
    </div>
  );
}
