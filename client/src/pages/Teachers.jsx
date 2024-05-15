import React, { useTransition } from "react";
import { useEffect, useState } from "react";
import { Title } from "../components/Title";
import { Table } from "../components/Table";
import { getAllTeachers } from "../api/data.api";
import { Button } from "../components/Button";
import { Modal } from "../components/Modal";
import { IoAddCircle } from "react-icons/io5";

export function Teachers() {
  const [open, setOpen] = useState(false);
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    async function loadTeachers() {
      const res = await getAllTeachers();
      setTeachers(res.data.teachers);
    }
    loadTeachers();
  }, []);

  return (
    <div className="ml-8">
      <Title text="Computer Science's Teachers" />

      {/* <Button type='add' /> */}
      <button
        className="w-20 h-8 bg-blue-600 rounded text-black text-xl"
        onClick={() => setOpen(true)}
      >
        Open
      </button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="text-center w-56">
          <form action="">
            <label htmlFor="">Nombre</label>
            <input type="text" />
            <label htmlFor="">Apellido Paterno</label>
            <input type="text" />
            <label htmlFor="">Apellido Materno</label>
            <input type="text" />
            <button className="bg-blue-600 rounded text-black text-xl">
              Save
            </button>
          </form>
        </div>
      </Modal>

      <Table
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
