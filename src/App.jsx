import React from "react";
import PropagateLoader from "react-spinners/PropagateLoader";
import Homepage from "./Homepage";
import LoginPage from "./LoginPage";
import "./app.css";
import { Auth } from "aws-amplify";

function App() {
  const [isLoggedIn, setLoggedIn] = React.useState();
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
  React.useEffect(() => {
    (async() => {
      try {
        await Auth.currentAuthenticatedUser();
        setLoggedIn(true);
      } catch(err) {
        setLoggedIn(false);
        console.log(err);
      }
    })();
  });
  function determineRenderedComponent() {
    if(isLoggedIn) {
      return <Homepage />;
    } else if(isLoggedIn === false) {
      return <LoginPage />;
    }
    return <Loader />;
  }
  return (
    <>
      {determineRenderedComponent()}
    </>
  );
}

export default App;
