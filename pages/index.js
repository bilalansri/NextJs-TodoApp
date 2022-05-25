import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Todo from "../components/Todo";

export default function Home() {
  const [jwt, setJwt] = useState("");
  const [todos, setTodos] = useState([]);
  const router = useRouter();

  const getTodo = async () => {
    const res = await fetch(`http://localhost:3000/api/todos`);
    const { data } = await res.json();

    if (data == "Invalid Token") {
      return;
    } else {
      setTodos(data);
    }
  };

  const loguser = async () => {
    const res = await fetch("http://localhost:3000/api/users/login");
    const { data, id } = await res.json();

    if (data == "JWT Success") {
      setJwt(id);
    }
  };

  const logoutHandler = async () => {
    const res = await fetch("http://localhost:3000/api/users/logout");
    const { data } = await res.json();
    setJwt("");
    router.push("/login");
  };

  useEffect(() => {
    loguser();
    getTodo();
  }, []);

  return (
    <div className="bg-gray-300 min-w-full min-h-screen">
      <Head>
        <title>Todo by Bilal</title>
      </Head>

      <main className="flex flex-col justify-center items-center p-5">
        <h1 className="text-5xl underline">Todo App</h1>

        <div className="space-x-2 p-5">
          <Link href="/signup">
            <button className="bg-blue-500 px-4 py-2 rounded-full text-white">
              SignUp
            </button>
          </Link>

          {jwt ? (
            <Link href="/login">
              <button
                className="bg-blue-500 px-4 py-2 rounded-full text-white"
                onClick={logoutHandler}
              >
                LogOut
              </button>
            </Link>
          ) : (
            <Link href="/login">
              <button className="bg-blue-500 px-4 py-2 rounded-full text-white">
                LogIn
              </button>
            </Link>
          )}
        </div>

        {jwt ? (
          <Todo todos={todos} logId={jwt} getTodo={getTodo} />
        ) : (
          <h1 className="text-4xl font-bold">Login To use Todo</h1>
        )}
      </main>
    </div>
  );
}
