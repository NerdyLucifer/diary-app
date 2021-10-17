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

  const [isLogin, setIsLogin] = useState(false);

  const responseGoogle = async (response) => {
    setIsLogin(true);
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
    }).then(function async(res) {
      const { loginUser, accessToken } = res.data;
      setUsername(loginUser.name);
      setToken(accessToken);
    });
    setIsLogin(false);
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
            <Card.Body>
              <GoogleLogin
                clientId="377569769183-qitlt5d2km5iavm9rnk0s6efe9d7918j.apps.googleusercontent.com"
                buttonText="Login with Google"
                onSuccess={()=>responseGoogle}
                onFailure={()=>responseGoogle}
                cookiePolicy={"single_host_origin"}
                style={{ margin: "auto" }}
              />
            </Card.Body>
          </Card>
        </>
      )}
    </>
  );
};

export default Login;
