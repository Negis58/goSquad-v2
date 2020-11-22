import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteRecent } from "../../actions/profile";

const Recent = ({ recent, deleteRecent }) => {
  const recents = recent.map((rec) => (
    <tr key={rec._id}>
      <td>{rec.title}</td>
      <td className="hide-sm">{rec.platform}</td>
      <td>{rec.hours} </td>
      <td>
        <button
          onClick={() => deleteRecent(rec._id)}
          className="btn btn-danger"
        >
          Удалить
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className="my-2">Недавно сыгранные игры</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th className="hide-sm">Platform</th>
            <th className="hide-sm">Hours</th>
            <th />
          </tr>
        </thead>
        <tbody>{recents}</tbody>
      </table>
    </Fragment>
  );
};

Recent.propTypes = {
  recent: PropTypes.array.isRequired,
  deleteRecent: PropTypes.func.isRequired,
};

export default connect(null, { deleteRecent })(Recent);
