import { click } from "@testing-library/user-event/dist/click";
import React from "react";
import { Card, Icon, Image } from "semantic-ui-react";

function PostCard({ post, isProfile, loggedUser }) {

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
 

  return (
    <Card>
      {isProfile ? (
        ""
      ) : (
        <Card.Content textAlign="left">
          <Card.Header>
            <Image
              size="large"
              avatar
              src={
                post.user.photoUrl
                  ? post.user.photoUrl
                  : "https://react.semantic-ui.com/images/wireframe/square-image.png"
              }
            />
          </Card.Header>
        </Card.Content>
      )}
      <Image src={`${post?.photoUrl}`} wrapped ui={false} />
      <Card.Content>
        <Card.Description>{post.caption}</Card.Description>
      </Card.Content>
      {/* <Card.Content extra textAlign={"right"}>
        <Icon name={"heart"} size="large" color={likeColor} onClick={clickHandler} />
        {post.likes.length} Likes
      </Card.Content> */}
    </Card>
  );
}

export default PostCard;