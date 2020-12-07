import api from "../utils/api";
import { setAlert } from "./alert";
import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from "./types";

// Получение всех постов
export const getPosts = () => async (dispatch) => {
  try {
    const res = await api.get("/post");
    console.log(res);
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Добавление лайка к посту
export const addLike = (id) => async (dispatch) => {
  try {
    console.log(id);
    const res = await api.put(`/post/like/${id}`);
    console.log(res);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Удаление лайка с поста
export const removeLike = (id) => async (dispatch) => {
  try {
    const res = await api.put(`/post/unlike/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Удаление поста
export const deletePost = (id) => async (dispatch) => {
  try {
    console.log(id);
    await api.delete(`/post/${id}`);

    dispatch({
      type: DELETE_POST,
      payload: id,
    });

    dispatch(setAlert("Пост удален", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Добавление поста
export const addPost = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/post", formData);

    dispatch({
      type: ADD_POST,
      payload: res.data,
    });

    dispatch(setAlert("Пост создан", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Получить конкретный пост
export const getPost = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/post/${id}`);

    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Добавить комментарий
export const addComment = (postId, formData) => async (dispatch) => {
  try {
    const res = await api.post(`/post/comment/${postId}`, formData);

    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });

    dispatch(setAlert("Комменатрий добавлен", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Удалить комментарий
export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    await api.delete(`/post/comment/${postId}/${commentId}`);

    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId,
    });

    dispatch(setAlert("Комментарий удален", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
