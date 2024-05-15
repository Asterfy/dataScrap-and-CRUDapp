import React from "react";
import { useEffect, useState } from "react";
import { getAllDocuments } from "../api/documents.api";
import {Table} from '../components/Table'

export function Topics() {
    const [docs, setDocs] = useState([]);

    useEffect(() => {
        async function loadDocs(){
            const res = await getAllDocuments();
            console.log(res.data.posts)
            setDocs(res.data.posts)
        }
        loadDocs()
    }, [])

    return (
    <div>
      <h2>Computer Science's Topics</h2>
      <Table headers={["Title", "Body"]} data={docs.map(doc => [doc.Title, doc.Body])} />

    </div>
  );
}
