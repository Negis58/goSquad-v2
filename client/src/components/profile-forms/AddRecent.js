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
      <h1 className="large text-primary">Add Recently Played Games</h1>
      <p className="lead">
        <i className="fas fa-code-branch" /> New or old games you have been
        playing.
      </p>
      <small>* = required field</small>
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
            placeholder="*Title"
            name="title"
            value={title}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="*Platform"
            name="platform"
            value={platform}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="*Hours Played"
            name="hours"
            value={hours}
            onChange={onChange}
          />
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

AddRecent.propTypes = {
  addRecent: PropTypes.func.isRequired,
};

export default connect(null, { addRecent })(AddRecent);
