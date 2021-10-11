import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAuth } from "../components/auth";
import Link from "next/link";

const register = () => {
  const { token } = useAuth();
  const router = useRouter();
  if (token) router.replace("/");
  const [email, setEmail] = useState("");
  // console.log(email);
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  async function register(e) {
    e.preventDefault();
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
  return (
    <>
      <form>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
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
        <button type="button" onClick={register}>
          Register
        </button>
      </form>
      <Link href="/login">
        <a> Login</a>
      </Link>
    </>
  );
};

export default register;
