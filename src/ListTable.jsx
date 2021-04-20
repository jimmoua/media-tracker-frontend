import React from "react";
import PropTypes from "prop-types";
import TableRow from "./TableRow";

/**
 * @param mediaList - The list from the API
 * @param modalHandler - The handler to toggle the modal active
 * @returns {JSX.Element}
 */
const ListTable = ({ mediaList, modalHandler }) => {
  const [searchField, setSearchField] = React.useState("");

  function sortListMediaListByTitle(list) {
    return list.sort((a, b) => a.title.toLowerCase() > b.title.toLowerCase() ? 1 : ((b.title.toLowerCase() > a.title.toLowerCase()) ? -1 : 0));
  }
  function filterListMediaByTitle(list, mediaTitle) {
    return list.filter(e => e.title.toLowerCase().includes(mediaTitle.toLowerCase()));
  }

  function createTableRows() {
    const _t = sortListMediaListByTitle(filterListMediaByTitle(mediaList, searchField));
    const _list = [];
    for(let i = 0; i < _t.length; i++) {
      _list.push(
        <TableRow
          key={_t[i].id}
          media={_t[i]}
          modalHandler={modalHandler}
        />
      );
    }
    return _list;
  }

  return (
    <>
      <div className="column is-half is-center container mb-5">
        <div className="container">
          <div className="field">
            <input
              type="text"
              className="input has-text-centered is-bold"
              value={searchField}
              onChange={(e) => {
                setSearchField(e.target.value);
                createTableRows();
              }}
              placeholder={"Search for media"}
            />
          </div>
        </div>
      </div>
      <table className="table is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th>Media</th>
            <th>Type</th>
            <th>Status</th>
            <th>Last updated</th>
          </tr>
        </thead>
        <tbody>
          {createTableRows()}
        </tbody>
      </table>
    </>
  );
};

ListTable.propTypes = {
  mediaList: PropTypes.array.isRequired,
  modalHandler: PropTypes.func.isRequired
};

export default ListTable;