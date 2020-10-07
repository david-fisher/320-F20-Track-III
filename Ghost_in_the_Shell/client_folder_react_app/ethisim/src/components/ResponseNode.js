import React from 'react';
import { Editor } from '@tinymce/tinymce-react';



export default function ResponseNode() {
  return (
    <div>
        <Editor
        apiKey="sd525gpjpg57p2irp3p3nsdjmxj0j708hdfxp3iu0fdw3455"
        initialValue="<p>Write in body for your response.</p>"
        init={{
          height: 150,
          menubar: false,
          toolbar:
            'undo redo | formatselect | bold italic | removeformat | help'
        }}
        />
    </div>
  );
}
