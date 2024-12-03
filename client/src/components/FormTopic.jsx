import { useForm } from "react-hook-form";
import { createTopic, updateTopic } from "../api/data.api";
import { useEffect } from "react";
import toast from "react-hot-toast";

export function FormTopic({ topic, closeModal, loadTable }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (topic) {
      setValue("codigo", topic.Codigo);
      setValue("nombre", topic.Nombre);
      setValue("nro_creditos", topic.Nro_creditos);
      setValue("categoria", topic.Categoria);
      setValue("requisito", topic.Requisito);
      setValue("semestre", topic.Semestre);
    } else {
      setValue("codigo", "");
      setValue("nombre", "");
      setValue("nro_creditos", "");
      setValue("categoria", "");
      setValue("requisito", "");
      setValue("semestre", "");
    }
  }, [topic]);

  const title = topic ? "Modificar Asignatura" : "Crear Asignatura";

  const exectUpdateOrCreate = async (data) => {
    data.nro_creditos = parseInt(data.nro_creditos, 10);
    data.semestre = parseInt(data.semestre, 10);
    let res;
    if (topic) {
      res = await updateTopic(topic.ID, data);
      if (res.status === 200)
        toast.success("Asignatura actualizada con éxito", {
          position: "top-right",
          duration: 2000,
        });
      else
        toast.error("Error al actualizar asignatura", {
          position: "top-right",
          duration: 2000,
        });
    } else {
      res = await createTopic(data);
      if (res.status === 200)
        toast.success("Asignatura creada con éxito", {
          position: "top-right",
          duration: 2000,
        });
      else
        toast.error("Error al crear asignatura", {
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
    <div className="z-20">
      <h2 className="text-center text-lg font-bold mb-3">{title}</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="" className="text-sm text-gray-500">
            Codigo
          </label>
          <input
            type="text"
            className="border-b-2 border-black text-black rounded text-sm mb-3 w-11/12"
            {...register("codigo", { required: true })}
          />
        </div>
        <div>
          <label htmlFor="" className="text-sm text-gray-500">
            Nombre
          </label>
          <input
            type="text"
            className="border-b-2 border-black text-black rounded text-sm mb-3 w-11/12"
            {...register("nombre", { required: true })}
          />
        </div>
        <div>
          <label htmlFor="" className="text-sm text-gray-500">
            Categoria
          </label>
          <input
            type="text"
            className="border-b-2 border-black text-black rounded text-sm mb-3 w-11/12"
            {...register("categoria", { required: true })}
          />
        </div>
        <div>
          <label htmlFor="" className="text-sm text-gray-500">
            Requisito
          </label>
          <input
            type="text"
            className="border-b-2 border-black text-black rounded text-sm mb-3 w-11/12"
            {...register("requisito")}
          />
        </div>
        <div className="flex justify-center">
          <div>
            <label htmlFor="" className="text-sm text-gray-500">
              Creditos
            </label>
            <input
              type="number"
              className="border-b-2 border-black text-black rounded text-sm mb-3 w-11/12"
              {...register("nro_creditos", { required: true })}
            />
          </div>
          <div>
            <label htmlFor="" className="text-sm text-gray-500">
              Semestre
            </label>
            <input
              type="number"
              className="border-b-2 border-black text-black rounded text-sm mb-3 w-11/12"
              {...register("semestre")}
            />
          </div>
        </div>
        {topic ? (
          <button className="bg-yellow-600 rounded text-white text-xl w-11/12 h-9 mt-3 hover:bg-yellow-400">
            Save
          </button>
        ) : (
          <button className="bg-blue-600 rounded text-white text-xl w-11/12 h-9 mt-3 hover:bg-blue-400">
            Create
          </button>
        )}
        {(errors.nombre ||
          errors.codigo ||
          errors.nro_creditos ||
          errors.categoria) && (
          <p className="text-red-600 text-sm">Ingrese todos los campos</p>
        )}
      </form>
    </div>
  );
}
