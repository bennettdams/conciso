import React, { useState, useEffect } from "react";
import { timestampToDateString } from "../../../util/timestampToDateString";
import { Link } from "react-router-dom";
import "./PostsPage.scss";
import IPost from "../../../types/IPost";
import { firestore } from "../../../services/firebase/firebase-service";
import Page from "../../components/layout/Page";
import Section from "../../components/layout/Section";

const PostsPage: React.FC = () => {
  const [posts, setPosts] = useState<IPost[]>([]);

  // FETCH POSTS
  useEffect(() => {
    const unsubscribe = firestore.collection("posts").onSnapshot(snapshot => {
      const postsFetch: IPost[] = snapshot.docs.map(doc => {
        const postFetch: IPost = {
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
    <Page name="posts-page" title="POSTS">
      <Section>
        <div className="columns is-multiline is-centered">
          {posts.map((post: IPost) => {
            return (
              <div key={post.id} className="column is-three-fifths">
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
      </Section>
    </Page>
  );
};

export default PostsPage;
