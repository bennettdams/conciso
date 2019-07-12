import React, { useState, FormEvent } from "react";
import PageHeader from "../../components/page-header/PageHeader";

const ProfilePage: React.FC = () => {
  const [inputUsername, setInputUsername] = useState<string>("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("A username was submitted: " + inputUsername);
  };

  return (
    <div className="profile-page container fade-in">
      <PageHeader title="PROFILE" />
      <section className="posts">
        <div className="columns is-multiline">
          <form onSubmit={handleSubmit}>
            <label>
              Username:
              <input
                type="text"
                required
                value={inputUsername}
                onChange={(input: React.FormEvent<HTMLInputElement>) =>
                  setInputUsername(input.currentTarget.value)
                }
              />
            </label>
            <label>
              Name:
              <input
                type="text"
                value={inputUsername}
                onChange={(input: React.FormEvent<HTMLInputElement>) =>
                  setInputUsername(input.currentTarget.value)
                }
              />
            </label>
            <label>
              Title:
              <input
                type="text"
                value={inputUsername}
                onChange={(input: React.FormEvent<HTMLInputElement>) =>
                  setInputUsername(input.currentTarget.value)
                }
              />
            </label>

            <input type="submit" value="Submit" />
          </form>
          Name title description posts comments reach location other accounts
          member for 2 months profile views last seen coinciso
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;
