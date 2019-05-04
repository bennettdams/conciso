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
import Home from "./ui/pages/Home";
import Contact from "./ui/pages/Contact";
import Post from "./ui/pages/Post";
import About from "./ui/pages/About";
import Navbar from "./ui/components/navbar/Navbar";
import Footer from "./ui/components/footer/Footer";

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <FirebaseProvider>
          <CountProvider>
            <Navbar />
            <Route exact path={ROUTES.HOME} component={Home} />
            <Route path={ROUTES.POST} component={Post} />
            <Route path={ROUTES.ABOUT} component={About} />
            <Route path={ROUTES.CONTACT} component={Contact} />
            <Footer />
          </CountProvider>
        </FirebaseProvider>
      </Router>
    </div>
  );
};

export default App;
