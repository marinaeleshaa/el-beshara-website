"use client";
import MyBtn from "@/components/ui/MyBtn";
import { addAdminMethod } from "@/lib/api/admin";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";

const AddAdminForm = () => {
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  const handleAddAdmin = async () => {
    setMessage(null);

    // Validation
    if (!email || !password || !confirmPassword || !username) {
      setMessage({ text: "Please fill in all fields", type: "error" });
      return;
    }

    if (password !== confirmPassword) {
      setMessage({ text: "Passwords do not match", type: "error" });
      return;
    }

    const trimmedEmail = email.trim();
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    // Call API to add admin
    const res = await addAdminMethod({
      email: trimmedEmail,
      password: trimmedPassword,
      username: trimmedUsername,
    });
    if (res.success) {
      setMessage({ text: "Admin added successfully!", type: "success" });
      setEmail("");
      setPassword("");
      setUsername("");
      setConfirmPassword("");
      redirect("/admin/admins");
    } else {
      setMessage({ text: res.message, type: "error" });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleAddAdmin();
  };

  return (
    <div className=" flex items-center justify-center bg-background">
      <div className="bg-foreground p-10 rounded-2xl shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-background mb-8">
          Add Admin
        </h1>

        <div className="space-y-6">
          {/* username */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-background/80 mb-2">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Enter admin username"
              className="w-full px-4 py-3 text-background border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-background/50 transition-all"
            />
          </div>
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-background/80 mb-2">
              Email
            </label>
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Enter admin email"
              className="w-full px-4 py-3 text-background border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-background/50 transition-all"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-background/80 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Enter password"
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

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-background/80 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Confirm password"
                className="w-full px-4 py-3 text-background border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-background/50 transition-all pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute text-background cursor-pointer text-lg right-3 top-1/2 transform -translate-y-1/2 focus:outline-none"
              >
                {showConfirmPassword ? <FaEye /> : <IoMdEyeOff />}
              </button>
            </div>
          </div>

          <MyBtn
            onClick={handleAddAdmin}
            text="Add Admin"
            width="full"
            disabled={!email || !password || !confirmPassword}
            className={`${
              !email || !password || !confirmPassword
                ? "cursor-not-allowed!"
                : ""
            }`}
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

export default AddAdminForm;
