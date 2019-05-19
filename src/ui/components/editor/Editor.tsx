import React, { useEffect, useState } from "react";
import { Editor as DraftJsEditor, EditorState, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";

const Editor: React.FC = () => {
  const editor = React.useRef<DraftJsEditor>(null);
  const [initialRender, setInitialRender] = useState<boolean>(true);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  function focusEditor() {
    if (editor && editor.current) {
      editor.current.focus();
    }
  }

  useEffect(() => {
    if (editor.current && initialRender) {
      setEditorState(
        RichUtils.toggleBlockType(editorState, "unordered-list-item")
      );
      setInitialRender(false);
      focusEditor();
    }
  }, [editorState, initialRender]);

  return (
    <div className="editor container fade-in" onClick={focusEditor}>
      <DraftJsEditor
        ref={editor}
        editorState={editorState}
        onChange={editorState => setEditorState(editorState)}
      />
    </div>
  );
};

export default Editor;
