import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Editor } from '@tinymce/tinymce-react';

export default function Title() {

  let handleEditorChange = (content, editor) => {
    //TODO Implement
    console.log('Content was updated:', content);
  }

  return (
    <div>
      <Typography variant="h4" >
        Title:
      </Typography>
      <Editor
        initialValue="<p>Write in the title for your component.</p>"
        init={{
          height: 150,
          menubar: false,
          toolbar:
            'undo redo | formatselect | bold italic backcolor | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat | help'
        }}
        onEditorChange={handleEditorChange}
       />
    </div>
  );
}
