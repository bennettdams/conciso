import React, { useReducer } from "react";
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

import "./PostCreatePage.scss";

interface IState {
  title: string;
  descriptionShort: string;
  category: string;
  chapters: IChapter[];
  submitted: boolean;
}

type ActionType =
  | { type: "reset" }
  | { type: "title"; title: string }
  | { type: "descriptionShort"; descriptionShort: string }
  | { type: "category"; category: string }
  | { type: "chapters"; chapters: IChapter[] }
  | { type: "submitted"; submitted: boolean };

const initialState: IState = {
  title: "",
  descriptionShort: "",
  category: "",
  chapters: [],
  submitted: false
};

const formReducer = (state: IState, action: ActionType) => {
  switch (action.type) {
    case "title":
      return { ...state, title: action.title };
    case "descriptionShort":
      return { ...state, descriptionShort: action.descriptionShort };
    case "category":
      return { ...state, category: action.category };
    case "chapters":
      return { ...state, chapters: action.chapters };
    case "submitted":
      return { ...state, submitted: action.submitted };
    case "reset":
      return {
        ...state,
        title: "",
        descriptionShort: "",
        category: ""
      };
    default:
      throw new Error();
  }
};

const PostCreatePage: React.FC = () => {
  const [
    { title, descriptionShort, category, chapters, submitted },
    dispatch
  ] = useReducer(formReducer, initialState);
  const firestore = useFirestore();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    dispatch({ type: "submitted", submitted: true });
    console.log("Submitted!");
    createPost();
    dispatch({ type: "reset" });
  };

  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (event && event.keyCode && event.keyCode === 13) {
      event.preventDefault();
      console.log("enter");
    }
  };

  const createPost = (): void => {
    const post: IPostType = {
      id: "",
      title,
      descriptionShort,
      timestamp: getServerTimestamp() as firebase.firestore.Timestamp,
      category
    };
    delete post.id;
    firestore
      .collection("posts")
      .add(post)
      .then(ref => {
        console.log("Added document with ID: ", ref.id);
      });
  };

  const handleSelectedCategory = (categorySelected: string) =>
    dispatch({ type: "category", category: categorySelected });

  return (
    <div className="post-create-page container fade-in">
      <PageHeader title="CREATE POST" />

      <section className="section">
        <div className="container">
          <form onSubmit={handleSubmit}>
            <div className="columns is-multiline">
              {/*  */}
              <div className="column is-full">
                <div className="field">
                  {/* <label className="label">Title</label> */}
                  <div className="control">
                    <input
                      name="inputTitle"
                      autoComplete="off"
                      className="input title-input is-size-2"
                      type="text"
                      placeholder="Enter a title.."
                      value={title}
                      onChange={e =>
                        dispatch({ type: "title", title: e.target.value })
                      }
                      onKeyDown={handleKeyPress}
                    />
                  </div>
                </div>
              </div>
              {/*  */}
              <div className="column is-three-fifths is-offset-one-fifth">
                <div className="field">
                  {/* <label className="label">Short description</label> */}
                  <div className="control">
                    <input
                      name="inputDescriptionShort"
                      autoComplete="off"
                      className="input description-short-input is-size-4"
                      type="text"
                      placeholder="Describe your post.."
                      value={descriptionShort}
                      onChange={e =>
                        dispatch({
                          type: "descriptionShort",
                          descriptionShort: e.target.value
                        })
                      }
                    />
                  </div>
                </div>
              </div>
              {/*  */}
            </div>
            {/*  */}
            <div className="columns is-multiline">
              {/*  */}
              <div className="column is-three-fifths is-offset-one-fifth">
                <div className="field">
                  <label className="label">Category</label>
                  <div className="codntrol">
                    <Dropdown
                      dispatchSelected={handleSelectedCategory}
                      dropdownItems={POST_CATEGORIES.map(category => {
                        return { id: category.id, text: category.name };
                      })}
                    />
                  </div>
                </div>
              </div>
              {/*  */}
            </div>
            {/*  */}
            <div className="columns">
              <div className="column is-full">
                <div className="buttons">
                  <button type="submit" className="button is-primary">
                    Create Post
                  </button>
                  <button className="button is-link">Save for later</button>
                </div>
              </div>
            </div>
            {/*  */}
            <div className="columns">
              <div className="column is-full">
                <div className="column is-three-fifths is-offset-one-fifth">
                  <InputEditor />
                </div>
              </div>
            </div>
            {/*  */}
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
