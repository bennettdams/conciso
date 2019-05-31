import React from "react";
import InputEditor from "../../../../components/editor/InputEditor";
import { IChapter, IChapterContent } from "../../../../../types/IChapter";
import { RawDraftContentState } from "draft-js";

interface PostCreateChapterProps {
  setChapter: (chapter: IChapter) => void;
}

const PostCreateChapter: React.FC<PostCreateChapterProps> = props => {
  const handleEditorContentChange = (rawContent: RawDraftContentState) => {
    const chapter: IChapter = {
      id: "1",
      title: "Chapter title 1",
      subtitle: "subChapter subtitle 1",
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

    props.setChapter(chapter);
  };

  return <InputEditor receiveContent={handleEditorContentChange} />;
};

export default PostCreateChapter;
