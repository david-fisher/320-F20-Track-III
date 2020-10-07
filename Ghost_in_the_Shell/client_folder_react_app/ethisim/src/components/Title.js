import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Editor } from '@tinymce/tinymce-react';

export default function Title() {

  let handleEditorChange = (content, editor) => {
    //TODO Implement
    console.log('HTML String:', content);
    console.log('Plain Text:', editor.getContent({format: 'text'}));
  }

  return (
    <div>
      <Typography variant="h4" >
        Title:
      </Typography>
      <Editor
        apiKey="sd525gpjpg57p2irp3p3nsdjmxj0j708hdfxp3iu0fdw3455"
        initialValue="<p>Write in the title for your component.</p>"
        init={{
          height: 150,
          menubar: false,
          toolbar:
            'undo redo | formatselect | bold italic | removeformat | help'
        }}
        onEditorChange={handleEditorChange}
       />
    </div>
  );
}
