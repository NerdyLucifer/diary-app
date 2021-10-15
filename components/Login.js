import axios from "axios";
import Router from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
// import Link from "next/link";
import { Form, Button, Card, Alert } from "react-bootstrap";
const Login = () => {
  const { token, setToken, setUsername } = useAuth();

  // console.log(token)

  useEffect(() => {
    if (token) Router.replace("/");
  });

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [isWrong, setIsWrong] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  function login() {
    console.log("login");

    if (email && password) {
      setIsLogin(true);
      setIsEmpty(false);
      setIsWrong(false);
      axios
        .post("https://diary-app-ash.herokuapp.com/login", {
          email: email,
          password: password,
        })
        .then(function (res) {
          // console.log(res.data);
          const { user, accessToken } = res.data;
          setToken(accessToken);
          setUsername(user.name);
        })
        .catch(function (err) {
          console.log(err);
          setIsLogin(false);
          setIsWrong(true);
        });
    } else {
      setIsEmpty(true);
      setIsWrong(false);
    }
  }

  return (
    <>
      {!token && (
        <>
          <Card
            style={{ margin: "100px auto", width: "260px" }}
          >
            <h1 style={{ margin: "5px auto" }}>LOGIN</h1>
            {isLogin && (
              <Alert
                variant="success"
                style={{ margin: "5px auto", fontSize: "1rem", width: "250px" }}
              >
                Logging in...
              </Alert>
            )}
            {isWrong && (
              <Alert
                variant="danger"
                style={{
                  margin: "5px auto",
                  fontSize: "0.7rem",
                  width: "250px",
                }}
              >
                Incorrect email or password!
              </Alert>
            )}
            {isEmpty && (
              <Alert
                variant="danger"
                style={{
                  margin: "5px auto",
                  fontSize: "0.7rem",
                  width: "250px",
                }}
              >
                Email and password can&apos;t be empty !
              </Alert>
            )}

            <Card.Body>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    // id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && login()}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    // id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && login()}
                  />
                </Form.Group>
                <Button variant="primary" type="button" onClick={login}>
                  Login
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </>
      )}
    </>
  );
};

export default Login;
