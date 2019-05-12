import React, { useEffect, useState } from "react";
import PageHeader from "../../components/page-header/PageHeader";
import { RouteComponentProps } from "react-router-dom";
import PostType from "../../../types/PostType";
import { useFirestore } from "../../../data/context/firebase-context";
import { timestampToDateString } from "../../../util/timestampToDateString";

type TParams = { id: string };

const PostViewPage = ({ match }: RouteComponentProps<TParams>) => {
  const postId: string = match.params.id;
  const firestore = useFirestore();
  const [post, setPost] = useState<PostType>();
  const [postDoc, setPostDoc] = useState<
    firebase.firestore.QueryDocumentSnapshot
  >();

  // GET POST FROM ROUTER PARAM
  useEffect(() => {
    firestore
      .collection("posts")
      .where("id", "==", postId)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log(doc.id, " => ", doc.data());
          setPostDoc(doc);
          setPost(doc.data() as PostType);
        });
      });
  }, [firestore, postId]);

  //   useEffect(() => {
  //     console.log(postDoc.)
  //   }, [post]);

  return (
    <div className="post-view-page fade-in">
      <PageHeader title="" />
      {post && (
        <div className="post-view-page-content">
          <section className="section hero is-primary">
            <div className="hero-body">
              <div className="level">
                <div className="level-left">
                  <div className="level-item">
                    <div>
                      <h1 className="title">{post.title}</h1>
                      <br />
                      <h2 className="subtitle">{post.descriptionShort}</h2>
                    </div>
                  </div>
                </div>

                <div className="level-right">
                  <div className="level-item">
                    <div>
                      <h2 className="subtitle">
                        {timestampToDateString(post.timestamp)}
                      </h2>
                      <p className="has-text-right has-text-grey-light is-uppercase has-text-weight-bold">
                        created
                      </p>
                      <br />
                      <h2 className="subtitle">
                        {timestampToDateString(post.timestamp)}
                      </h2>
                      <p className="has-text-right has-text-grey-light is-uppercase has-text-weight-bold">
                        edited
                      </p>
                    </div>
                  </div>
                  {/* <div className="level-item">
                    <div>
                      <span className="icon has-text-info">
                        <i className="fas fa-info-circle">COINCO</i>
                      </span>
                      <br />
                      <span className="icon has-text-info">
                        <i className="fas fa-info-circle">SAVE FOR LATER</i>
                      </span>
                      <br />
                      <span className="icon has-text-info">
                        <i className="fas fa-info-circle">SHARE</i>
                      </span>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </section>
          <section className="section chapters columns">
            <div className="chapter column has-background-light is-half is-offset-one-quarter">
              <article className="media">
                <figure className="media-left">
                  <p className="image is-64x64">
                    {/* <img src="https://bulma.io/images/placeholders/128x128.png" /> */}
                  </p>
                </figure>
                <div className="media-content">
                  <div className="content">
                    <p>
                      <strong>John Smith</strong> <small>@johnsmith</small>{" "}
                      <small>31m</small>
                      <br />
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Proin ornare magna eros, eu pellentesque tortor vestibulum
                      ut. Maecenas non massa sem. Etiam finibus odio quis
                      feugiat facilisis.
                    </p>
                  </div>
                  <nav className="level is-mobile">
                    <div className="level-left">
                      <div className="level-item">
                        <span className="icon is-small">
                          <i className="fas fa-reply" />
                        </span>
                      </div>
                      <div className="level-item">
                        <span className="icon is-small">
                          <i className="fas fa-retweet" />
                        </span>
                      </div>
                      <div className="level-item">
                        <span className="icon is-small">
                          <i className="fas fa-heart" />
                        </span>
                      </div>
                    </div>
                  </nav>
                </div>
                <div className="media-right">
                  <button className="delete" />
                </div>
              </article>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default PostViewPage;
