import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Editor } from '@tinymce/tinymce-react';

export default function Introduction() {
  
  let handleEditorChange = (content, editor) => {
    //TODO Implement
    console.log('HTML String:', content);
    console.log('Plain Text:', editor.getContent({format: 'text'}));
  }
  const apiKey = process.env.REACT_APP_TINY_MCE_API_KEY;
  return (
    <div>
      <Typography variant="h4" >
        Introduction:
      </Typography>
      <Editor
        apiKey={apiKey}
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
            'formatselect fontsizeselect | bold italic backcolor | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat | undo redo | help'
        }}
        onEditorChange={handleEditorChange}
       />
    </div>
  );
}
