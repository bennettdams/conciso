import React, { useState } from "react";
import {
  useFirestore,
  getServerTimestamp
} from "../../../data/context/firebase-context";
import PageHeader from "../../components/page-header/PageHeader";
import PostType from "../../../types/PostType";

const PostCreatePage: React.FC = () => {
  const [id, setId] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [descriptionShort, setDescriptionShort] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const firestore = useFirestore();

  const handleChangeInput = (
    event: React.FormEvent<HTMLInputElement>
  ): void => {
    event.preventDefault();
    const target = event.target as HTMLInputElement;
    switch (target.name) {
      case "inputId":
        setId(target.value);
        break;
      case "inputTitle":
        setTitle(target.value);
        break;
      case "inputDescriptionShort":
        setDescriptionShort(target.value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setSubmitted(true);
    console.log("Submitted!");
    createPost();
    setId("");
    setTitle("");
    setDescriptionShort("");
  };

  const createPost = (): void => {
    firestore
      .collection("posts")
      .add({
        id,
        title,
        descriptionShort,
        timestamp: getServerTimestamp()
      } as PostType)
      .then(ref => {
        console.log("Added document with ID: ", ref.id);
      });
  };

  return (
    <div className="post-create-page container fade-in">
      <PageHeader title="CREATE POST" />

      <section className="section is-fullheight">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-half box">
              <form onSubmit={handleSubmit}>
                <div className="field">
                  <label className="label">ID</label>
                  <div className="control">
                    <input
                      name="inputId"
                      className="input"
                      type="text"
                      placeholder="ID.."
                      value={id}
                      onChange={handleChangeInput}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Title</label>
                  <div className="control">
                    <input
                      name="inputTitle"
                      className="input"
                      type="text"
                      placeholder="Title.."
                      value={title}
                      onChange={handleChangeInput}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Short description</label>
                  <div className="control">
                    <input
                      name="inputDescriptionShort"
                      className="input"
                      type="text"
                      placeholder="Short description.."
                      value={descriptionShort}
                      onChange={handleChangeInput}
                    />
                  </div>
                </div>

                <div className="field">
                  <label className="label">Category</label>
                  <div className="control">
                    <span className="select">
                      <select>
                        <option>Life</option>
                        <option>Tutorial</option>
                      </select>
                    </span>
                  </div>
                </div>

                <div className="buttons">
                  <button className="button is-primary" type="submit">
                    Create Post
                  </button>
                  <button className="button is-link">Save for later</button>
                </div>
              </form>
            </div>
          </div>
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
