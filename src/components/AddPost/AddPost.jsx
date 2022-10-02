import React, { useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";

export default function AddPostForm(props) {
  // create the state, pay attention to how the inputs are setup!
  const [state, setState] = useState({
    caption: "",
    date: "",
    sleepTime: "",
    sleepLength: "",
  });
  // The function that handles the changes on the input, Look at the inputs for the name of it
  const [selectedFile, setSelectedFile] = useState("");

  function handleFileInput(e) {
    console.log(e.target.files, " < - this is e.target.files!");
    setSelectedFile(e.target.files[0]);
  }

  function handleChange(e) {
    setState({
        ...state,
        [e.target.name]: e.target.value
    })
  }

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("photo", selectedFile);
    formData.append("caption", state.caption);
    formData.append("date", state.date);
    formData.append("sleepTime", state.sleepTime);
    formData.append("sleepLength", state.sleepLength);
    props.handleAddPost(formData); // formData is the data we want to send to the server!
  }

  return (
    <Segment style={{"background-color":"cornsilk"}}>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          className="form-control"
          name="date"
          value={state.date}
          placeholder="What was the Date?"
          onChange={handleChange}
          required
        />
        <Form.Input
          className="form-control"
          name="sleepTime"
          value={state.sleepTime}
          placeholder="When did you sleep?"
          onChange={handleChange}
          required
        />
        <Form.Input
          className="form-control"
          name="sleepLength"
          value={state.sleepLength}
          placeholder="How long did you sleep?"
          onChange={handleChange}
          required
        />
        <Form.Input
          className="form-control"
          name="caption"
          value={state.caption}
          placeholder="How did you feel when you woke up?"
          onChange={handleChange}
        />
        <Form.Field style={{'text-align':'center'}}>
          <p>Upload Where You Slept</p>
          <Form.Input
            type="file"
            name="photo"
            placeholder="upload image"
            onChange={handleFileInput}
          />
        </Form.Field>
        <Form.Field style={{'text-align':'center'}}>
        <Button type="submit" className="btn">
          ADD SLEEPING NOTE
        </Button>
        </Form.Field>
      </Form>
    </Segment>
  );
}
