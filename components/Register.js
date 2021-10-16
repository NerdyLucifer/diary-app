import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAuth } from "../context/auth";
import { GoogleLogin } from "react-google-login";
import { Form, Button, Card, Alert } from "react-bootstrap";

const Register = () => {
  const { token,setUsername, setToken } = useAuth();
  const router = useRouter();
  if (token) router.replace("/");
  const [email, setEmail] = useState("");
  // console.log(email);
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);
  async function register(e) {
    if (name && email && password) {
      setIsEmpty(false);
      console.log("registered");
      await axios
        .post("https://diary-app-ash.herokuapp.com/register", {
          name: name,
          email: email,
          password: password,
        })
        .then(function (res) {
          console.log(res.data);
          router.push("/login");
        })
        .catch(function (err) {
          console.log(err);
        });
    } else {
      setIsEmpty(true);
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
            <h1 style={{ margin: "5px auto" }}>Register</h1>
            {isEmpty && (
              <Alert
                variant="danger"
                style={{
                  margin: "5px auto",
                  fontSize: "0.7rem",
                  width: "250px",
                }}
              >
                Name, email and password can&apos;t be empty !
              </Alert>
            )}

            <Card.Body>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="name"
                    placeholder="Enter name"
                    name="name"
                    // id="email"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && register()}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    // id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && register()}
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
                    onKeyPress={(e) => e.key === "Enter" && register()}
                  />
                </Form.Group>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <Button variant="primary" type="button" onClick={register}>
                    Register
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

export default Register;
