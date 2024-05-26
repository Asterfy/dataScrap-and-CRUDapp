import { FaTrashAlt } from "react-icons/fa";
import { BiSolidEdit } from "react-icons/bi";

export function Button({ type, idDoc, sendDataToParentToEdit, sendDataToParentToDelete}) {

  return (
    <div>
      {type == "edit" && (
        <button 
          onClick={() => sendDataToParentToEdit(idDoc)}
          className="h-8 w-8 border-2 border-black flex justify-center items-center mx-2 bg-yellow-400 my-1 rounded hover:bg-yellow-200"
        >
          <BiSolidEdit className="text-xl text-black" />
        </button>
      )}
      {type == "delete" && (
        <button onClick={() => sendDataToParentToDelete(idDoc)} className="h-8 w-8 border-2 border-black flex justify-center items-center mx-2 bg-red-400 my-1 rounded hover:bg-red-200">
          <FaTrashAlt className="text-xl text-black" />
        </button>
      )}
    </div>
  );
}