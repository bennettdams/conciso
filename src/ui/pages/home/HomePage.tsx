import React, { useEffect, useState } from "react";
import { firestore } from "../../../services/firebase/firebase-service";
import Page from "../../components/layout/Page";
import Section from "../../components/layout/Section";

const HomePage: React.FC = () => {
  const [amountPosts, setAmountPosts] = useState<number>(0);

  useEffect(() => {
    firestore
      .collection("posts")
      .get()
      .then(snapshot => {
        setAmountPosts(snapshot.docs.length);
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });
  }, []);
  return (
    <Page name="home-page">
      <Section>
        <div className="hero-body">
          <h1 className="title is-size-1 has-text-primary has-text-centered is-family-secondary">
            CONCISO
          </h1>
          <h2 className="subtitle is-size-3 has-text-centered is-italic is-family-primary">
            INFORMATION THAT HONORS YOUR TIME.
          </h2>
        </div>
      </Section>
      <Section>
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
      </Section>
    </Page>
  );
};

export default HomePage;
