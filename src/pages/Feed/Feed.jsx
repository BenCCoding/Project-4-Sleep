import React, { useState, useEffect } from "react";

import PageHeader from "../../components/Header/Header";
import AddPost from "../../components/AddPost/AddPost";
import PostGallery from "../../components/PostGallery/PostGallery";

import { Grid } from "semantic-ui-react";

import * as postsAPI from "../../utils/postApi";

export default function Feed(){
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

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
      setPosts([response.data, ...posts]); /// ...posts would keep all the posts in the previous states array
      setLoading(false);
    } catch (err) {
      // this is the error from the throw block, in the postsAPI.create function
      console.log(err.message);
    }
  }



    return (
    <Grid centered>
        <Grid.Row>
          <Grid.Column>
            <PageHeader />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column style={{ maxWidth: 450 }}>
            <AddPost handleAddPost={handleAddPost} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column style={{ maxWidth: 450 }}>
            <PostGallery
              posts={posts}
              numPhotosCol={1}
              isProfile={false}
              loading={loading}
            //   addLike={addLike}
            //   removeLike={removeLike}
            //   loggedUser={loggedUser}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
}