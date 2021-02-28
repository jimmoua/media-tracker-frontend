import React from "react";
import axios from "axios";
import PropagateLoader from "react-spinners/PropagateLoader";
import Hero from "./Hero";
import LoginPage from "./LoginPage";

function App() {
  const [statusCode, setStatusCode] = React.useState(null);
  async function verifyLoginState() {
    try {
      const response = await axios.get("http://localhost:8888/", { withCredentials: true });
      setStatusCode(response.status);
    } catch (err) {
      console.log(err?.response?.status);
      setStatusCode(err?.response?.status || 500);
    }
  }
  React.useState(() => {
    verifyLoginState();
  }, [statusCode]);
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
    switch(statusCode) {
      case 200:
        return <Hero />;
      case 401:
        return <LoginPage />;
      default:
        return <Loader />;
    }
  }
  return (
    <>
      {determineRenderedComponent()}
    </>
  );
}

export default App;
