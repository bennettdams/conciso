import React from "react";
import IPost from "../../../types/IPost";
import { Link } from "react-router-dom";
import { timestampToDateString } from "../../../util/timestampToDateString";
import { useProfileState } from "../../../data/context/profile-context";

const ProfilePosts = () => {
  const { posts } = useProfileState();

  return (
    <div className="columns is-multiline">
      <p>posts</p>
      {posts.map((post: IPost) => {
        return (
          <div
            key={post.id}
            className="column is-three-fifths is-offset-one-fifth margin-big"
          >
            <Link to={"post/" + post.id}>
              <article className="message is-primary fade-in-slow">
                <div className="message-header post-header">
                  <div className="colums post-header is-multiline">
                    <div className="column is-full">
                      <h1 className="is-size-2">{post.title}</h1>
                    </div>
                    <div className="column is-full">
                      <span className="is-size-5 has-text-weight-light has-text-grey-lighter">
                        {post.descriptionShort}
                      </span>
                      <button className="delete is-pulled-right" />
                    </div>
                  </div>
                </div>
                <div className="message-body box">
                  <strong>{post.id}</strong>
                  <br />
                  {timestampToDateString(post.timestamp)}
                </div>
              </article>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default ProfilePosts;
