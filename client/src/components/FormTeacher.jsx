import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { updateTeacher, createTeacher } from "../api/data.api";
import toast from "react-hot-toast";

export function FormTeacher({ teacher, closeModal, loadTable }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (teacher) {
      setValue("Nombre", teacher.Nombre);
      setValue("Apellido_paterno", teacher.Apellido_paterno);
      setValue("Apellido_materno", teacher.Apellido_materno);
    } else {
      setValue("Nombre", "");
      setValue("Apellido_paterno", "");
      setValue("Apellido_materno", "");
    }
  }, [teacher]);

  const title = teacher ? "Modificar Docente" : "Crear Docente";

  const exectUpdateOrCreate = async (data) => {
    let res;
    if (teacher) {
      res = await updateTeacher(teacher.ID, data);
      if (res.status === 200)
        toast.success("Docente actualizado con éxito", {
          position: "top-right",
          duration: 2000,
        });
      else
        toast.error("Error al actualizar docente", {
          position: "top-right",
          duration: 2000,
        });
    } else {
      res = await createTeacher(data);
      if (res.status === 200)
        toast.success("Docente creado con éxito", {
          position: "top-right",
          duration: 2000,
        });
      else
        toast.error("Error al crear docente", {
          position: "top-right",
          duration: 2000,
        });
    }
    closeModal();
    loadTable();
  };

  const onSubmit = handleSubmit((data) => {
    exectUpdateOrCreate(data);
  });
  return (
    <div>
      <h2 className="text-center text-lg font-bold mb-3">{title}</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label className="text-sm text-gray-500" htmlFor="">
            Nombre
          </label>
          <input
            autoComplete="off"
            className="border-b-2 border-black text-black rounded text-lg mb-3 w-11/12"
            type="text"
            {...register("Nombre", { required: true })}
          />
        </div>
        <div>
          <label className="text-sm text-gray-500" htmlFor="">
            Apellido Paterno
          </label>
          <input
            autoComplete="off"
            className="border-b-2 border-black text-black rounded text-lg mb-3 w-11/12"
            type="text"
            {...register("Apellido_paterno", { required: true })}
          />
        </div>
        <div>
          <label className="text-sm text-gray-500" htmlFor="">
            Apellido Materno
          </label>
          <input
            autoComplete="off"
            className="border-b-2 border-black text-black rounded text-lg mb-3 w-11/12"
            type="text"
            {...register("Apellido_materno", { required: true })}
          />
        </div>
        {teacher ? (
          <button className="bg-yellow-500 rounded text-white text-xl w-11/12 h-9 mt-3 hover:bg-yellow-300">
            Save
          </button>
        ) : (
          <button className="bg-blue-600 rounded text-white text-xl w-11/12 h-9 mt-3 hover:bg-blue-400">
            Save
          </button>
        )}
        {(errors.nombre || errors.apellido_pat || errors.apellido_mat) && (
          <p className="text-red-500 text-[12px]">Llene todos los campos</p>
        )}
      </form>
    </div>
  );
}
