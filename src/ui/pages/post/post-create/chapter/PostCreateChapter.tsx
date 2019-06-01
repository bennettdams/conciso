import React, { useState } from "react";
import InputEditor from "../../../../components/editor/InputEditor";
import { IChapter, IChapterContent } from "../../../../../types/IChapter";
import { RawDraftContentState } from "draft-js";

interface PostCreateChapterProps {
  chapterID: number;
  updateChapter: (chapter: IChapter) => void;
}

const PostCreateChapter: React.FC<PostCreateChapterProps> = props => {
  const [chapterTitle, setChapterTitle] = useState<string>("");

  const handleEditorContentChange = (rawContent: RawDraftContentState) => {
    const chapter: IChapter = {
      id: props.chapterID,
      title: chapterTitle,
      subtitle: "Chapter subtitle " + props.chapterID,
      content: []
    };

    chapter.content = rawContent.blocks.map(block => {
      const chapterContent: IChapterContent = {
        key: block.key,
        type: block.type,
        text: block.text
      };
      return chapterContent;
    });

    props.updateChapter(chapter);
  };

  return (
    <div className="columns is-multiline">
      <div className="column is-three-fifths">
        <div className="field">
          <div className="control">
            <input
              name="inputDescriptionShort"
              autoComplete="off"
              className="input is-size-6"
              type="text"
              placeholder="Chapter title.."
              value={chapterTitle}
              onChange={e => setChapterTitle(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="column is-full">
        <InputEditor receiveContent={handleEditorContentChange} />;
      </div>
    </div>
  );
};

export default PostCreateChapter;
