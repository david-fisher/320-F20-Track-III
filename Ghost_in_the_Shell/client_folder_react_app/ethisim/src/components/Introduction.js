import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Editor } from '@tinymce/tinymce-react';

export default function Introduction() {
  
  let handleEditorChange = (content, editor) => {
    //TODO Implement
    console.log('Content was updated:', content);
  }
  return (
    <div>
      <Typography variant="h4" >
        Introduction:
      </Typography>
      <Editor
        initialValue="<p>Write in your introduction for your component.</p>"
        init={{
          height: 350,
          menubar: true,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount'
          ],
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
