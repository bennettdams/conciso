import React, { useReducer } from "react";
import {
  useFirestore,
  getServerTimestamp,
  useFirebaseAuth
} from "../../../../../data/context/firebase-context";
import PageHeader from "../../../../components/page-header/PageHeader";
import { POST_CATEGORIES } from "../../../../../constants/post/categories";
import IPostType from "../../../../../types/IPostType";
import Dropdown from "../../../../components/dropdown/Dropdown";
import { IChapter } from "../../../../../types/IChapter";
import "./PostCreatePage.scss";

import PostCreateChapter from "../chapter/PostCreateChapter";

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
  | { type: "add_chapter" }
  | { type: "update_chapter"; chapter: IChapter }
  | { type: "submitted"; submitted: boolean };

const initialState: IState = {
  title: "",
  descriptionShort: "",
  category: "",
  chapters: [{ id: 1, title: "", subtitle: "", content: [] }],
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
    case "add_chapter":
      return {
        ...state,
        chapters: [
          ...state.chapters,
          {
            id: state.chapters.length + 1,
            title: "",
            subtitle: "",
            content: []
          }
        ]
      };
    case "update_chapter":
      return {
        ...state,
        chapters: state.chapters.map(chapter => {
          if (chapter.id === action.chapter.id) {
            return action.chapter;
          } else {
            return chapter;
          }
        })
      };
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
  const { isSignedIn } = useFirebaseAuth();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (!isSignedIn) {
      console.log("Please sign in!");
    } else {
      dispatch({ type: "submitted", submitted: true });
      console.log("Submitted!");
      createPost();
      dispatch({ type: "reset" });
    }
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
      category,
      chapters
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
              {!isSignedIn && (
                <div className="column is-full">
                  Please sign in to create a post!
                </div>
              )}
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
            <div className="columns is-multiline margin-big">
              {/*  */}
              <div className="column is-full">
                <div className="level">
                  <div className="level-left">
                    <div className="level-item">
                      <p className="subtitle is-5">CATEGORY</p>
                      <div className="field">
                        <div className="control">
                          <Dropdown
                            dispatchSelected={handleSelectedCategory}
                            dropdownItems={POST_CATEGORIES.map(category => {
                              return { id: category.id, text: category.name };
                            })}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="level-right">
                    <div className="level-item">
                      <div className="buttons">
                        <button type="submit" className="button is-primary">
                          Create Post
                        </button>
                        <button type="button" className="button is-link">
                          Save for later
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/*  */}
            </div>
            {/*  */}
            <div className="columns is-multiline">
              {chapters.map(chapter => {
                return (
                  <div
                    key={chapter.id}
                    className="column is-three-fifths is-offset-one-fifth"
                  >
                    <PostCreateChapter
                      chapterID={chapter.id}
                      updateChapter={(chapter: IChapter) =>
                        dispatch({ type: "update_chapter", chapter })
                      }
                    />
                  </div>
                );
              })}
            </div>
            {/*  */}
            <div className="columns">
              <div className="column is-three-fifths is-offset-one-fifth">
                <button
                  type="button"
                  onClick={() => dispatch({ type: "add_chapter" })}
                  className="button"
                >
                  ADD CHAPTER
                </button>
              </div>
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