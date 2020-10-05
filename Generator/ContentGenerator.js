import React, { Component } from "react"
import classes from "./Content.module.css"
import { EditorState, convertToRaw, ContentState, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {}

        const content = window.localStorage.getItem('content');

        if (content) {
            this.state.editorState = EditorState.createWithContent(convertFromRaw(JSON.parse(content)));
        } else {
            this.state.editorState = EditorState.createEmpty();
        }
    }
    state = {
        contentState: null
    }

    onEditorStateChange = (editorState) => {
        const contentState = editorState.getCurrentContent();
        this.saveContent(contentState);
        this.setState({
            editorState,
        });
    }

    saveContent = (content) => {
        window.localStorage.setItem('content', JSON.stringify(convertToRaw(content)));
    }


    render() {

        const { editorState } = this.state;

        return (
            <div className={classes.container + " container"}>
                <Editor
                    editorState={editorState}
                    wrapperClassName={classes.editorWrapper}
                    editorClassName="demo-editor"
                    onEditorStateChange={this.onEditorStateChange}
                />
                <input type="text" value={JSON.stringify(JSON.stringify(convertToRaw(editorState.getCurrentContent())))} />
            </div>
        )
    }
}

export default Content