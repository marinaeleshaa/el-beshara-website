"use client";
import MyBtn from "@/components/ui/MyBtn";
import { Spinner } from "@/components/ui/spinner";
import { loginMethod } from "@/lib/api/auth";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  const handleLogin = async () => {
    setIsLoading(true);
    // Clear previous message
    setMessage(null);

    // Basic validation
    if (!email || !password) {
      setMessage({ text: "Please fill in all fields", type: "error" });
      return;
    }
    // ! main logic
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const checkLogin = await loginMethod({
      email: trimmedEmail,
      password: trimmedPassword,
    });

    if (checkLogin.success) {
      setMessage({ text: "Login successful! Redirecting...", type: "success" });

      setTimeout(() => {
        redirect("/admin/images");
      }, 1500);
    } else {
      setMessage({ text: checkLogin.message, type: "error" });
    }

    setIsLoading(false);
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
              htmlFor="email"
              className="block text-sm font-medium text-background/80 mb-2"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyPress}
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
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Enter your password"
                autoComplete="current-password"
                className="w-full px-4 py-3 text-background border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-background/50 transition-all pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute text-background cursor-pointer text-lg right-3 top-1/2 transform -translate-y-1/2 focus:outline-none"
              >
                {showPassword ? <FaEye /> : <IoMdEyeOff />}
              </button>
            </div>
          </div>

          <MyBtn
            onClick={handleLogin}
            text={isLoading ? <Spinner/> : "Login"}
            className={`${!email || !password ? "cursor-not-allowed!" : ""}`}
            width="full"
            disabled={!email || !password}
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
