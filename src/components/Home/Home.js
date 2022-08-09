//rafce

import React, { useState } from 'react'
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core';
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
//import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getPostsBySearch } from '../../actions/posts';
import { useLocation, useNavigate } from 'react-router-dom';
import useStyles from "./styles";
import Pagination from "../Pagination";
import ChipInput from "material-ui-chip-input";

function useQuery() {
    //`/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}` .search=>search?
    return new URLSearchParams(useLocation().search);

}

const Home = () => {
    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch();
    const classes = useStyles();
    const query = useQuery();
    const navigate = useNavigate();
    // export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
    const page = query.get("page") || 1;
    //`/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}` .search=>search?==>search || "none"
    const searchQuery = query.get('searchQuery');
    const [search, setSearch] = useState("");
    const [tags, setTags] = useState([]);

    //console.log(useLocation());
    //console.log(searchQuery);


    const searchPost = () => {
        if (search.trim() || tags) {
            //dispatch =>fetch search post
            //cannot pass an array through the url parameters ==>tags.join

            dispatch(getPostsBySearch({ search, tags: tags.join(",") }))
            navigate(`/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`);
        } else {
            navigate("/");
        }
    }

    const handleKeyPress = (e) => {
        //keyCode==13 mean enter
        if (e.keyCode === 13) {
            searchPost();
        }
    };

    const handleAdd = (tag) => setTags([...tags, tag])
    const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete));

    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={classes.appBarSearch} position="static" color="inherit">
                            <TextField
                                name="search"
                                variant="outlined"
                                label="Search Memories"
                                onKeyDown={handleKeyPress}
                                fullWidth
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <ChipInput
                                style={{ margin: "10px 0" }}
                                value={tags}
                                onAdd={handleAdd}
                                onDelete={handleDelete}
                                label="Search Tags"
                                variant="outlined"
                            />
                            <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Search</Button>
                        </AppBar>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                        {(!searchQuery && !tags.length) && (
                            <Paper className={classes.pagination} elevation={6} >
                                <Pagination page={page} />
                            </Paper>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    );
}

export default Home;

