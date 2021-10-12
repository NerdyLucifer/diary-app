import axios from "axios";
import Router from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "../components/auth";
import Link from "next/link";
const Login = () => {
  const { token, setToken, setUsername } = useAuth();

  // console.log(token)

  useEffect(() => {
    if (token) Router.replace("/");
  });

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  function login() {
    // console.log("login");
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
      });
  }

  return (
    <>
      {!token && (
        <>
          <form>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <button type="button" onClick={login}>
              Login
            </button>
          </form>
          <Link href="/register">
            <a style={{ color: "blue" }}> Register</a>
          </Link>
        </>
      )}
    </>
  );
};

export default Login;
