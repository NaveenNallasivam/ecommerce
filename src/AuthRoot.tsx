import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import SignUp from "./signUp";
import Login from "./login";
import About from "../about";
import Contact from "../contact";
import OauthLogin from "./oauth/oauthLogin";
import Secure from "./oauth/secure";
import "./oauth/login.css";

type Screen = "signup" | "login" | "app" | "about" | "contact";

export interface User {
  id: number;
  firstName: string;
  email: string;
  password: string;
}

const AuthRoot = () => {
  const [screen, setScreen] = useState<Screen>("signup");
  const [users, setUsers] = useState<User[]>([]);


  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data.users));
  }, []);

  if (screen === "app") {
    return <App
      onContactClick={() => setScreen("contact")}
      onHomeClick={() => setScreen("app")}
      onAboutClick={() => setScreen("about")}
      onSignUpClick={() => setScreen("signup")}

    />;
  }

  if (screen === "login") {
    return (
      <>
      <Router>
        <Routes>
          <Route path="/" element={<OauthLogin />} />
          <Route path="/secure" element={<Secure />} />
        </Routes>
      </Router>
    </>
    );
  }

  if (screen === "about") {
    return (
      <About
        onContactClick={() => setScreen("contact")}
        onSignUpClick={() => setScreen("signup")}
        onHomeClick={() => setScreen("app")}

      />
    );
  }

  if (screen === "contact") {
    return (
      <Contact

        onAboutClick={() => setScreen("about")}
        onSignUpClick={() => setScreen("signup")}
        onHomeClick={() => setScreen("app")}

      />
    );
  }

  return (
    <SignUp

      onSignup={() => setScreen("app")}
      onSwitch={() => setScreen("login")}
    />
  );
};


export default AuthRoot;
