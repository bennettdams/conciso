import React, { useState, useEffect } from "react";
import Count from "../components/Count";
import { useFirestore } from "../../data/context/firebase-context";
import PostType from "../../types/PostType";

const Home: React.FC = () => {
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
    <div className="home">
      <section className="section">
        <div className="hero-body">
          <div className="container">
            <h1 className="title is-size-1 is-family-secondary">CONCISO</h1>
            <h2 className="subtitle is-size-3 is-italic is-family-primary">
              INFORMATION THAT HONORS YOUR TIME.
            </h2>
          </div>
        </div>
      </section>
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
                    <strong>{post.id}</strong>
                    <br />
                    {post.content}
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </section>
      <section className="section">
        <Count />
      </section>
    </div>
  );
};

export default Home;
