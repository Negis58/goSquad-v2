import React, { Fragment } from "react";
import spinner from "./spinner.gif";
import './Spinner.scss';

export default () => (
  <Fragment>
      <div className="loader">Loading...</div>
    {/*<img
      src={spinner}
      style={{ width: "200px", margin: "auto", display: "block" }}
      alt="Loading..."
    />*/}
  </Fragment>
);
