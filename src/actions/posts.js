//import everything from the actions as api

import * as api from "../api";
import { FETCH_BY_SEARCH, FETCH_ALL, FETCH_POST, START_LOADING, END_LOADING, CREATE, UPDATE, DELETE, LIKE, COMMENT } from "../constants/actionTypes";

//api.fetchPost
//action Creators
export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchPost(id); //get posted data from database and pass them to { data }
        //console.log(data);
        dispatch({ type: FETCH_POST, payload: data });//use dispatch because trigger useEffect in App.js
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }

};
export const getPosts = (page) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchPosts(page); //get posted data from database and pass them to { data }
        //console.log(data);
        dispatch({ type: FETCH_ALL, payload: data });//use dispatch because trigger useEffect in App.js
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }

};
//use redux thunk for asynchronous actions
//searchQuery can be replaced by a
export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        //const { data: { data } } = await api.fetchPostsBySearch(searchQuery);
        const { data } = await api.fetchPostsBySearch(searchQuery);

        dispatch({ type: FETCH_BY_SEARCH, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
}

/*cd
export const createPost = async (post) => {
    try {
        const { data } = await api.createPost(post);//post data in database
        return ({ type: "CREATE", payload: data });

    } catch (error) {
        console.log(error.message);
    }
}
*/

export const createPost = (post, navigate) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.createPost(post);//save to database
        navigate(`/posts/${data._id}`)
        dispatch({ type: CREATE, payload: data });//can use return, but use dispatch because trigger useEffect in App.js

    } catch (error) {
        console.log(error);
    }
};

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);
        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error);
    }
}
export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);
        dispatch({ type: DELETE, payload: id });
    } catch (error) {
        console.log(error);
    }
}
export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);
        dispatch({ type: LIKE, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const commentPost = (value, id) => async (dispatch) => {
    try {
        const { data } = await api.comment(value, id);
        dispatch({ type: COMMENT, payload: data });
        return data.comments;
    } catch (error) {
        console.log(error);
    }
}