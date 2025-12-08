"use client";
import MyBtn from "@/components/ui/MyBtn";
import { redirect } from "next/navigation";
import React, { useState } from "react";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  const handleLogin = () => {
    // Clear previous message
    setMessage(null);

    // Basic validation
    if (!username || !password) {
      setMessage({ text: "Please fill in all fields", type: "error" });
      return;
    }

    // Simulate login (replace with actual authentication)
    if (username === "admin" && password === "password") {
      setMessage({ text: "Login successful! Redirecting...", type: "success" });
      setTimeout(() => {
        // Redirect or handle successful login
        // console.log("Redirecting...");
        redirect("/admin/images");
      }, 1500);
    } else {
      setMessage({ text: "Invalid username or password", type: "error" });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="bg-foreground p-10 rounded-2xl shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-background mb-8">
          Login
        </h1>

        <div>
          <div className="mb-6">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-background/80 mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter your username"
              autoComplete="username"
              className="w-full px-4 py-3 text-background border-2 border-gray-200 rounded-lg focus:outline-none  focus:ring-2 focus:ring-background/50 transition-all"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-background/80 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter your password"
              autoComplete="current-password"
              className="w-full px-4 py-3 text-background border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-background/50 transition-all"
            />
          </div>

          <MyBtn
            onClick={handleLogin}
            text="Sign In"
            className={`${!username || !password ? "cursor-not-allowed!" : ""}`}
            width="full"
            disabled={!username || !password}
          />

          {message && (
            <div
              className={`mt-6 p-3 rounded-lg text-center text-sm ${
                message.type === "success"
                  ? "bg-green-100 text-green-800 border border-green-300"
                  : "bg-red-100 text-red-800 border border-red-300"
              }`}
            >
              {message.text}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
