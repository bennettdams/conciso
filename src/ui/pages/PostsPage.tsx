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
                className="column is-half is-offset-one-quarter"
              >
                <Link className="navbar-ite" to={"post/" + post.id}>
                  <article className="message is-primary fade-in-slow">
                    <div className="message-header">
                      <p>{post.title}</p>
                      <button className="delete" />
                    </div>
                    <div className="message-body">
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
