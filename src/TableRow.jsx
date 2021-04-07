import React from "react";
import PropTypes from "prop-types";

/**
 * @param id
 * @param title
 * @param type
 * @param status
 * @param modalHandler
 * @returns {JSX.Element}
 */
const TableRow = ({ id, title, type, status, modalHandler }) => {
  return(
    <tr key={id} onClick={() => modalHandler({ id, title, type, status }) }>
      <td>{title}</td>
      <td>{type}</td>
      <td>{status}</td>
    </tr>
  );
};

TableRow.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  modalHandler: PropTypes.func
};

export default TableRow;