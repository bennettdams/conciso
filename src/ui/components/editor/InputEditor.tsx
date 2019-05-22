import * as React from "react";
import { useState, useRef } from "react";
import { Editor, EditorState, RichUtils, ContentBlock } from "draft-js";
import "./InputEditor.scss";

const InputEditor = () => {
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );
  const editor = useRef<Editor>(null);

  React.useEffect(() => {
    toggleBlockType();
  }, []);

  const toggleBlockType = () => {
    setEditorState(
      RichUtils.toggleBlockType(editorState, "unordered-list-item")
    );
  };

  const customBlockStyle = (contentBlock: ContentBlock) => {
    const type = contentBlock.getType();
    switch (type) {
      case "unordered-list-item":
        return "input-editor-bullet";
        break;
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
