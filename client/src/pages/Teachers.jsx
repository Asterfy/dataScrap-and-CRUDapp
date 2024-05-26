import React, { useTransition } from "react";
import { useEffect, useState } from "react";
import { Title } from "../components/Title";
import { Table } from "../components/Table";
import { getAllTeachers, getTeacher, deleteTeacher } from "../api/data.api";
import { Modal } from "../components/Modal";
import { IoAddCircle } from "react-icons/io5";
import { FormTeacher } from "../components/FormTeacher";
import toast, { Toaster } from "react-hot-toast";

export function Teachers() {
  const [open, setOpen] = useState(false);
  const [teachers, setTeachers] = useState([]);

  const [teacher, setTeacher] = useState({});

  const getTeacherToModificate = (data) => {
    setOpen(true);
    async function loadTeacher() {
      const res = await getTeacher(data);
      setTeacher(res.data.teacher);
    }
    loadTeacher();
  };

  async function loadTeachers() {
    const res = await getAllTeachers();
    setTeachers(res.data.teachers);
  }

  useEffect(() => {
    loadTeachers();
  }, []);

  const openDialongCreate = () => {
    setTeacher(null);
    setOpen(true);
  };

  const getTeacherIdToDelete = (data) => {
    const trashTeacher = async (id_teacher) => {
      const res = await deleteTeacher(id_teacher);
      if (res.status === 200) {
        loadTeachers();
        toast.success("Teacher deleted", {
          duration: 2000,
          position: "top-right",
        });
      }
    };
    const confirmDelete = window.confirm("¿Borrar Docente?");
    if(confirmDelete){
      trashTeacher(data)
    }
  };

  return (
    <div className="pl-8">
      <Title text="Computer Science's Teachers" />
      <button
        onClick={openDialongCreate}
        className="h-8 w-24 border-2 border-black flex justify-center items-center mx-2 bg-blue-400 my-1 rounded hover:bg-blue-200"
      >
        <IoAddCircle className="text-xl text-black" />{" "}
        <span className="ml-1 text-xl">Create</span>
      </button>
      <Toaster />
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="w-56">
          <FormTeacher
            teacher={teacher}
            closeModal={() => setOpen(false)}
            loadTable={loadTeachers}
          />
        </div>
      </Modal>

      <Table
        sendDataToParentToEdit={getTeacherToModificate}
        sendDataToParentToDelete={getTeacherIdToDelete}
        headers={["Id", "Apellido Paterno", "Apellido Materno", "Nombre"]}
        data={teachers.map((teacher) => [
          teacher.ID,
          teacher.Apellido_paterno,
          teacher.Apellido_materno,
          teacher.Nombre,
        ])}
      />
    </div>
  );
}
