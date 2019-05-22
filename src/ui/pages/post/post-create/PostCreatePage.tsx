import React, { useState } from "react";
import {
  useFirestore,
  getServerTimestamp
} from "../../../../data/context/firebase-context";
import PageHeader from "../../../components/page-header/PageHeader";
import { POST_CATEGORIES } from "../../../../constants/post/categories";
import IPostType from "../../../../types/IPostType";
import InputEditor from "../../../components/editor/InputEditor";

const PostCreatePage: React.FC = () => {
  const [id, setId] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [descriptionShort, setDescriptionShort] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const firestore = useFirestore();

  const handleChangeCategory = (event: React.FormEvent<HTMLSelectElement>) => {
    const target = event.target as HTMLSelectElement;
    setCategory(target.value);
    console.log(target.value);
  };

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
          <div className="columns is-centered">
            <div className="column is-half">
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
