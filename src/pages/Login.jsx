import React from "react";
import { signInWithGoogle } from "../utilities/auth"; // Import the sign-in function from auth.js
import { useNavigate } from "react-router-dom";
import { copyUserData } from "../utilities/database";

function Login() {
  const navigate = useNavigate();
  // copyUserData(uid1, uid2);
  const handleLogin = async () => {
    const user = await signInWithGoogle();
    if (user) {
      // Handle successful login, e.g., redirect to main page or save user data
      navigate("/");
      console.log("User successfully logged in:", user);
    } else {
      console.log("Login failed. try again");
    }
  };

  return (
    <div className="login-container flex flex-col p-4 gap-8 h-full justify-center">
      <p className="text-4xl font-semibold">Get Started</p>
      <div>
        <button className="bg-neutral-700 text-white" onClick={handleLogin}>
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

export default Login;
