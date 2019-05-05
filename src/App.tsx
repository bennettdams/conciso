import React from "react";
import "./App.scss";
// import "bulma";

// ROUTING
import { BrowserRouter as Router, Route } from "react-router-dom";
import ROUTES from "./constants/routes";

// DATA
import { CountProvider } from "./data/context/count-context";
import { FirebaseProvider } from "./data/context/firebase-context";

// COMPONENTS
import "./ui/styles/global.scss";
import HomePage from "./ui/pages/HomePage";
import ContactPage from "./ui/pages/ContactPage";
import PostPage from "./ui/pages/PostPage";
import AboutPage from "./ui/pages/AboutPage";
import Navbar from "./ui/components/navbar/Navbar";
import Footer from "./ui/components/footer/Footer";

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <FirebaseProvider>
          <CountProvider>
            <Navbar />
            <Route exact path={ROUTES.HOME} component={HomePage} />
            <Route path={ROUTES.POST} component={PostPage} />
            <Route path={ROUTES.ABOUT} component={AboutPage} />
            <Route path={ROUTES.CONTACT} component={ContactPage} />
            <Footer />
          </CountProvider>
        </FirebaseProvider>
      </Router>
    </div>
  );
};

export default App;
