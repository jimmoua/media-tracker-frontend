import React from "react";
import PropTypes from "prop-types";
import { createNewMedia } from "../api";

/**
 * @param modalCloseHandler
 * @returns {JSX.Element}
 * @constructor
 */
const NewModal = ({ modalCloseHandler }) => {
  const [title, setTitle] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [type, setType] = React.useState("Show");
  const [notes, setNotes] = React.useState("");
  const dropdownClassInactive = "dropdown";
  const dropdownClassActive = dropdownClassInactive.concat(" is-active");
  const [dropdownClass, setDropdownClass] = React.useState(dropdownClassInactive);
  function dropDownItemOnClick(newType) {
    setType(newType);
    setDropdownClass(dropdownClassInactive);
  }
  function shouldCloseModal() {
    return !btnLoading.includes("is-loading");
  }
  const defaultBtnSubmitClass = "button is-primary mt-4";
  const btnLoadingClass = defaultBtnSubmitClass.concat(" is-loading");
  const [btnLoading, setBtnLoading] = React.useState(defaultBtnSubmitClass);
  const [statusMessage, setStatusMessage] = React.useState();
  const modal = (
    <div className="modal is-clipped is-active">
      <div className="modal-background" onClick={shouldCloseModal() ? modalCloseHandler : null} />
      <div className="modal-content">
        <div className="box" style={{ minHeight: "25rem" }}>
          <div className="media">
            <div className="media-content is-center">
              {statusMessage}
              <form id="mediaCreateForm" onSubmit={e => e.preventDefault()}>
                <div className="field">
                  <label className="label">
                    Title
                    <div>
                      <input
                        required
                        disabled={btnLoading.includes("is-loading")}
                        type="text"
                        className="input has-text-centered"
                        value={title}
                        onChange={(e) => {
                          setTitle(e.target.value);
                        }}
                      />
                    </div>
                  </label>
                </div>
                <div className="field">
                  <label className="label">
                    Status
                    <div>
                      <input
                        required
                        disabled={btnLoading.includes("is-loading")}
                        type="text"
                        className="input has-text-centered"
                        value={status}
                        onChange={(e) => {
                          setStatus(e.target.value);
                        }}
                      />
                    </div>
                  </label>
                </div>
                <div className="field">
                  <label htmlFor="mediaCreateForm" className="label">
                    Notes
                    <div>
                      <textarea
                        name="notes"
                        rows="3"
                        className="textarea has-text-centered"
                        style={{ resize: "none" }}
                        onChange={ev => setNotes(ev.target.value)}
                      >
                      </textarea>
                    </div>
                  </label>
                </div>
                <div className="field">
                  <label className="label is-fullwidth">
                    Type
                    <div>
                      <div className={dropdownClass}>
                        <div className="dropdown-trigger">
                          <button
                            type={"button"}
                            className="button"
                            aria-haspopup="true"
                            aria-controls="dropdown-menu"
                            onClick={() => {
                              setDropdownClass(dropdownClass === dropdownClassActive ? dropdownClassInactive : dropdownClassActive);
                            }}
                            disabled={btnLoading.includes("is-loading")}
                          >
                            <span>{type}</span>
                            <span className="icon is-small">
                              <i className="fas fa-angle-down" aria-hidden="true" />
                            </span>
                          </button>
                        </div>
                        <div className="dropdown-menu" id="dropdown-menu" role="menu">
                          <div className="dropdown-content">
                            <a className="dropdown-item" onClick={() => dropDownItemOnClick("Show")}>Show</a>
                            <a className="dropdown-item" onClick={() => dropDownItemOnClick("Comic")}>Comic</a>
                            <a className="dropdown-item" onClick={() => dropDownItemOnClick("Novel")}>Novel</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </label>
                </div>
                <button
                  type="button"
                  className="modal-close is-large"
                  aria-label="close"
                  onClick={shouldCloseModal() ? modalCloseHandler : null}
                />
              </form>
              <div className="column is-one-quarter is-centered container field">
                <div className="container column is-centered">
                  <button
                    form="mediaCreateForm"
                    className={btnLoading}
                    onClick={() => {
                      if(title.length === 0 || status.length === 0) {
                        return;
                      }
                      (async() => {
                        setBtnLoading(btnLoadingClass);
                        const statusCode = await createNewMedia({ title, type, status, notes });
                        setBtnLoading(defaultBtnSubmitClass);
                        if(statusCode !== 200) {
                          return setStatusMessage(
                            <>
                              <div className="notification is-danger is-light">
                                <div>error creating media</div>
                                <div>status code: {statusCode}</div>
                              </div>
                            </>
                          );
                        } else {
                          setTitle("");
                          setType("Show");
                          setStatus("");
                          setStatusMessage(
                            <>
                              <div className="notification is-success is-light">
                                <div>{`"${title}"`} has been added</div>
                              </div>
                            </>
                          );
                        }
                        modalCloseHandler(true);
                      })();
                    }}
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <>
      {modal}
    </>
  );
};

NewModal.propTypes = {
  modalCloseHandler: PropTypes.func.isRequired
};

export default NewModal;