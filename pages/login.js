import React from 'react'
import Login from '../components/Login'
const LoginPage = () => {
  return (
<<<<<<< HEAD
    <Login/>
  )
}
=======
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
            <a style={{ color: "purple" }}> Register</a>
          </Link>
        </>
      )}
    </>
  );
};
>>>>>>> d777215228f2ef0c7fa39739f20041e29e4395f0

export default LoginPage
