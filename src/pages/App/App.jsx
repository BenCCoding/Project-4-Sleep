import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

import SignupPage from "../SignupPage/SignupPage";
import LoginPage from "../LoginPage/LoginPage";
import ProfilePage from '../Profile/Profile';
import Feed from "../Feed/Feed";

import userService from "../../utils/userService";

function App() {
  const [user, setUser] = useState(userService.getUser()); 

  function handleSignUpOrLogin() {
    setUser(userService.getUser()); 
  }

  function handleLogout() {
    userService.logout();
    setUser(null);
  }
  console.log(user,  'this is user')
  if (user) {
   
    return (
      <Routes>
        <Route
          path="/"
          element={<Feed loggedUser={user} handleLogout={handleLogout} />}
        />
        <Route
          path="/login"
          element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />}
        />
        <Route
          path="/signup"
          element={<SignupPage handleSignUpOrLogin={handleSignUpOrLogin} />}
        />
        <Route
          path="/:username"
          element={<ProfilePage loggedUser={user} handleLogout={handleLogout} />}
        />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />}
      />
      <Route
        path="/signup"
        element={<SignupPage handleSignUpOrLogin={handleSignUpOrLogin} />}
      />
      <Route path="/*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;