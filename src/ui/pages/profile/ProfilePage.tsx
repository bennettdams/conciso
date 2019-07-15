import React, { useState } from "react";
import PageHeader from "../../components/page-header/PageHeader";
import ProfileUserInformation from "./ProfileUserInformation";
import "./ProfilePage.scss";
import ProfilePosts from "./ProfilePosts";
import Button from "../../components/button/Button";

const ProfilePage: React.FC = () => {
  const [edit, setEdit] = useState<boolean>(false);

  return (
    <div className="profile-page container fade-in">
      <PageHeader title="PROFILE" />
      <section className="section">
        <Button callback={() => setEdit(!edit)}>Edit</Button>
      </section>
      <section className="section user-information">
        <ProfileUserInformation edit={edit} />
      </section>

      <section className="section posts">
        <ProfilePosts />
      </section>
    </div>
  );
};

export default ProfilePage;
