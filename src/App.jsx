import React from "react";
import axios from "axios";
import PropagateLoader from "react-spinners/PropagateLoader";
import Homepage from "./Homepage";
import LoginPage from "./LoginPage";
import ShowError from "./ShowError";
import "./app.css";

function App() {
  const Loader = () => {
    return (
      <>
        <div className="hero">
          <div className="hero-body has-text-centered">
            <PropagateLoader />
          </div>
        </div>
      </>
    );
  };
  function determineRenderedComponent() {
    return <Homepage />;
  }
  return (
    <>
      {determineRenderedComponent()}
    </>
  );
}

export default App;
