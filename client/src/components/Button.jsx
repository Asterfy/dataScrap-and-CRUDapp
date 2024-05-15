import { FaTrashAlt } from "react-icons/fa";
import { BiSolidEdit } from "react-icons/bi";
import { IoAddCircle } from "react-icons/io5";
import {Modal} from './Modal'
import {useState, useEffect} from 'react'
export function Button({ type, idDoc }) {
  const [Open, setOpen] = useState(false)

  return (
    <div>
      {type == "edit" && (
        <button 
          onClick={() => console.log(idDoc)}
          className="h-8 w-8 border-2 border-black flex justify-center items-center mx-2 bg-yellow-400 my-1 rounded hover:bg-yellow-200"
        >
          <BiSolidEdit className="text-xl text-black" />
        </button>
      )}
      {type == "delete" && (
        <button className="h-8 w-8 border-2 border-black flex justify-center items-center mx-2 bg-red-400 my-1 rounded hover:bg-red-200">
          <FaTrashAlt className="text-xl text-black" />
        </button>
      )}
      {type == "add" && (
        <button className="h-8 w-24 border-2 border-black flex justify-center items-center mx-2 bg-blue-400 my-1 rounded hover:bg-blue-200">
          <IoAddCircle className="text-xl text-black" /> <span className="ml-1 text-xl">Create</span> 
        </button>
      )}
    </div>
  );
}