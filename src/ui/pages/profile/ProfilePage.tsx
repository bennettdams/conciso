import React, { useState } from "react";
import ProfileUserInformation from "./ProfileUserInformation";
import "./ProfilePage.scss";
import ProfilePosts from "./ProfilePosts";
import Button from "../../components/button/Button";
import Page from "../../components/layout/Page";
import Section from "../../components/layout/Section";

const ProfilePage: React.FC = () => {
  const [edit, setEdit] = useState<boolean>(false);

  return (
    <Page name="profile-page" title="PROFILE">
      <Section>
        <Button callback={() => setEdit(!edit)}>Edit</Button>
      </Section>
      <Section>
        <ProfileUserInformation edit={edit} />
      </Section>
      <Section>
        <ProfilePosts />
      </Section>
    </Page>
  );
};

export default ProfilePage;
