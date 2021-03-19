import React from 'react';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import parse from 'html-react-parser'

const PostJob = () => {

    const [text, setText] = React.useState("");
    return (
        <>
            <p>Post a job posting here</p>
            <div className="App">
                <h4>Enter Job Description</h4>
                <CKEditor
                    editor={ClassicEditor}
                    data={text}
                    onReady={editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log('Editor is ready to use!', editor);
                    }}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        setText(data)
                        console.log({ event, editor, data });
                    }}
                    onBlur={(event, editor) => {
                        console.log('Blur.', editor);
                    }}
                    onFocus={(event, editor) => {
                        console.log('Focus.', editor);
                    }}
                />
            </div>
            <p>{parse(text)}</p>
        </>

    )


}


export default PostJob
