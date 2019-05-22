import * as React from "react";
import { useState, useRef } from "react";
import { Editor, EditorState, RichUtils, ContentBlock } from "draft-js";
import "./InputEditor.scss";

const InputEditor = () => {
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

  return (
    <div className="">
      <div className="input-editor box content">
        <Editor
          ref={editor}
          editorState={editorState}
          onChange={editorState => setEditorState(editorState)}
          blockStyleFn={customBlockStyle}
        />
      </div>
    </div>
  );
};

export default InputEditor;
