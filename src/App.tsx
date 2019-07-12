import React from "react";
import "./App.scss";
// import "bulma";

// ROUTING
import { BrowserRouter as Router, Route } from "react-router-dom";
import ROUTES from "./constants/routes";

// COMPONENTS
import "./ui/styles/global.scss";
import HomePage from "./ui/pages/home/HomePage";
import ContactPage from "./ui/pages/contact/ContactPage";
import PostsPage from "./ui/pages/posts/PostsPage";
import PostCreatePage from "./ui/pages/post/post-create/page/PostCreatePage";
import AboutPage from "./ui/pages/about/AboutPage";
import Navbar from "./ui/components/navbar/Navbar";
import Footer from "./ui/components/footer/Footer";
import ProfilePage from "./ui/pages/profile/ProfilePage";
import PostViewPage from "./ui/pages/post/post-view/PostViewPage";
import { ProfileProvider } from "./data/context/profile-context";

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <div className="conciso-app">
          <Navbar />
          <div className="conciso-app-content">
            <ProfileProvider>
              <Route exact path={ROUTES.HOME} component={HomePage} />
              <Route path={ROUTES.POSTS} component={PostsPage} />
              <Route path={ROUTES.POST_CREATE} component={PostCreatePage} />
              <Route path={ROUTES.ABOUT} component={AboutPage} />
              <Route path={ROUTES.CONTACT} component={ContactPage} />
              <Route path={ROUTES.PROFILE} component={ProfilePage} />
              <Route path={ROUTES.POST_VIEW} component={PostViewPage} />
            </ProfileProvider>
          </div>
          <Footer />
        </div>
      </Router>
    </div>
  );
};

export default App;
