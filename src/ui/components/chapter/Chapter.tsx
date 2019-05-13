import React from "react";
import { IChapter } from "../../../types/IChapter";

interface ChapterProps {
  chapter: IChapter;
}

const Chapter: React.FC<ChapterProps> = props => {
  return (
    <div className="box">
      <article className="media">
        <figure className="media-left">
          <div className="has-text-centered">
            <p className="heading is-size-3">&#35;{props.chapter.id}</p>
          </div>
          <p className="image is-64x64">
            {/* <img src="https://bulma.io/images/placeholders/128x128.png" /> */}
          </p>
        </figure>
        <div className="media-content">
          <div className="content">
            <div>
              <h1>
                <span className="has-text-weight-light is-size-2">
                  {props.chapter.title}
                </span>
              </h1>
              <small>{props.chapter.subtitle}</small>
              <br />
              <br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
              ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas
              non massa sem. Etiam finibus odio quis feugiat facilisis.
              <br />
            </div>
          </div>
        </div>
        <div className="media-right">
          <button className="delete" />
        </div>
      </article>
    </div>
  );
};

export default Chapter;
