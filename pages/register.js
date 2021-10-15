import React from 'react'
import Register from '../components/Register'
const RegisterPage = () => {
  return (
<<<<<<< HEAD
    <Register/>
  )
}
=======
    <>
      {!token && (
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
            <a style={{color:"purple",backgroundColor:"blue"}}> Login</a>
          </Link>
        </>
      )}
    </>
  );
};
>>>>>>> d777215228f2ef0c7fa39739f20041e29e4395f0

export default RegisterPage
