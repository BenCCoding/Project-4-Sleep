import React, { useState, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import ProfileBio from "../../components/ProfileBio/ProfileBio";
import PostGallery from "../../components/PostGallery/PostGallery";
import PageHeader from "../../components/Header/Header";
import Loading from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

import userService from "../../utils/userService";
import { useParams } from "react-router-dom";

export default function ProfilePage({ loggedUser, handleLogout }) {
  const [posts, setPosts] = useState([]);
  const [profileUser, setProfileUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { username } = useParams(); // username is defined in the App folder in the Router path="/:username"

  async function getProfile() {
    try {
      const response = await userService.getProfile(username); // this line evaluates to what the server responds to the request with
      // after we get the response to the server
      // so lets flip the loading state
      setLoading(false);
      setProfileUser(response.data.user);
      setPosts(response.data.posts);

      console.log(response);
    } catch (err) {
      console.log(err.message);
      setError("Profile does not exist! You are in the wrong in place"); // < this is message we leave the user
      // to see
    }
  }

  useEffect(() => {
    console.log("firing!");
    // When the page loads, lets send a get request to the server
    // to get whoever's profile page I'm on. (example, localhost:3000/jim) <-- jim's profile info I want to get
    getProfile();
  }, [username]);

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
    style={{"background-image": "linear-gradient(to bottom, #010329, #000a38, #000f47, #001055, #0c1064)"}}
    >
      <Grid.Row>
        <Grid.Column>
          <PageHeader handleLogout={handleLogout} loggedUser={loggedUser}/>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column style={{'color':'cornsilk'}}>
          <ProfileBio style={{'font-size':'100'}} user={profileUser} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row centered>
        <Grid.Column style={{ maxWidth: 750, 'min-height': '74vh' }}>
          <PostGallery
            posts={posts}
            numPhotosCol={3}
            isProfile={true}
            loading={loading}
            loggedUser={loggedUser}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
