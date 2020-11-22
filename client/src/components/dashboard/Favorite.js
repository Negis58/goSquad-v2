import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteFavorite } from "../../actions/profile";

const Favorite = ({ favorite, deleteFavorite }) => {
  const favorites = favorite.map((fav) => (
    <tr key={fav._id}>
      <td>{fav.title}</td>
      <td className="hide-sm">{fav.platform}</td>
      <td>{fav.hours} </td>
      <td>
        <button
          onClick={() => deleteFavorite(fav._id)}
          className="btn btn-danger"
        >
          Удалить
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className="my-2">Любимые игры</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th className="hide-sm">Платформы</th>
            <th className="hide-sm">Часы проведенные в игре</th>
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
