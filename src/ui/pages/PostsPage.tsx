import React, { useState, useEffect } from "react";
import { useFirestore } from "../../data/context/firebase-context";
import PostType from "../../types/PostType";
import PageHeader from "../components/page-header/PageHeader";

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
        <div className="columns is-8 is-hoverable">
          {posts.map((post: PostType) => {
            return (
              <div key={post.id} className="column is-full">
                <article className="message is-primary">
                  <div className="message-header">
                    <p>Post: {post.title}</p>
                    <button className="delete" />
                  </div>
                  <div className="message-body">
                    <strong>ID: {post.id}</strong>
                    <br />
                    {post.content}
                    <br />
                    {post.timestamp.toDate().toLocaleString()}
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default PostsPage;
