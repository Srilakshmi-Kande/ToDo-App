"use client";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [title, setTitle] = useState("");
  const [datetime, setDatetime] = useState("");
  const [mainTask, setMainTask] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setMainTask(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("tasks", JSON.stringify(mainTask));
    }
  }, [mainTask, mounted]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!title || !datetime) return;
    setMainTask([...mainTask, { title, datetime }]);
    setTitle("");
    setDatetime("");
  };

  const deleteHandler = (i) => {
    const updated = mainTask.filter((_, index) => index !== i);
    setMainTask(updated);
  };

  if (!mounted) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <>
      <div className="w-[80%] mx-auto flex items-center justify-between mt-5 p-5">
        <h2 className="text-4xl font-bold text-center">ToDo App</h2>
        <p>Total todos: {mainTask.length}</p>
      </div>

      <form onSubmit={submitHandler} className="flex justify-center flex-wrap">
        <input
          type="text"
          className="text-2xl border-zinc-800 border-4 m-8 px-4 py-2"
          placeholder="Enter Title Here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="date"
          className="text-2xl border-zinc-800 border-4 m-8 px-4 py-2"
          value={datetime}
          onChange={(e) => setDatetime(e.target.value)}
        />
        <button className="bg-green-700 text-white px-4 py-2 text-2xl font-bold rounded m-8">
          Add Task
        </button>
      </form>

      <div className="w-[80%] mx-auto">
        <hr />
        <div className="p-8 bg-slate-200">
          <ul>
            <li className="flex items-center justify-between mb-5">
              <div className="flex items-center justify-between w-3/5">
                <h6 className="text-2xl font-semibold">Title</h6>
                <h6 className="text-2xl font-semibold">Date</h6>
              </div>
            </li>
            <hr className="w-full mb-5" />
            {mainTask.length > 0 ? (
              mainTask.map((t, i) => (
                <li
                  key={t.title + t.datetime}
                  className="flex items-center justify-between mb-8"
                >
                  <div className="flex items-center justify-between w-3/5">
                    <h5 className="text-2xl font-semibold">{t.title}</h5>
                    <h6 className="text-lg font-medium">{t.datetime}</h6>
                  </div>
                  <button
                    onClick={() => deleteHandler(i)}
                    className="px-2 py-1 bg-red-700 text-white sm:px-4 sm:py-2 font-bold rounded"
                  >
                    Delete
                  </button>
                </li>
              ))
            ) : (
              <h2>No Task Available</h2>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
