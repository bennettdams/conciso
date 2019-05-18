import React, { useEffect, useState } from "react";
import PageHeader from "../../../components/page-header/PageHeader";
import { RouteComponentProps } from "react-router-dom";
import { useFirestore } from "../../../../data/context/firebase-context";
import { timestampToDateString } from "../../../../util/timestampToDateString";
import Chapter from "../../../components/chapter/Chapter";
import { IChapter } from "../../../../types/IChapter";
import IPostType from "../../../../types/IPostType";

type TParams = { id: string };

const PostViewPage = ({ match }: RouteComponentProps<TParams>) => {
  const postId: string = match.params.id;
  const firestore = useFirestore();
  const [post, setPost] = useState<IPostType>();
  const [chapters, setChapters] = useState<IChapter[]>();
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
          setPostDoc(doc);
          setPost(doc.data() as IPostType);
        });
      })
      .catch(error => {
        throw new Error(error);
      });
  }, [firestore, postId]);

  useEffect(() => {
    if (postDoc) {
      postDoc.ref
        .collection("chapters")
        .get()
        .then(a => {
          setChapters(a.docs.map(doc => doc.data() as IChapter));
        });
    }
  }, [postDoc]);

  return (
    <div className="post-view-page fade-in">
      <PageHeader title="" />
      {post && (
        <div className="post hoverable">
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
                        <small>@johnsmith</small>
                      </h2>
                      <br />
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
          <section className="section chapters">
            <div className="columns is-multiline">
              {chapters &&
                chapters.map(chapter => {
                  return (
                    <div
                      key={chapter.id}
                      className="chapter column is-half is-offset-one-quarter margin"
                    >
                      <Chapter chapter={chapter} />
                    </div>
                  );
                })}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default PostViewPage;
