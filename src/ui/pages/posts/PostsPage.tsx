import React, { useState, useEffect } from "react";
import PageHeader from "../../components/page-header/PageHeader";
import { timestampToDateString } from "../../../util/timestampToDateString";
import { Link } from "react-router-dom";
import "./PostsPage.scss";
import IPostType from "../../../types/IPostType";
import { firestore } from "../../../data/firebase";

const PostsPage: React.FC = () => {
  const [posts, setPosts] = useState<IPostType[]>([]);

  // FETCH POSTS
  useEffect(() => {
    const unsubscribe = firestore.collection("posts").onSnapshot(snapshot => {
      const postsFetch: IPostType[] = snapshot.docs.map(doc => {
        const postFetch: IPostType = {
          id: doc.id,
          title: doc.data().title,
          descriptionShort: doc.data().descriptionShort,
          category: doc.data().category,
          chapters: doc.data().chapters,
          timestamp: doc.data().timestamp
        };
        return postFetch;
      });
      setPosts(postsFetch);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="posts-page container fade-in">
      <PageHeader title="POSTS" />
      <section className="posts">
        <div className="columns is-multiline">
          {posts.map((post: IPostType) => {
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
      </section>
    </div>
  );
};

export default PostsPage;
