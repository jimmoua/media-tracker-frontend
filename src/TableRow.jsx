import React from "react";
import PropTypes from "prop-types";

/**
 * @param id
 * @param media
 * @returns {JSX.Element}
 */
const TableRow = ({ media, modalHandler }) => {
  const dateFmtOptions = { year: "numeric", month: "short", day: "numeric" };
  return(
    <tr key={media.id} onClick={() => modalHandler({ id: media.id, title: media.title, type: media.type, status: media.status, notes: media.notes }) }>
      <td>{media.title.length > 25 ? media.title.substr(0, 20).concat(" ...") : media.title}</td>
      <td>{media.type}</td>
      <td>{media.status}</td>
      <td>{media.last_updated ? new Date(media.last_updated).toLocaleString("en-Us", dateFmtOptions) : ""}</td>
    </tr>
  );
};

TableRow.propTypes = {
  media: PropTypes.object.isRequired,
  modalHandler: PropTypes.func
};

export default TableRow;