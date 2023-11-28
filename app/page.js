"use client";

import TodoApp from "./component/TodoApp"
import { Toaster } from "sonner";

const page = () => {
 
  return (
    <div>
      <TodoApp />
      <Toaster richColors position="top-center" />
    </div>
  )
}

export default page
