import React, { useState, useEffect } from "react";
import { useFirestore } from "../../../data/context/firebase-context";
import PostType from "../../../types/IPostType";
import PageHeader from "../../components/page-header/PageHeader";
import { timestampToDateString } from "../../../util/timestampToDateString";
import { Link } from "react-router-dom";
import "./PostsPage.scss";
import IPostType from "../../../types/IPostType";

const PostsPage: React.FC = () => {
  const firestore = useFirestore();
  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    firestore
      .collection("posts")
      .get()
      .then(snapshot => {
        // @ts-ignore
        setPosts(
          snapshot.docs.map(doc => {
            const data = doc.data();
            const post: IPostType = {
              id: doc.id,
              title: data.title,
              descriptionShort: data.descriptionShort,
              category: data.category,
              chapters: data.chapters,
              timestamp: data.timestamp
            };
            return post;
          })
        );
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });
  }, [firestore]);

  return (
    <div className="posts-page container fade-in">
      <PageHeader title="POSTS" />
      <section className="posts">
        <div className="columns is-multiline">
          {posts.map((post: PostType) => {
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
