import React, { useState, useEffect } from "react";

import PageHeader from "../../components/Header/Header";
import AddPost from "../../components/AddPost/AddPost";
import PostGallery from "../../components/PostGallery/PostGallery";
import Loading from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

import { Grid } from "semantic-ui-react";

import * as postsAPI from "../../utils/postApi";

export default function Feed({loggedUser, handleLogout}){
    
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error] = useState("");

  async function handleAddPost(post) {
    try {
      setLoading(true);
      const response = await postsAPI.create(post);

      console.log(response);
      getPosts(); 
      setLoading(false);
    } catch (err) {
      console.log(err.message);
    }
  }

  async function getPosts() {
    try {
      const response = await postsAPI.getAll();
      console.log(response, " data");
      setPosts([...response.data]);
      setLoading(false);
    } catch (err) {
      console.log(err.message, " this is the error");
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    try {
      await postsAPI.deletePost(id);
      getPosts();
    } catch (err) {
      console.log(err.message, " this is the error");
    }
  }

  useEffect(() => {

    getPosts();
  }, []); 

  if (error) {
      return (
        <>
          <PageHeader handleLogout={handleLogout} loggedUser={loggedUser} />
          <ErrorMessage error={error} />;
         
        </>
      );
    }
    if (loading){
      return(
          <>
              <PageHeader handleLogout={handleLogout} loggedUser={loggedUser} />
              <Loading />
          </>
      )
    }

    return (
    <Grid 
    centered
    style={{minHeight: "102vh", minWidth: "100vh", "background-image": "linear-gradient(to bottom, #010329, #000a38, #000f47, #001055, #0c1064)"}}
    >
        <Grid.Row>
          <Grid.Column>
            <PageHeader handleLogout={handleLogout} loggedUser={loggedUser}/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column style={{ maxWidth: 450}}>
            <AddPost handleAddPost={handleAddPost} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column style={{ maxWidth: 450}}>
            <PostGallery
              posts={posts}
              numPhotosCol={1}
              isProfile={false}
              loading={loading}
              deletePost={handleDelete}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
}