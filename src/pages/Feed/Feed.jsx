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

  // Why?
  // Creating a POST (C)RUD
  // cuz we want to update state whenever we change a POST CRUD operations*
  async function handleAddPost(post) {
    // post, is coming from the addPostForm component, when we call this function onSubmit props.handleAddPost(formData)
    try {
      setLoading(true);
      const response = await postsAPI.create(post); // waiting for the json to be return from the server and parsed by us!

      // data is the response from the api, the result of the .then if(res.ok) return res.json() in the create postAPI utils function
      console.log(response);
      getPosts(); /// ...posts would keep all the posts in the previous states array
      setLoading(false);
    } catch (err) {
      // this is the error from the throw block, in the postsAPI.create function
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
      // setLoading(false);
    }
  }

  useEffect(() => {
    //Getting posts, C(R)UD

    getPosts();
  }, []); // This is useEffect runs once when the Feed component
  // loads

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
              // loggedUser={loggedUser}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
}