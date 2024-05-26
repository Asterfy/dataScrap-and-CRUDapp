import React from "react";
import { useEffect, useState } from "react";
import { getAllTopics, getTopic, deleteTopic } from "../api/data.api";
import { Table } from "../components/Table";
import { Title } from "../components/Title";
import { Modal } from "../components/Modal";
import { IoAddCircle } from "react-icons/io5";
import { FormTopic } from "../components/FormTopic";
import toast, { Toaster } from "react-hot-toast";

export function Topics() {
  const [docs, setDocs] = useState([]);
  const [open, setOpen] = useState(false);
  const [topic, setTopic] = useState({});

  const getTopicIdToModificate = (data) => {
    async function getDataTopic(data) {
      const res = await getTopic(data);
      setTopic(res.data.topic);
    }
    getDataTopic(data);
    setOpen(true);
  };

  async function loadTopics() {
    const res = await getAllTopics();
    setDocs(res.data.topics);
  }
  useEffect(() => {
    loadTopics();
  }, []);

  const openDialongCreate = () => {
    setTopic(null);
    setOpen(true);
  };

  const getTopicIdToDelete = (data) => {
    const trashTopic = async (id_topic) => {
      const res = await deleteTopic(id_topic);
      if (res.status === 200) {
        loadTopics();
        toast.success("Asignatura eliminada", {
          duration: 2000,
          position: "top-right",
        });
      }
    };
    const confirmDelete = window.confirm("¿Elimimar asignatura?");
    if (confirmDelete) {
      trashTopic(data);
    }
  };

  return (
    <div className="pl-8">
      <Toaster />
      <Title text="Computer Science's Topics" />
      <button
        onClick={openDialongCreate}
        className="h-8 w-24 border-2 border-black flex justify-center items-center mx-2 bg-blue-400 my-1 rounded hover:bg-blue-200"
      >
        <IoAddCircle className="text-xl text-black" />{" "}
        <span className="ml-1 text-xl">Create</span>
      </button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="w-80">
          <FormTopic
            topic={topic}
            closeModal={() => setOpen(false)}
            loadTable={loadTopics}
          />
        </div>
      </Modal>
      <Table
        sendDataToParentToEdit={getTopicIdToModificate}
        sendDataToParentToDelete={getTopicIdToDelete}
        headers={[
          "Id",
          "Codigo",
          "Nombre",
          "Créditos",
          "Categoría",
          "Requisito",
          "Semestre",
        ]}
        data={docs.map((doc) => [
          doc.ID,
          doc.Codigo,
          doc.Nombre,
          doc.Nro_creditos,
          doc.Categoria,
          doc.Requisito,
          doc.Semestre,
        ])}
      />
    </div>
  );
}
