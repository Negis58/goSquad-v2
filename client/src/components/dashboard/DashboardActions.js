import React from "react";
import { Link } from "react-router-dom";

const DashboardActions = () => {
  return (
    <div className="dash-buttons">
      <Link to="/edit-profile" className="btn btn-light">
          <i className="fas fa-user-circle text-primary" /> Редактирование профиля
      </Link>
        <Link to="/add-experience" className="btn btn-light">
        <i className="fas fa-clock text-primary" /> Недавно сыгранные игры
        </Link>
      <Link to="/add-education" className="btn btn-light">
        <i className="fas fa-star text-primary" /> Любимые игры
      </Link>
    </div>
  );
};

export default DashboardActions;
