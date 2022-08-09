
import { FETCH_BY_SEARCH, FETCH_ALL, FETCH_POST, START_LOADING, END_LOADING, CREATE, UPDATE, DELETE, LIKE, COMMENT } from "../constants/actionTypes";

//export default (posts = [], action) => {
export default (state = { isLoading: true, posts: [] }, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true };
        case END_LOADING:
            return { ...state, isLoading: false };
        case FETCH_ALL:
            //return state.posts , this posts was due to posts.js
            return {
                ...state,
                posts: action.payload.data,  //state.posts.posts
                currentPage: action.payload.currentPage,//state.posts.currentPage
                numberOfPages: action.payload.numberOfPages,//state.posts.numberOfPages
            };
        case FETCH_BY_SEARCH:
            return {
                ...state,
                posts: action.payload
            };
        case FETCH_POST:
            return { ...state, post: action.payload };
            console.log(state);
        case DELETE:
            return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) } //payload = id only
        case UPDATE:
        case LIKE:
            //return state.map((post) => post._id === action.payload._id ? action.payload : post);
            return { ...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post) };
        case COMMENT:
            //return all the other posts normally and change the post that just received a comment
            return {
                ...state,
                posts: state.posts.map((post) => {
                    if (post._id === action.payload._id) { return action.payload; }
                    return post;
                })
            }
        case CREATE:
            return { ...state, posts: [...state.posts, action.payload] };
        default:
            return state;
    }
}
