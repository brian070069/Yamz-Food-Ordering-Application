import React from "react";
import LoginForm from "./LoginForm";
import { Link } from "react-router-dom";
import Header from "../../components/Header";

const Login = () => {
  return (
    <section className="login__container">
      <Header />
      <div className="auth__info">
        <h3>Welcome back</h3>
        <p>
          New to Qmelter?
          <span>
            <Link to="/register">Sign up</Link>
          </span>
        </p>
      </div>
      <LoginForm />
    </section>
  );
};

export default Login;
