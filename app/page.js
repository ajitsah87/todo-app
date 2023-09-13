"use client";

import React, { useEffect, useState } from "react";

function page() {
  const [title, setTitle] = useState("");
  const [desc, setdesc] = useState("");

  const [mainTask, setMainTask] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      let todos = localStorage.getItem("todos");
      try {
        let savedTodo = JSON.parse(todos);
        if (Array.isArray(savedTodo)) {
          setMainTask(savedTodo);
        } else {
          setMainTask([]);
        }
      } catch (error) {
        console.error("Error parsing todos from localStorage:", error);
        setMainTask([]);
      }
    }
  }, []);
  

  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(mainTask))
  },[mainTask])
  
  const submitHandler = (e) => {
    e.preventDefault();
    if (!title || !desc  ) return 
    setMainTask([...mainTask, { title, desc }]);
    setTitle("");
    setdesc("");
    
  };
  const deleteTaskHandler = (i) => {
    let copyTask = [...mainTask];
    copyTask.splice(i, 1);
    setMainTask(copyTask);
  };
  let renderTask = <h2 className="text-center">No Task Available</h2>;
  if (mainTask.length > 0) {
    renderTask = mainTask.map((t, i) => {
      return (
        <ul key={i} className="flex items-center justify-between">
          <li className="">
            <div className="flex items-center justify-between mb-5 w-2/3">
              <h4 className="text-2xl font-semibold ">{t.title}</h4>
              <h5 className="text-lg font-medium  ">{t.desc}</h5>
            </div>
            <button
              onClick={() => {
                deleteTaskHandler(i);
              }}
              className="bg-yellow-300 px-4 py-2 text-red-500 mb-6 rounded"
            >
              Delete
            </button>
          </li>
        </ul>
      );
    });
  }

  return (
    <>
      <h1 className="bg-red-500 w-full text-yellow-100 p-5 text-center font-bold text-4xl">
        Real ToDo List
      </h1>
      <form onSubmit={submitHandler} className="mb-4">
        <input
          className="text-2xl bg-yellow-100 border-red-500 text-red-800 outline-none border-4 m-5 py-2 px-4"
          placeholder="Topic Kya Rakhu Ab"
          type="text"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          value={title}
        />
        <input
          className="text-2xl bg-yellow-100 border-red-500 text-red-800 border-4 outline-none m-5 py-2 px-4"
          placeholder="Kya Lena Hai Idhar Likh Lo"
          type="text"
          value={desc}
          onChange={(e) => {
            setdesc(e.target.value);
          }}
        />
        <button
          className="bg-red-500 text-yellow-100 font-bold rounded m-5 py-2 px-4 text-2xl "
         
        >
          Add Task
        </button>
      </form>
      <div className="bg-red-500 p-8">
        <ul className="text-yellow-100 font-bold text-2xl">
          <li>{renderTask}</li>
          </ul>
      </div>
    </>
  );
}

export default page;
