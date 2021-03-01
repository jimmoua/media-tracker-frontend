import React from "react";
import PropTypes from "prop-types";

/**
 * @param media
 * @param modalCloseHandler - closes the modal by removing it from the DOM
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
  function dropDownItemOnClick(newType) {
    setType(newType);
    setDropdownClass(dropdownClassInactive);
  }
  const modal = (
    <div className="modal is-clipped is-active">
      <div className="modal-background" onClick={modalCloseHandler} />
      <div className="modal-content">
        <div className="box">
          <div className="media">
            <div className="media-content is-center">
              <form onSubmit={e => e.preventDefault()}>
                <div className="field">
                  <label className="label">Title</label>
                  <input
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
                        className="button"
                        aria-haspopup="true"
                        aria-controls="dropdown-menu"
                        onClick={() => {
                          setDropdownClass(dropdownClass === dropdownClassActive ? dropdownClassInactive : dropdownClassActive);
                        }}
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
                <div className="column is-half is-centered container">
                  <button className="button is-primary mt-4">Update</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <button
        className="modal-close is-large"
        aria-label="close"
        onClick={modalCloseHandler}
      />
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