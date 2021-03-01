import React from "react";
import PropTypes from "prop-types";
import { updateMediaList } from "./api";
import { deleteMediaList } from "./api";

/**
 * @param media
 * @param modalCloseHandler
 * @returns {JSX.Element}
 * @constructor
 */
const MediaModal = ({ media, modalCloseHandler }) => {
  const [title, setTitle] = React.useState(media.title);
  const [status, setStatus] = React.useState(media.status);
  const [type, setType] = React.useState(media.type);
  const dropdownClassInactive = "dropdown";
  const dropdownClassActive = dropdownClassInactive.concat(" is-active");
  const [dropdownClass, setDropdownClass] = React.useState(dropdownClassInactive);
  const [deleted, setDeleted] = React.useState(false);
  function dropDownItemOnClick(newType) {
    setType(newType);
    setDropdownClass(dropdownClassInactive);
  }
  function shouldCloseModal() {
    return !(btnLoading.includes("is-loading") || btnDeleteCalled.includes("is-loading"));
  }
  const defaultBtnSubmitClass = "button is-primary mt-4";
  const defaultBtnDeleteClass = "button is-danger is-light mt-4";
  const btnLoadingClass = defaultBtnSubmitClass.concat(" is-loading");
  const [btnLoading, setBtnLoading] = React.useState(defaultBtnSubmitClass);
  const [statusMessage, setStatusMessage] = React.useState();
  const [btnDeleteCalled, setBtnDeleteCalled] = React.useState(defaultBtnDeleteClass);
  const modal = (
    <div className="modal is-clipped is-active">
      <div className="modal-background" onClick={shouldCloseModal() ? modalCloseHandler : null} />
      <div className="modal-content">
        <div className="box">
          <div className="media">
            <div className="media-content is-center">
              {statusMessage}
              <form id="mediaUpdateForm" onSubmit={e => e.preventDefault()}>
                <div className="field">
                  <label className="label">Title</label>
                  <input
                    required
                    disabled={btnLoading.includes("is-loading") || deleted}
                    type="text"
                    className="input has-text-centered"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  />
                </div>
                <div className="field">
                  <label className="label">Status</label>
                  <input
                    required
                    disabled={btnLoading.includes("is-loading") || deleted}
                    type="text"
                    className="input has-text-centered"
                    value={status}
                    onChange={(e) => {
                      setStatus(e.target.value);
                    }}
                  />
                </div>
                <div className="field">
                  <label className="label is-fullwidth">Type</label>
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
                        disabled={btnLoading.includes("is-loading") || deleted}
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
                <button
                  type="button"
                  className="modal-close is-large"
                  aria-label="close"
                  onClick={shouldCloseModal() ? modalCloseHandler : null}
                />
              </form>
              <div className="column is-one-quarter is-centered container field">
                <div className="buttons has-addons">
                  <button
                    form="mediaUpdateForm"
                    className={btnLoading}
                    onClick={() => {
                      if(title.length === 0 || status.length === 0) {
                        return;
                      }
                      (async() => {
                        setBtnLoading(btnLoadingClass);
                        const statusCode = await updateMediaList({
                          id: media.id,
                          title, status, type
                        });
                        setBtnLoading(defaultBtnSubmitClass);
                        if(statusCode !== 200) {
                          return setStatusMessage(
                            <>
                              <div className="notification is-danger is-light">
                                <div>error updating media</div>
                                <div>status code: {statusCode}</div>
                              </div>
                            </>
                          );
                        } else {
                          setStatusMessage(
                            <>
                              <div className="notification is-success is-light">
                                <div>{`"${title}"`} has been updated</div>
                              </div>
                            </>
                          );
                        }
                        modalCloseHandler(true);
                      })();
                    }}
                    disabled={deleted}
                  >
                    Update
                  </button>
                  <button
                    type={"button"}
                    className={btnDeleteCalled}
                    onClick={() => {
                      const ans = confirm(`Are you sure you want to delete "${title}"?`);
                      if(ans) {
                        (async() => {
                          setBtnDeleteCalled(defaultBtnDeleteClass.concat(" is-loading"));
                          const statusCode = await deleteMediaList(media.id);
                          if(statusCode !== 200) {
                            return setStatusMessage(
                              <>
                                <div className="notification is-danger is-light">
                                  <div>Unable to delete media {`"${title}"`}</div>
                                </div>
                              </>
                            );
                          } else {
                            setStatusMessage(
                              <>
                                <div className="notification is-success">
                                  <div>{`"${title}"`} was deleted</div>
                                </div>
                              </>
                            );
                            setDeleted(true);
                          }
                          modalCloseHandler(true);
                          setBtnDeleteCalled(defaultBtnDeleteClass);
                        })();
                      }
                    }}
                    disabled={deleted}
                  >
                    Delete
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

MediaModal.propTypes = {
  media: PropTypes.object.isRequired,
  modalCloseHandler: PropTypes.func.isRequired
};

export default MediaModal;