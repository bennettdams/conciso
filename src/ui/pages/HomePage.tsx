import React, { useEffect, useState } from "react";
import PostType from "../../types/IPostType";
import { firestore } from "../../data/firebase";

const HomePage: React.FC = () => {
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
  }, []);
  return (
    <div className="home-page container fade-in">
      <section className="section">
        <div className="hero-body">
          <h1 className="title is-size-1 has-text-primary has-text-centered is-family-secondary">
            CONCISO
          </h1>
          <h2 className="subtitle is-size-3 has-text-centered is-italic is-family-primary">
            INFORMATION THAT HONORS YOUR TIME.
          </h2>
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

      <section className="section">
        <div className="tile is-ancestor">
          <div className="tile is-vertical is-8">
            <div className="tile">
              <div className="tile is-parent is-vertical">
                <article className="tile is-child notification is-primary">
                  <p className="title">Tile 1</p>
                  <p className="subtitle">Tile 1 Title</p>
                </article>
                <article className="tile is-child notification is-warning">
                  <p className="title">Tile 2</p>
                  <p className="subtitle">Tile 2 title</p>
                </article>
              </div>
              <div className="tile is-parent">
                <article className="tile is-child notification is-info">
                  <p className="title">Middle tile</p>
                  <p className="subtitle">With an image</p>
                  <figure className="image is-4by3">
                    {/* <img src="https://bulma.io/images/placeholders/640x480.png" /> */}
                  </figure>
                </article>
              </div>
            </div>
            <div className="tile is-parent">
              <article className="tile is-child notification is-danger">
                <p className="title">Wide tile</p>
                <p className="subtitle">Aligned with the right tile</p>
                <div className="content">CONTENT</div>
              </article>
            </div>
          </div>
          <div className="tile is-parent">
            <article className="tile is-child notification is-primary">
              <div className="content">
                <p className="title">Tall tile</p>
                <p className="subtitle">With even more content</p>
                <div className="content">CONTENT</div>
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
