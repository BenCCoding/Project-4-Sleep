import React from "react";
import { Card, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

function PostCard({ post, isProfile, deletePost, loggedUser }) {
console.log(post._id);

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