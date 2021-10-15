import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAuth } from "../context/auth";
import { Form, Button, Card, Alert } from "react-bootstrap";

const Register = () => {
  const { token } = useAuth();
  const router = useRouter();
  if (token) router.replace("/");
  const [email, setEmail] = useState("");
  // console.log(email);
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);
  async function register(e) {
    if (name && email && password) {
      setIsEmpty(false)
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
    }
    else
    {
      setIsEmpty(true)
    }
  }
  return (
    <>
      {!token && (
        <>
          <Card
            style={{ width: "18rem" }}
            style={{ margin: "100px auto", width: "260px" }}
          >
            <h1 style={{ margin: "5px auto" }}>Register</h1>
            {isEmpty && (
              <Alert
                variant="danger"
                style={{ margin: "5px auto", fontSize: "0.7rem" ,width:"250px"}}
              >
                Name, email and password can't be empty !
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
                <Button variant="primary" type="button" onClick={register}>
                  Register
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </>
      )}
    </>
  );
};

export default Register;
