import React, { useState, useEffect } from "react";
import { useFirestore } from "../../data/context/firebase-context";
import PostType from "../../types/PostType";
import PageHeader from "../components/page-header/PageHeader";
import { timestampToDateString } from "../../util/timestampToDateString";
import { Link } from "react-router-dom";

const PostsPage: React.FC = () => {
  const firestore = useFirestore();
  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    firestore
      .collection("posts")
      .get()
      .then(snapshot => {
        // @ts-ignore
        setPosts(snapshot.docs.map(doc => doc.data()));
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
                    <div className="message-header">
                      <h1 className="is-size-2">{post.title}</h1>
                      <button className="delete" />
                    </div>
                    <div className="message-body box">
                      <strong>{post.id}</strong>
                      <br />
                      {post.descriptionShort}
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
