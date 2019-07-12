import React, { useState } from "react";
import PageHeader from "../../components/page-header/PageHeader";
import ProfileUserInformation from "./ProfileUserInformation";
import "./ProfilePage.scss";
import ProfilePosts from "./ProfilePosts";

const ProfilePage: React.FC = () => {
  const [edit, setEdit] = useState<boolean>(false);

  return (
    <div className="profile-page container fade-in">
      <PageHeader title="PROFILE" />
      <button className="btn-edit" onClick={() => setEdit(!edit)}>
        Edit
      </button>
      <section className="user-information">
        <ProfileUserInformation edit={edit} />
      </section>

      <section className="posts">
        <ProfilePosts />
      </section>
    </div>
  );
};

export default ProfilePage;
