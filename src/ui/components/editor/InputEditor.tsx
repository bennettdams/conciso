import * as React from "react";
import { useState, useRef } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  ContentBlock,
  convertToRaw,
  RawDraftContentState
} from "draft-js";
import "./InputEditor.scss";

interface InputEditorProps {
  receiveContent: (rawContent: RawDraftContentState) => void;
}

const InputEditor = (props: InputEditorProps) => {
  const [editorState, setEditorState] = useState<EditorState>(
    RichUtils.toggleBlockType(EditorState.createEmpty(), "unordered-list-item")
  );
  const editor = useRef<Editor>(null);

  const customBlockStyle = (contentBlock: ContentBlock) => {
    const type = contentBlock.getType();
    switch (type) {
      case "unordered-list-item":
        return "input-editor-bullet";
      default:
        return "input-editor";
    }
  };

  const handleChange = (editorState: EditorState) => {
    setEditorState(editorState);
    props.receiveContent(convertToRaw(editorState.getCurrentContent()));

    // var rawData = Draft.convertToRaw(editorState.getCurrentContent())

    // To create an EditorState from the raw data:

    // var contentState = Draft.convertFromRaw(rawData) // convertFromRow already returns contentState, no need to 'createFromBlockArray()'
    // var editorState = Draft.EditorState.createWithContent(contentState)
  };

  return (
    <div className="input-editor box content">
      <Editor
        ref={editor}
        editorState={editorState}
        onChange={(editorState: EditorState) => handleChange(editorState)}
        blockStyleFn={customBlockStyle}
      />
    </div>
  );
};

export default InputEditor;
