import React, { useEffect, useState } from "react";
import { useFirestore } from "../../data/context/firebase-context";
import PostType from "../../types/PostType";

const HomePage: React.FC = () => {
  const firestore = useFirestore();
  const [amountPosts, setAmountPosts] = useState<PostType[]>([]);

  useEffect(() => {
    firestore
      .collection("posts")
      .get()
      .then(snapshot => {
        // @ts-ignore
        setAmountPosts(snapshot.docs.length);
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });
  }, [firestore]);
  return (
    <div className="home-page container fade-in">
      <section className="section">
        <div className="hero-body">
          <div className="container">
            <h1 className="title is-size-1 has-text-primary is-family-secondary">
              CONCISO
            </h1>
            <h2 className="subtitle is-size-3 is-italic is-family-primary">
              INFORMATION THAT HONORS YOUR TIME.
            </h2>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="level">
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Posts</p>
              <p className="title is-size-1 has-text-primary">{amountPosts}</p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Posts</p>
              <p className="title is-size-1 has-text-primary">123</p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Posts</p>
              <p className="title is-size-1 has-text-primary">456K</p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Posts</p>
              <p className="title is-size-1 has-text-primary">789</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
