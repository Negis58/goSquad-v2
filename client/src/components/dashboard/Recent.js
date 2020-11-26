import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteRecent } from "../../actions/profile";
import './Dashboard.scss';

const Recent = ({ recent, deleteRecent }) => {
  const recents = recent.map((rec) => (
    <tr key={rec._id}>
      <td className="title-table">{rec.title}</td>
      <td className="platform-table">{rec.platform}</td>
      <td className="hours-table">{rec.hours} </td>
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
      <h2 className="text-color my-2">Недавно сыгранные игры</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Название игры</th>
            <th className="hide-sm">Игровая платформа</th>
            <th className="hide-sm">Часы в игре</th>
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
