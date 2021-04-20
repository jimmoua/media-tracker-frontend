import React from "react";
import Loader from "react-spinners/BeatLoader";
import ShowError from "./ShowError";
import { fetchMediaList } from "./api";
import ListTable from "./ListTable";
import MediaModal from "./MediaModal";
import NewModal from "./NewModal";
import { Auth } from "aws-amplify";

function Homepage() {
  const [list, setList] = React.useState();
  const [currentModal, setModal] = React.useState();

  function modalCloseHandler(didUpdate = false) {
    if(didUpdate === true) {
      fetchAndSetList();
      return;
    }
    setModal(undefined);
  }

  function modalSetHandler(e) {
    setModal(undefined);
    setModal(
      <MediaModal media={e} modalCloseHandler={modalCloseHandler} />
    );
  }
  
  function setNewModal() {
    setModal(<NewModal modalCloseHandler={modalCloseHandler} />);
  }

  function fetchAndSetList() {
    (async() => {
      const mList = await fetchMediaList();
      if(mList instanceof Array) {
        setList(mList);
      } else {
        setList(null);
      }
    })();
  }

  React.useEffect(() => {
    fetchAndSetList();
  }, []);

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
          {currentModal}
          <ListTable mediaList={list} modalHandler={modalSetHandler} />
        </>
      );
    }
  }

  return (
    <>
      <div className="hero is-primary is-medium">
        <div className="hero-body">
          <p className="title">Media Tracker</p>
          <p className="subtitle">because i never know where i&apos;m at {"¯\\_(ツ)_/¯"}</p>
          <div className="column is-one-fifth">
            <div className="container">
              <button
                className="button is-light is-small is-fullwidth"
                onClick={setNewModal}
              >
                New
              </button>
            </div>
            <div className="container">
              <button
                className="button is-light is-small mt-4 is-danger is-fullwidth"
                onClick={() => {
                  (async() => {
                    try {
                      await Auth.signOut();
                      window.location.replace("/");
                    } catch(err) {
                      alert("unable to logout");
                      console.error(err);
                    }
                  })();
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
      <section className="section is-mobile has-text-centered">
        {renderList()}
      </section>
    </>
  );
}

export default Homepage;
