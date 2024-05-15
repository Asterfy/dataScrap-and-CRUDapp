import React from "react";
import { useEffect, useState } from "react";
import { getAllTopics } from "../api/data.api";
import { Table } from "../components/Table";
import { Title } from "../components/Title";
import {Button} from '../components/Button'

export function Topics() {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    async function loadDocs() {
      const res = await getAllTopics();
      setDocs(res.data.topics);
    }
    loadDocs();
  }, []);

  return (
    <div className="ml-5">
      <Title text="Computer Science's Topics"/>
      <Button type="add" />
      <Table
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
