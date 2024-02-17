import React, { useState } from "react";
import MainScreen from "../../MainScreen";
import { Form, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ErrorMessage from "../../ErrorMessage";
import Loading from "../../Loading";
import axios from "axios";

const RegisterScreen = () => {

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  // const [pic, setPic] = useState(
  //   "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  //   );
    const [password, setPassword] = useState("")
    const [confirmpassword, setconfirmPassword] = useState("")
    const [message, setMessage] = useState(null)
    // const [picMessage, setPicMessage] = useState(null)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    const submitHandler = async(e) =>{
      e.preventDefault();

      if(password !== confirmpassword){
        setMessage('Passwords Do Not Match');
      }
      else{
        // calling the api
        setMessage(null)
        try{
          const config = {
            headers: {
              "Content-type": "application/json",
            },
          };

          setLoading(true)
          const { data } = await axios.post(
        "/api/users",
        {
          name,
          // pic,
          email,
          password,
        },
        config
      );

      console.log(data);
      setLoading(false)
      localStorage.setItem("userInfo", JSON.stringify(data))

        }catch(error){
          setError(error.response.data.message)
        }
      }

      console.log(email)
    }




    // for posting pictures
    // const postDetails = (pics) =>{
    //   if(!pics){
    //     return setPicMessage("Please Select an Image")
    //   }
    //   setPicMessage(null)

    //   if(pics.type === 'image/jpeg' || pics.type === 'image/png' || pics.type ==='image.jpg'){
    //     const data = new FormData();
    //     data.append('file', pics)
    //     data.append('upload_preset', 'QuickNotes')

    //   }
    // }

  return (
    <MainScreen title="REGISTER">
      <div className="loginContainer">
        {/* Uncomment these lines if you need to handle state variables and form submission */}
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              style={{ marginBottom: "10px" }}
              type="name"
              value={name}
              placeholder="Enter name"
              // Uncomment this line and add the necessary state and onChange handler
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
            style={{ marginBottom: "10px" }}
              type="email"
              value={email}
              placeholder="Enter email"
              // Uncomment this line and add the necessary state and onChange handler
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
            style={{ marginBottom: "10px" }}
              type="password"
              value={password}
              placeholder="Password"
              // Uncomment this line and add the necessary state and onChange handler
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
            style={{ marginBottom: "10px" }}
              type="password"
              value={confirmpassword}
              placeholder="Confirm Password"
              // Uncomment this line and add the necessary state and onChange handler
              onChange={(e) => setconfirmPassword(e.target.value)}
            />
          </Form.Group>

          {/* Uncomment these lines if you need to handle profile pictures */}
          {/* {picMessage && (
            <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
          )} */}
          {/* <Form.Group controlId="pic">
            <Form.Label>Profile Picture</Form.Label>
            <Form.Control
              onChange={(e) => postDetails(e.target.files[0])}
              type="file"
            />
          </Form.Group> */}

          <Button variant="primary" type="submit" className="my-3">
            Register
          </Button>
        </Form>
        <Row className="pb-3">
          <Col>
            Have an Account? <Link to="/login">Login</Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default RegisterScreen;
