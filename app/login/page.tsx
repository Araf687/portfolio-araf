"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("arafyeasin@gmail.com");
  const [password, setPassword] = useState("Araf131825");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const { signIn } = await import("next-auth/react");
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    console.log({res})
    if (res?.error) {
      setError("Invalid credentials");
      return;
    }

    router.push("/admin");
  };

  return (
    <div className="min-h-screen -mt-24 flex items-center justify-center bg-black">
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-6 p-10 w-[400px] md:w-[500px] rounded-2xl 
                   border border-white/20 shadow-lg text-white"
      >
        <h2 className="text-2xl font-bold text-center text-gray-200 mb-3">Admin</h2>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-gray-200 mb-1 font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-600 bg-gray-800 text-white p-3 rounded-lg placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
            required
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-white mb-1 font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-600 bg-gray-800 text-white p-3 rounded-lg placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
            required
          />
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <button
          type="submit"
          className="bg-gray-100 text-gray-900 cursor-pointer p-3 rounded-lg font-semibold transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
