import React, { useState } from "react";
import {
  useFirestore,
  getServerTimestamp
} from "../../../data/context/firebase-context";
import PageHeader from "../../components/page-header/PageHeader";

const PostCreatePage: React.FC = () => {
  const [id, setId] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const firestore = useFirestore();

  const handleChangeId = (event: React.FormEvent<HTMLInputElement>): void => {
    event.preventDefault();
    const target = event.target as HTMLInputElement;
    setId(target.value);
  };

  const handleChangeTitle = (
    event: React.FormEvent<HTMLInputElement>
  ): void => {
    event.preventDefault();
    const target = event.target as HTMLInputElement;
    setTitle(target.value);
  };

  const handleChangeContent = (
    event: React.FormEvent<HTMLInputElement>
  ): void => {
    event.preventDefault();
    const target = event.target as HTMLInputElement;
    setContent(target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setSubmitted(true);
    console.log("Submitted!");
    createDocument();
  };

  const createDocument = (): void => {
    firestore
      .collection("posts")
      .add({ id, title, content, timestamp: getServerTimestamp() })
      .then(ref => {
        console.log("Added document with ID: ", ref.id);
      });
  };

  return (
    <div className="post-create-page container fade-in">
      <PageHeader title="CREATE POST" />

      <section className="section">
        <div className="container">
          <form onSubmit={handleSubmit}>
            <div className="field">
              <div className="control">
                <h2>ID: </h2>
                <input
                  className="input"
                  type="text"
                  placeholder="ID.."
                  value={id}
                  onChange={handleChangeId}
                />
                <h2>Title: </h2>
                <input
                  className="input"
                  type="text"
                  placeholder="Title.."
                  value={title}
                  onChange={handleChangeTitle}
                />
                <h2>Content: </h2>
                <input
                  className="input"
                  type="text"
                  placeholder="Content.."
                  value={content}
                  onChange={handleChangeContent}
                />
              </div>
            </div>

            <div className="field">
              <p className="control">
                Category:
                <span className="select">
                  <select>
                    <option>Life</option>
                    <option>Tutorial</option>
                  </select>
                </span>
              </p>
            </div>

            <div className="buttons">
              <button className="button is-primary" type="submit">
                Create Post
              </button>
              <button className="button is-link">Save for later</button>
            </div>
          </form>
          <br />
          <br />
          <br />
          {submitted && (
            <h1 className="title has-text-primary has-text-centered">
              Submitted!
            </h1>
          )}
        </div>
      </section>
    </div>
  );
};

export default PostCreatePage;
