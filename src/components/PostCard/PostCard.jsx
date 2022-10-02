import React from "react";
import { Card, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

function PostCard({ post, isProfile, deletePost, loggedUser }) {
console.log(post._id);
  // if the logged in user is in the post.likes array (they have liked the post)
  // then our onClick should be removeLike
  // the color of the heart should be red

  // if the logged in user is not in post.likes array (they havent like the post)
  // then our onClick should be addLike
  // the color should be grey


  // 1. find out if the loggedUser is in the post.likes array
  // if the user in there we'll find the index of the user in post.likes arra
  // if the user isn't this statement returns -1


  // if likedIndex is -1 the color should be 'grey' (the user wasn't in the post.likes array)
  // likedIndex is greater then -1 (the user is in the post.likes array) the color should be red
  async function deleteData(id) {
    deletePost(id)
  }

  return (
    <Card
    style={{"background-color":"cornsilk"}}
    >
      {isProfile ? (
        ""
      ) : (
        <Card.Content textAlign="left">
          <Card.Header>
            <Link to={`/${post?.user?.username}`}>
              <Image
                size="large"
                avatar
                src={
                  post?.user?.photoUrl
                    ? post?.user?.photoUrl
                    : "https://react.semantic-ui.com/images/wireframe/square-image.png"
                }
              />
              {post?.user?.username}
            </Link>
            <button style={{'float':'right'}}onClick={()=>deleteData(post._id)}>Delete</button>
          </Card.Header>
        </Card.Content>
      )}
      <Card.Content style={{'font-weight':'bold'}}>
        <Card.Description>Date: {post.date}, Bedtime: {post.sleepTime}, Slept For: {post.sleepLength}</Card.Description>
        <Card.Description>&nbsp;</Card.Description>
        <Card.Description>How You Felt In The Morning: {post.caption}</Card.Description>
      </Card.Content>
      <Image src={`${post?.photoUrl}`} wrapped ui={false} />
    </Card>
  );
}

export default PostCard;