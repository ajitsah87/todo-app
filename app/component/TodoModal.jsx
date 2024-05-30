import React, { useEffect } from "react";
import {motion} from 'framer-motion';
import { ImCross } from "react-icons/im";
import {toast} from 'sonner';
import {v4 as uuid} from 'uuid';

function TodoModal({setIsModalOpen, setMainTask, mainTask, title, setTitle, desc, setdesc, indexForEdit, setIndexForEdit}) {

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        addTodoList();
        
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [title, desc]);

  const addTodoList = () => {
    if(indexForEdit === null) {
      if (!title || !desc) return toast.warning('All Fields are Required!!');
      setMainTask(prev => [...prev, {title, desc, complition: false, id: uuid()}]);
    } else {
      const updatedTodo = [...mainTask];
      updatedTodo[indexForEdit] = {title, desc};
      setMainTask(updatedTodo);
      setIndexForEdit(null);
    }
    setTitle("");
    setdesc("");
    setIsModalOpen(false);
  };

  return (
    <>
      <motion.div
        animate={{backgroundColor: '#00000050', backdropFilter: 'blur(1rem)'}}
        exit={{opacity: 0, backdropFilter: 'blur(0)'}}
        transition={{type: 'tween'}}
        onClick={() => {
          setIsModalOpen(false);
          setTitle("");
          setdesc("");
        }}
        className="fixed z-50 inset-0 flex justify-center items-center"
      >
        <motion.div
          initial={{opacity: 0, scale: .5}}
          animate={{opacity: 1, scale: 1}}
          transition={{type: 'tween', duration: .2}}
          exit={{scale: .6, opacity: 0}}
          onClick={(e) => e.stopPropagation()}
          className="relative w-[min(922px,100%-2rem)] mx-auto min-h-[500px] border border-white/20 flex justify-center items-center flex-col bg-emerald-400 rounded-md shadow-md"
        >
          <div className="flex justify-center flex-col gap-5 w-[50%] max-[678px]:w-[80%]">
            <motion.div
              initial={{opacity: 0, y: 30}}
              animate={{opacity: 1, y: 0}}
              transition={{delay: .2}}
              className="h-12"
            >
              <input autoFocus value={title} onChange={(e) => setTitle(e.target.value)} className="h-full w-full px-3" type="text" placeholder="enter title" />
            </motion.div>
            <motion.div
              initial={{opacity: 0, y: 30}}
              animate={{opacity: 1, y: 0}}
              transition={{delay: .3}}
              className="h-12"
            >
              <input value={desc} onChange={(e) => setdesc(e.target.value)} className="h-full w-full px-3" type="text" placeholder="enter todo" />
            </motion.div>
          </div>
          <motion.button
            initial={{opacity: 0, y: 30}}
            animate={{opacity: 1, y: 0}}
            transition={{delay: .4}}
            onClick={addTodoList} className="px-10 my-5 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors"
          >
            ADD TODO
          </motion.button>
          <motion.button
            initial={{opacity: 0, scale: .5}}
            animate={{opacity: 1, scale: 1}}
            transition={{delay: .6}}
            onClick={() => {
              setIsModalOpen(false);
              setTitle("");
              setdesc("");
            }}
            className="hover:bg-red-600 group transition-colors rounded-full bg-white p-3 absolute -top-[20px] -right-[20px]"
          >
            <ImCross className="text-xl group-hover:text-white transition-colors text-red-600" />
          </motion.button>
        </motion.div>
      </motion.div>
    </>
  );
}

export default TodoModal;
