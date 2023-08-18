"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from 'next/router';

const LoginSignup: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-lg p-8 shadow-md w-96">
        <div className="flex mb-8">
          <button
            className={`flex-1 p-2 text-black text-center border-b-2 ${
              activeTab === "login"
                ? "border-purple-950 text-purple-950"
                : "border-gray-300"
            }`}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
          <button
            className={`flex-1 p-2 text-black text-center border-b-2 ${
              activeTab === "signup"
                ? "border-purple-950 text-purple-950"
                : "border-gray-300"
            }`}
            onClick={() => setActiveTab("signup")}
          >
            Signup
          </button>
        </div>
        {activeTab === "login" ? <LoginForm /> : <SignupForm />}
      </div>
    </div>
  );
};

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const router = useRouter();
  const handleLogin = async () => {
    const userCredentials = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post('/api/login', userCredentials);

      console.log('Login successful:', response.data);
      localStorage.setItem('token', response.data.token);
      setShowSuccessPopup(true); 
      router.push('/profile'); 
    } catch (error) {
      // @ts-ignore
      alert(error.response.data.message);
      // @ts-ignore
      console.error("Error Login:", error.response.data.message);
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="text-black">
      <input
        type="email"
        placeholder="Email"
        className="w-full mb-4 p-2 rounded border"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full mb-4 p-2 rounded border"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="w-full p-2 bg-custom2 text-white rounded"
        onClick={handleLogin}
      >
        Login
      </button>
      {showSuccessPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-75 bg-gray-900">
          <div className="bg-white p-6 rounded-md shadow-md">
            <p className="text-green-600 font-semibold mb-2">
              User created successfully! Now Login
            </p>
            <button
              className="w-full p-2 bg-blue-500 text-white rounded"
              onClick={() => setShowSuccessPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const SignupForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleSignup = async () => {
    const newUser = {
      name: name,
      email: email,
      password: password,
      phoneNo: phoneNo,
      profilePhoto: profilePhoto,
    };

    try {
      const response = await axios.post(
        "/api/signup",
        newUser
      );
      setShowSuccessPopup(true);
      console.log("User registered successfully:", response.data.message);
    } catch (error) {
      // @ts-ignore
      alert(error.response.data.message);
      // @ts-ignore
      console.error("Error signing up:", error);
    }
  };

  return (
    <div className="text-black">
      <input
        type="text"
        placeholder="Name"
        className="w-full mb-4 p-2 rounded border"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        className="w-full mb-4 p-2 rounded border"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full mb-4 p-2 rounded border"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="tel"
        placeholder="Phone Number"
        className="w-full mb-4 p-2 rounded border"
        value={phoneNo}
        onChange={(e) => setPhoneNo(e.target.value)}
      />
      <input
        type="text"
        placeholder="Profile Photo Link"
        className="w-full mb-4 p-2 rounded border"
        value={profilePhoto}
        onChange={(e) => setProfilePhoto(e.target.value)}
      />
      <button
        className="w-full p-2 bg-custom2 text-white rounded"
        onClick={handleSignup}
      >
        Signup
      </button>
      {showSuccessPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-75 bg-gray-900">
          <div className="bg-white p-6 rounded-md shadow-md">
            <p className="text-green-600 font-semibold mb-2">
              User created successfully! Now Login
            </p>
            <button
              className="w-full p-2 bg-blue-500 text-white rounded"
              onClick={() => setShowSuccessPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginSignup;