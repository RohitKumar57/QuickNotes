import React, {  useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import MainScreen from "../../MainScreen";
import { Link, useNavigate } from "react-router-dom";
import "./LoginScreen.css";
import axios from "axios";
import Loading from "../../Loading";
import ErrorMessage from "../../ErrorMessage";

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    let navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log(email, password)

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      setLoading(true);

      const { data } = await axios.post(
        "/api/users/login",
        {
          email,
          password,
        },
        config
      );

      console.log(data);

      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate("/mynotes")

      setLoading(false);
    } catch (error) {
        setError(error.response.data.message)
        setLoading(false)
    }
  };

  return (
    <MainScreen title="LOGIN">
      <div className="loginContainer">
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading/>}
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            New Customer ? <Link to="/register">Register Here</Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default LoginScreen;
