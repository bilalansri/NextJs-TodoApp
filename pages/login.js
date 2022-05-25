import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useState } from "react";

function Login() {
  const router = useRouter();

  const [jwt, setJwt] = useState('')

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loguser = async () => {
    const res = await fetch("http://localhost:3000/api/users/login");
    const { data} = await res.json();

    if (data == "JWT Success") {
      setJwt(data);
    }
  };

  useEffect(() => {
    loguser()
    if(jwt){
      router.push('/')
    } else {
      setJwt('')
    }
  }, [jwt])
  

  const loginHandler = async (e) => {
    e.preventDefault();
    const user = {
      email: email,
      password: password,
    };

    let res = await fetch("http://localhost:3000/api/users", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    let { data } = await res.json();

    if (data == "success") {
      router.push("/");
    } else {
      alert("User Not Found");
    }
  };

  return (
    <div className="bg-gray-300 min-w-full min-h-screen flex flex-col justify-center items-center p-10 space-y-4">
      <h1 className="text-5xl underline">Login Page</h1>

      <div className="flex space-x-3">
        <Link href="/">
          <button className="bg-blue-500 px-4 py-2 rounded-full text-white">
            Home
          </button>
        </Link>
        <Link href="/signup">
          <button className="bg-blue-500 px-4 py-2 rounded-full text-white">
            SignUp
          </button>
        </Link>
      </div>

      <form onSubmit={loginHandler} className="flex flex-col space-y-4 p-5">
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required={true}
          maxLength="30"
          type="email"
          className="p-2 outline-none rounded-lg h-10 w-60"
          placeholder="Enter Your Email"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required={true}
          maxLength="20"
          type="password"
          className="p-2 outline-none rounded-lg h-10 w-60"
          placeholder="Enter Your Password"
        />
        <button className="bg-blue-500 px-4 py-2 rounded-full text-white">
          LOGIN
        </button>
      </form>
    </div>
  );
}

export default Login;
