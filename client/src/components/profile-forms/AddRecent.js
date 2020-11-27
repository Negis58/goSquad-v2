import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addRecent } from "../../actions/profile";

const AddRecent = ({ addRecent, history }) => {
  const [formData, setFormData] = useState({
    title: "",
    platform: "",
    hours: "",
  });

  const { title, platform, hours } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <h1 className="large text-color mt-2">Добавить недавно сыгранные игры</h1>
      <p className="lead">
        <i className="fas fa-code-branch" /> Новые или старые игры в которые вы играли.
      </p>
      <div className="text-color">* = Обязательные поля</div>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          addRecent(formData, history);
        }}
      >
        <div className="form-group">
          <input
            type="text"
            placeholder="*Название"
            name="title"
            value={title}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="*Платформа"
            name="platform"
            value={platform}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="*Часов в игре"
            name="hours"
            value={hours}
            onChange={onChange}
          />
        </div>
        <input type="submit" className="btn btn-gosquad my-1" />
        <Link className="btn btn-gosquad my-1" to="/dashboard">
          Вернуться назад
        </Link>
      </form>
    </Fragment>
  );
};

AddRecent.propTypes = {
  addRecent: PropTypes.func.isRequired,
};

export default connect(null, { addRecent })(AddRecent);
