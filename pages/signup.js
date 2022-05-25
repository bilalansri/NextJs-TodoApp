import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";

function Signup() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [username, setUsename] = useState("");
  const [password, setPassword] = useState("");

  const signupHandler = async (e) => {
    e.preventDefault();

    const user = {
      email: email,
      username: username,
      password: password,
    };

    try {
      let res = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (res.status === 201) {
        alert("Try Different Email");
      } else {
        router.push("/login");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-gray-300 min-w-full min-h-screen flex flex-col justify-center items-center p-10 space-y-4">
      <h1 className="text-5xl underline">SignUp Page</h1>

      <div className="flex space-x-3">
        <Link href="/">
          <button className="bg-blue-500 px-4 py-2 rounded-full text-white">
            Home
          </button>
        </Link>
        <Link href="/login">
          <button className="bg-blue-500 px-4 py-2 rounded-full text-white">
            Login
          </button>
        </Link>
      </div>

      <form onSubmit={signupHandler} className="flex flex-col space-y-4 p-5">
        <input
          maxLength="10"
          required={true}
          type="text"
          className="p-2 outline-none rounded-lg h-10 w-60"
          placeholder="Enter Your Username"
          onChange={(e) => setUsename(e.target.value)}
          value={username}
        />
        <input
          maxLength="30"
          required={true}
          type="email"
          className="p-2 outline-none rounded-lg h-10 w-60"
          placeholder="Enter Your Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          maxLength="20"
          required={true}
          type="password"
          className="p-2 outline-none rounded-lg h-10 w-60"
          placeholder="Enter Your Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button className="bg-blue-500 px-4 py-2 rounded-full text-white">
          SIGNUP
        </button>
      </form>
    </div>
  );
}

export default Signup;
