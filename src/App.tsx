import React from "react";
import "./App.scss";
// import "bulma";

import { BrowserRouter as Router, Route } from "react-router-dom";

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
        <Navbar />
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/post" component={Post} />
        <Route path="/contact" component={Contact} />
        <Footer />
      </Router>
    </div>
  );
};

export default App;
