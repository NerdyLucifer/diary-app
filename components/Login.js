import axios from "axios";
import Router from "next/router";
import { useEffect, useState } from "react";
import { GoogleLogin } from "react-google-login";
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

  const responseGoogle = async (response) => {
    const { profileObj } = response;
    const { name, email, imageUrl } = profileObj;
    // console.log(name, email, imageUrl);
    await axios({
      method: "post",
      url: "https://diary-app-ash.herokuapp.com/login",
      data: {
        name: name,
        email: email,
        imageUrl: imageUrl,
      },
    }).then(function (res) {
      const { loginUser, accessToken } = res.data;
      setUsername(loginUser.name);
      setToken(accessToken);
    });
  };

  return (
    <>
      {!token && (
        <>
          <Card style={{ margin: "100px auto", width: "260px" }}>
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
                <div style={{display:"flex", flexDirection:"column", gap:"10px"}}>
                  <Button variant="primary" type="button" onClick={login}>
                    Login
                  </Button>
                  <GoogleLogin
                    clientId="377569769183-qitlt5d2km5iavm9rnk0s6efe9d7918j.apps.googleusercontent.com"
                    buttonText="Login with Google"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={"single_host_origin"}
                    style={{ margin: "auto" }}
                  />
                </div>
              </Form>
            </Card.Body>
          </Card>
        </>
      )}
    </>
  );
};

export default Login;
