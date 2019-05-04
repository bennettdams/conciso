import React, { useState } from "react";
import { useFirestore } from "../../data/context/firebase-context";

const Post: React.FC = () => {
  const [id, setId] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const firestore = useFirestore();

  const handleChangeId = (event: React.FormEvent<HTMLInputElement>): void => {
    const target = event.target as HTMLInputElement;
    console.log("ID state change: " + target.value);
    setId(target.value);
    event.preventDefault();
  };

  const handleChangeTitle = (
    event: React.FormEvent<HTMLInputElement>
  ): void => {
    const target = event.target as HTMLInputElement;
    console.log("Title state change: " + target.value);
    setTitle(target.value);
    event.preventDefault();
  };

  const handleChangeContent = (
    event: React.FormEvent<HTMLInputElement>
  ): void => {
    const target = event.target as HTMLInputElement;
    console.log("Content state change: " + target.value);
    setContent(target.value);
    event.preventDefault();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    setSubmitted(true);
    console.log({ id, title, content });
    event.preventDefault();
    createDocument();
  };

  const createDocument = (): void => {
    firestore
      .collection("posts")
      .doc("test123")
      .set({ id, title, content });
  };

  return (
    <div className="post container">
      <section className="section">
        <div className="hero-body">
          <div className="container">
            <h1 className="title is-size-1 is-family-secondary">POST</h1>
          </div>
        </div>
      </section>
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

export default Post;
