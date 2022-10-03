import React, { useState } from "react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";
import userService from "../../utils/userService";
import { useNavigate } from "react-router-dom";


function isPasswordMatch(passwordOne, passwordConf) {
  return passwordOne === passwordConf;
}

export default function SignUpPage(props) {
  const [error, setError] = useState({
    message: '',
    passwordError: false
  });
  
  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    passwordConf: "",
    bio: "",
  });

  const [selectedFile, setSelectedFile] = useState("");

  const navigate = useNavigate();

  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault(); 

    if (!isPasswordMatch(state.password, state.passwordConf)) return setError({message: 'Passwords Must Match!', passwordError: true});
    setError({message: '', passwordError: false})

    const formData = new FormData(); 
    formData.append("photo", selectedFile);

    for (let key in state) {
      formData.append(key, state[key]);
    }

    console.log(
      formData,
      " <- form Data, you cant see this!",
      "you have to loop over it"
    );
    console.log(
      formData.forEach((item) => console.log(item)),
      " < This lets you see the key values in formData"
    );

    try {
      await userService.signup(formData); 
      props.handleSignUpOrLogin(); 
 
      navigate("/"); 
    } catch (err) {
      console.log(err);
      setError({message: err.message, passwordError: false});
    }
  }

  function handleFileInput(e) {
    console.log(e.target.files, " < - this is e.target.files!");
    setSelectedFile(e.target.files[0]);
  }



  return (
    <Grid
    textAlign="center"
    style={{ minHeight: "102vh", minWidth: "100vh", 
    "background-image": "linear-gradient(to bottom, #010329, #000a38, #000f47, #001055, #0c1064)" }}
    verticalAlign="middle"
    >
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
        Sign Up
        </Header>
        <Form onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              name="username"
              placeholder="username"
              value={state.username}
              onChange={handleChange}
              required
            />
            <Form.Input
              type="email"
              name="email"
              placeholder="email"
              value={state.email}
              onChange={handleChange}
              required
            />
            <Form.Input
              error={error.passwordError}
              name="password"
              type="password"
              placeholder="password"
              value={state.password}
              onChange={handleChange}
              required
            />
            <Form.Input
              error={error.passwordError}
              name="passwordConf"
              type="password"
              placeholder="Confirm Password"
              value={state.passwordConf}
              onChange={handleChange}
              required
            />
            <Form.Field>
              <Form.Input
                type="file"
                name="photo"
                placeholder="upload image"
                onChange={handleFileInput}
              />
            </Form.Field>
            <Button type="submit" className="btn">
              Signup
            </Button>
          </Segment>
          {error.message ? <ErrorMessage error={error.message} /> : null}
        </Form>
      </Grid.Column>
    </Grid>
  );
}
