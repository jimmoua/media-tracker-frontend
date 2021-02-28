import React from "react";
import Loader from "react-spinners/BeatLoader";
import ShowError from "./ShowError";
import { fetchMediaList } from "./api";

function Homepage() {
  const [list, setList] = React.useState();

  React.useEffect(() => {
    (async() => {
      const mList = await fetchMediaList();
      if(mList instanceof Object) {
        setList(mList);
      } else {
        setList(null);
      }
    })();
  });

  /**
   * @function renderList
   * @description
   * If HTTP returns a list object, return the list. Otherwise, return the element for an error.
   * @returns {JSX.Element}
   */
  function renderList() {
    if(list === null) {
      return <ShowError />;
    } else if(!list) {
      return (
        <>
          <div>Fetching your list. Please wait.</div>
          <div className="container">
            <div className="column">
              <Loader />
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          {JSON.stringify(list)}
        </>
      );
    }
  }

  return (
    <>
      <div className="hero is-primary is-medium">
        <div className="hero-body">
          <p className="title">Media Tracker</p>
          <p className="subtitle">because I never know where I&apos;m at {"¯\\_(ツ)_/¯"}</p>
        </div>
      </div>
      <section className="section is-mobile has-text-centered">
        {renderList()}
      </section>
    </>
  );
}

export default Homepage;
