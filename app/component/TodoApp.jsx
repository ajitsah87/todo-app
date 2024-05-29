"use client";
import { useEffect, useState } from "react";
import CanvasBgAnimation from "./CanvasBgAnimation";
import { FaPlus } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import TodoModal from "./TodoModal";
import { MdDelete, MdCheckBoxOutlineBlank } from "react-icons/md";
import { FaEdit, FaRegCheckSquare } from "react-icons/fa";

const TodoApp = () => {

  // const initialDemoTodos = [
  //   { title: "work", desc: "check email", complition: false },
  //   { title: "works", desc: "check email", complition: false },
  //   { title: "works", desc: "check emails", complition: false },
  // ];

  const [title, setTitle] = useState("");
  const [desc, setdesc] = useState("");
  const [IsModalOpen, setIsModalOpen] = useState(false);
  const [mainTask, setMainTask] = useState([]);
  const [loading, setLoading] = useState(true);
  const [indexForEdit, setIndexForEdit] = useState(null);
  const [viewAll, setViewAll] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      let todos = localStorage.getItem("todos");
      try {
        let savedTodo = JSON.parse(todos);
        if (Array.isArray(savedTodo)) {
          setMainTask(savedTodo.length > 0 ? savedTodo : []);
        } else {
          setMainTask([]);
        }
      } catch (error) {
        console.error("Error parsing todos from localStorage:", error);
        setMainTask([]);
      } finally {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(mainTask));
  }, [mainTask]);

  const deleteTaskHandler = (index) => {
    let copyTask = [...mainTask];
    copyTask.splice(index, 1);
    setMainTask(copyTask);
  };

  const handleEditTodo = (index) => {
    const todoToEdit = mainTask[index];
    setIndexForEdit(index);

    setTitle(todoToEdit.title);
    setdesc(todoToEdit.desc);

    setIsModalOpen(true);
  };

  const handleTodoComplition = (index) => {
    const todoToComplition = [...mainTask];
    todoToComplition[index].complition = !todoToComplition[index].complition;
    setMainTask(todoToComplition);
  };

  return (
    <div>
      <h2 className="text-center text-5xl font-bold my-8">Todo List</h2>
      <div className="w-[min(1200px,100%-2rem)] mx-auto bg-slate-800 min-h-[500px] flex flex-col justify-center py-10">
        <button
          onClick={() => setIsModalOpen((prev) => !prev)}
          className="mb-3 p-4 w-1/2 h-20 mx-auto relative rounded-md overflow-hidden max-md:w-11/12"
        >
          <span className="absolute inset-0 ">
            <CanvasBgAnimation />
          </span>
          <span className="absolute inset-0 backdrop-blur-2xl bg-white/20 z-20  grid place-content-center text-white">
            <FaPlus className="text-5xl text-slate-700" />
          </span>
        </button>

        {loading ? (
          <div className="text-3xl font-semibold text-center text-white">loading..</div>
        ) : (
          <AnimatePresence initial={false}>
            {mainTask.slice(0, viewAll ? mainTask.length : 3).map((todo, i) => (
              <motion.div
              initial={{opacity: 0, height: 0, scale: .8}}
              animate={{opacity: 1, height: 'auto', scale: 1}}
              exit={{opacity: 0, height: 0, scale: .8}}
              transition={{opacity: {duration: .2}}}
              key={todo.id}
              >
                <div className="p-4  rounded-md mb-3 w-1/2 mx-auto gap-4 bg-amber-200 flex justify-between items-center  max-sm:flex-col max-md:w-11/12">
                  <div className=" w-[90%]  break-words  overflow-x-scroll">
                    <div
                      className={`text-xl font-black text-slate-800  ${
                        todo.complition && "line-through opacity-50"
                      }`}
                    >
                      {todo.title}
                    </div>
                    <div
                      className={`text-lg font-normal text-slate-800 ${todo.complition && "line-through  opacity-50"}`}
                    >
                      {todo.desc}
                    </div>
                  </div>
                  <div className="flex justify-center items-center gap-3  max-sm:w-full max-sm:justify-end">
                    <button onClick={() => deleteTaskHandler(i)}>
                      <MdDelete className="text-2xl" />
                    </button>
                    <button
                      className={`${
                        todo.complition && "opacity-50 pointer-events-none"
                      }`}
                    >
                      <FaEdit
                        onClick={() => handleEditTodo(i)}
                        className="text-2xl"
                      />
                    </button>
                    <button onClick={() => handleTodoComplition(i)}>
                      {todo.complition ? (
                        <FaRegCheckSquare className="text-2xl" />
                      ) : (
                        <MdCheckBoxOutlineBlank className="text-2xl" />
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      {
        mainTask.length > 3 && (
          <button className="text-white py-2 px-3 rounded-md mt-2 bg-blue-500 hover:bg-blue-600 transition-colors w-fit mx-auto" onClick={() => setViewAll(prev => !prev)}>{viewAll ? 'show less': 'view all'}</button>
        )
      }
      </div>
      <AnimatePresence>
        {IsModalOpen && (
          <TodoModal
            setIsModalOpen={setIsModalOpen}
            setMainTask={setMainTask}
            mainTask={mainTask}
            title={title}
            setTitle={setTitle}
            desc={desc}
            setdesc={setdesc}
            indexForEdit={indexForEdit}
            setIndexForEdit={setIndexForEdit}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default TodoApp;
