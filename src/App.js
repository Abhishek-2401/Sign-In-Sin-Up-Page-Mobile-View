import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignInForm from "./components/Sign-In-Form-Mobile-View";
import SignUpForm from "./components/Sign-Up-Form_Mobile-View";
import './styles.css'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignInForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/" element={<SignInForm />} />
      </Routes>
    </Router>
  );
};

export default App;
