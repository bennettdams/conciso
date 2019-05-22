import React, { useState } from "react";
import {
  useFirestore,
  getServerTimestamp
} from "../../../../data/context/firebase-context";
import PageHeader from "../../../components/page-header/PageHeader";
import { POST_CATEGORIES } from "../../../../constants/post/categories";
import IPostType from "../../../../types/IPostType";
import InputEditor from "../../../components/editor/InputEditor";
import Dropdown from "../../../components/dropdown/Dropdown";
import { IChapter } from "../../../../types/IChapter";
import { IDropdownItem } from "../../../../types/IDropdownItem";

const PostCreatePage: React.FC = () => {
  const [id, setId] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [descriptionShort, setDescriptionShort] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [chapters, setChapters] = useState<IChapter[]>([]);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const firestore = useFirestore();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setSubmitted(true);
    console.log("Submitted!");
    createPost();
    setId("");
    setTitle("");
    setDescriptionShort("");
    setCategory("");
  };

  const createPost = (): void => {
    const post: IPostType = {
      id,
      title,
      descriptionShort,
      timestamp: getServerTimestamp() as firebase.firestore.Timestamp,
      category
    };
    firestore
      .collection("posts")
      .add(post)
      .then(ref => {
        console.log("Added document with ID: ", ref.id);
      });
  };

  return (
    <div className="post-create-page container fade-in">
      <PageHeader title="CREATE POST" />

      <section className="section is-fullheight">
        <div className="container">
          <div className="columns is-multiline">
            <div className="column is-half is-offset-one-quarter box">
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
                      onChange={e => setId(e.target.value)}
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
                      onChange={e => setTitle(e.target.value)}
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
                      onChange={e => setDescriptionShort(e.target.value)}
                    />
                  </div>
                </div>

                <div className="field">
                  <label className="label">Category</label>
                  <div className="codntrol">
                    <Dropdown
                      dropdownItems={POST_CATEGORIES.map(category => {
                        return { id: category.id, text: category.name };
                      })}
                    />
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
            <div className="column is-three-fifths is-offset-one-fifth">
              <InputEditor />
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
