import React from 'react';
import {Link} from "react-router-dom";
import { Header, Segment, Image, Icon } from 'semantic-ui-react';

function changeColor(e){
  e.target.style.color = e.target.style.color === 'black' ? 'steelblue' : 'black';
}

export default function PageHeader({ loggedUser, handleLogout }){
    return (
        <Segment 
        clearing
        style={{"background-color": "moccasin", color:"black"}}
        >
        <Header as="h2" text-color="darkkhaki" floated="right">
          <Link to="/">
            <Icon name="home"></Icon>
          </Link>
          <Link to="" onClick={handleLogout} onMouseOver={changeColor}>
            Logout
          </Link>
        </Header>
        <Header as="h2" floated="left">
          <Link to={`/${loggedUser?.username}`}>
            <Image
              src={
                  loggedUser?.photoUrl
                  ? loggedUser?.photoUrl
                  : "https://react.semantic-ui.com/images/wireframe/square-image.png"
              }
              avatar
            ></Image>
          </Link>
        </Header>
        <Header as="h2">
            {loggedUser?.username}'s &nbsp;Sleep Tracker
        </Header>
        </Segment>
    )
}