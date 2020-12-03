import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { deleteComment } from "../../actions/post";

const CommentItem = ({
  postId,
  comment: { _id, text, username, commentedBy, avatar, date },
  auth,
  deleteComment,
}) => (
  <div className="post bg-comment p-1 my-1">
    <div>
      <Link to={`/profile/${commentedBy}`}>
        <img className="round-img" src={avatar} alt="" />
        <h4 className="text-color">{username}</h4>
      </Link>
    </div>
    <div>
      <p className="my-1">{text}</p>
      <p className="post-date">
        Отравлено  <Moment format="DD/MM/YYYY HH:mm:ss">{date}</Moment>
      </p>
      {!auth.loading && commentedBy === auth.user._id && (
        <button
          onClick={() => deleteComment(postId, _id)}
          type="button"
          className="btn btn-danger"
        >
          Удалить
        </button>
      )}
    </div>
  </div>
);

CommentItem.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
