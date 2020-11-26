import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteFavorite } from "../../actions/profile";
import './Dashboard.scss';

const Favorite = ({ favorite, deleteFavorite }) => {
  const favorites = favorite.map((fav) => (
    <tr key={fav._id}>
      <td className="title-table">{fav.title}</td>
      <td className="platform-table">{fav.platform}</td>
      <td className="hours-table">{fav.hours} </td>
      <td>
        <button
          onClick={() => deleteFavorite(fav._id)}
          className="btn btn-danger btn-delete"
        >
          Удалить
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className="text-color my-2">Любимые игры</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Название игры</th>
            <th className="hide-sm">Платформы</th>
            <th className="hide-sm">Часы в игре</th>
            <th />
          </tr>
        </thead>
        <tbody>{favorites}</tbody>
      </table>
    </Fragment>
  );
};

Favorite.propTypes = {
  favorite: PropTypes.array.isRequired,
  deleteFavorite: PropTypes.func.isRequired,
};

export default connect(null, { deleteFavorite })(Favorite);
