import React, { useEffect, useState } from "react";
import PageHeader from "../../../components/page-header/PageHeader";
import { RouteComponentProps } from "react-router-dom";
import { timestampToDateString } from "../../../../util/timestampToDateString";
import Chapter from "../../../components/chapter/Chapter";
import { IChapter } from "../../../../types/IChapter";
import IPostType from "../../../../types/IPostType";
import { firestore } from "../../../../data/firebase";

type TParams = { id: string };

const PostViewPage = ({ match }: RouteComponentProps<TParams>) => {
  const postId: string = match.params.id;
  const [post, setPost] = useState<IPostType>();
  // const [postDoc, setPostDoc] = useState<firebase.firestore.DocumentSnapshot>();

  // GET POST FROM ROUTER PARAM
  useEffect(() => {
    console.log("get post");
    firestore
      .collection("posts")
      .doc(postId)
      .get()
      .then(doc => {
        if (doc.exists) {
          const data = doc.data();
          if (data) {
            const post: IPostType = {
              id: doc.id,
              title: data.title,
              descriptionShort: data.descriptionShort,
              category: data.category,
              chapters: data.chapters,
              timestamp: data.timestamp
            };
            setPost(post);
            console.log(post.chapters);
          }
        } else {
          console.log("No such document!");
        }
      })
      .catch(error => {
        throw new Error(error);
      });
  }, [postId]);

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
                </div>
              </div>
            </div>
          </section>
          <section className="section chapters">
            <div className="columns is-multiline">
              {post.chapters &&
                post.chapters.map((chapter: IChapter) => {
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
