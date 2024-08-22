


import React, { useState, useContext } from "react";
import classes from "./Auth.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../Utility/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { ClipLoader } from "react-spinners";
import { DataContext } from "../../components/DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({
    signIn: false,
    signUp: false,
  });
  const [authAction, setAuthAction] = useState("");

  const { dispatch } = useContext(DataContext);
  const navigate = useNavigate();
  const navStateData = useLocation();

  const authHandler = async (e) => {
    e.preventDefault();

    if (authAction === "signin") {
      setLoading((prev) => ({ ...prev, signIn: true }));
      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading((prev) => ({ ...prev, signIn: false }));
          navigate(navStateData.state?.redirect || "/");
          console.log(navStateData); // Check the value of navStateData
        })
        .catch((err) => {
          setError(err.message);
          setLoading((prev) => ({ ...prev, signIn: false }));
        });
    } else if (authAction === "signup") {
      setLoading((prev) => ({ ...prev, signUp: true }));
      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading((prev) => ({ ...prev, signUp: false }));
          navigate(navStateData.state?.redirect || "/");
        })
        .catch((err) => {
          setError(err.message);
          setLoading((prev) => ({ ...prev, signUp: false }));
        });
    }
  };

  return (
    <section className={classes.login}>
      <Link to="/">
        <img
          src="https://logos-world.net/wp-content/uploads/2020/04/Amazon-Logo.png"
          alt="logo"
        />
      </Link>

      <div className={classes.login__container}>
        <h1>Sign In</h1>
        {navStateData?.state?.msg && (
          <small
            style={{
              padding: "5px",
              textAlign: "center",
              color: "red",
              fontWeight: "bold",
            }}
          >
            {navStateData.state.msg}
          </small>
        )}
        <form onSubmit={authHandler}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              type="email"
              id="email"
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              required
            />
          </div>
          <button
            type="submit"
            onClick={() => setAuthAction("signin")}
            className={classes.login__signInButton}
          >
            {loading.signIn ? <ClipLoader color="#000" size={15} /> : "Sign In"}
          </button>
        </form>

        <p>
          By continuing, you agree to Amazon's Fake clone conditions of Use and
          Sale. Please see our privacy notice, our cookies Notices, and our
          interest-based Ads Notice.
        </p>

        <button
          type="button"
          onClick={() => {
            setAuthAction("signup");
            document.querySelector("form").submit(); // Trigger form submission for sign up
          }}
          className={classes.login__registerButton}
        >
          {loading.signUp ? (
            <ClipLoader color="#000" size={15} />
          ) : (
            "Create Your Amazon Account"
          )}
        </button>

        {error && (
          <small style={{ paddingTop: "5px", color: "red" }}>{error}</small>
        )}
      </div>
    </section>
  );
}

export default Auth;




































