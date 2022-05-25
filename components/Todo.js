
import { useRouter } from "next/router";
import React, { useState } from "react";

function Todo({ todos , logId, getTodo}) {
  const router = useRouter();

  const [update, setUpdate] = useState("");
  const [text, setText] = useState("");

  // if (!loguser.email) {
  //   nav("/login");
  // }

  const formHandler = async (e) => {
    e.preventDefault();

    const logid = logId;

    if (update == "") {
      let res = await fetch("http://localhost:3000/api/todos", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, logid }),
      });
      setText("");
      getTodo()
    } else {
      let res = await fetch(`http://localhost:3000/api/todos/${update}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, logid }),
      });
      setText("");
      setUpdate("");

      getTodo()
    }
  };

  const editToDo = (_id, text) => {
    setUpdate(_id);
    setText(text);
  };

  const deleteToDo = async (_id) => {
    try {
      await fetch(`http://localhost:3000/api/todos/${_id}`, {
        method: "DELETE",
      });

      getTodo()
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center p-10 space-y-4">
      <form onSubmit={formHandler} className="space-x-2">
        <input
          required={true}
          value={text}
          onChange={(e) => setText(e.target.value)}
          type="text"
          className="outline-none rounded-lg h-10 w-60 p-2"
        />
        <button className="bg-blue-500 px-4 py-2 rounded-full text-white">
          {update ? "UPDATE TODO" : "ADD TODO"}
        </button>
      </form>

      <div>
        <ul>
          {todos &&
            todos.map((todo) => (
              <li
                className="flex w-80 justify-between items-center space-y-2 "
                key={todo._id}
              >
                <p>{todo.text}</p>
                <div className="flex justify-end space-x-2">
                  <button
                    className="bg-blue-500 px-2 py-1 rounded-full text-white"
                    onClick={() => editToDo(todo._id, todo.text)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-blue-500 px-2 py-1 rounded-full text-white"
                    onClick={() => deleteToDo(todo._id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default Todo;
