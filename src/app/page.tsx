"use client";

import { useState } from "react";
import LoadingButton from "@/components/LoadingButton";

export default function rootPage() {

  type course = {
    course: string,
    trainer: string,
    id: number
  }

  type courses = course[]

  const [courses, setCourses] = useState([] as courses);

  const [userInput, setInput] = useState({
    course: "",
    trainer: "",
    id: 0
  } as course)

  const [isLoading, setLoading] = useState(false);

  function submitHandler() {
    if (userInput.course === "" || userInput.trainer === "") {
      return
    }
    setLoading(true);
    setTimeout(() => {
      setCourses([...courses, userInput])
      setInput({ course: "", trainer: "", id: 0 })
      setLoading(false);
    }, 900)
  }

  return (
    <>
      <div className="h-full w-full bg-zinc-900 text-white overflow-y-auto">
        <div className="max-w-[800px] m-auto pt-[1px]">
          <form onSubmit={(e) => { e.preventDefault() }} className="flex flex-wrap gap-4 mt-8 p-2 rounded ">
            <input required value={userInput.course} onChange={(e) => { setInput({ ...userInput, course: e.target.value }) }} placeholder="Course" type="text" name="task" className="outline-none rounded bg-transparent/40 px-2 grow placeholder:text-zinc-500/60 h-[50px]" />
            <input required value={userInput.trainer} onChange={(e) => { setInput({ ...userInput, trainer: e.target.value }) }} placeholder="Trainer" type="text" name="task" className="outline-none rounded bg-transparent/40 px-2 grow placeholder:text-zinc-500/60" />
            <button onClick={() => submitHandler()} type="submit" className="bg-blue-500 hover:bg-blue-500/80 px-4 py-2 rounded font-bold">{isLoading ? <LoadingButton/> : "Add"}</button>
          </form>
          <div className="ring-1 mt-8 mx-8 ring-zinc-800 "></div>
          <div className="pt-8 flex flex-col gap-4">
            {
              courses.length > 0 ? courses.map((course) => {
                return <div key={course.id} className="bg-transparent/20 p-4 rounded"><h1 className="text-3xl">{course.course}</h1><div className="mt-3 text-sm pl-4 text-zinc-400">{course.trainer}</div></div>
              }) : <div className="text-center text-slate-600/60 text-3xl">No Courses</div>
            }
          </div>
        </div>

      </div>
    </>
  )
}