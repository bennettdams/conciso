import React from "react";

const ProfileTiles: React.FC = () => {
  return (
    <div className="tile is-ancestor">
      <div className="tile is-vertical is-8">
        <div className="tile">
          <div className="tile is-parent is-vertical">
            <article className="tile is-child notification is-primary">
              <p className="title">POSTS</p>
              <p className="subtitle">55</p>
            </article>
            <article className="tile is-child notification is-warning">
              <p className="title">COMMENTS</p>
              <p className="subtitle">123</p>
            </article>
          </div>
          <div className="tile is-parent">
            <article className="tile is-child notification is-info">
              <p className="title">COINCISO</p>
              <p className="subtitle">chart</p>
              <figure className="image is-4by3">
                {/* <img src="https://bulma.io/images/placeholders/640x480.png" /> */}
              </figure>
            </article>
          </div>
        </div>
        {/* <div className="tile is-parent">
        <article className="tile is-child notification is-danger">
          <p className="title">Wide tile</p>
          <p className="subtitle">Aligned with the right tile</p>
          <div className="content">Content</div>
        </article>
      </div> */}
      </div>
      {/* <div className="tile is-parent">
      <article className="tile is-child notification is-success">
        <div className="content">
          <p className="title">Tall tile</p>
          <p className="subtitle">With even more content</p>
          <div className="content">Content</div>
        </div>
      </article>
    </div> */}
    </div>
  );
};

export default ProfileTiles;
