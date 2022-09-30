import React from 'react';
import { Card, Dimmer, Segment, Image  } from 'semantic-ui-react'
import PostCard from '../PostCard/PostCard';
import Loader from '../Loader/Loader';
// import { deletePost } from "../../utils/postApi";

export default function PostGallery({posts, numPhotosCol, isProfile, deletePost, loading, loggedUser}){

  // const deletePost = () => {
  //   deletePost(post._id);

  // };

    return (
        <Card.Group itemsPerRow={numPhotosCol} stackable>
        {loading ? (
          <Segment>
            <Dimmer active inverted>
              <Loader size="small">Loading</Loader>
            </Dimmer>
            <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
          </Segment>
        ) : null}
        {posts.map((post) => {
          return (
            <PostCard
              post={post}
              key={post._id}
              isProfile={isProfile}
              loggedUser={loggedUser}
              deletePost={deletePost}
            />
          );
        })}
      </Card.Group>
  
    )
}