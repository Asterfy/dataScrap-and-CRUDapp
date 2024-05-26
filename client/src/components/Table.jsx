import { Button } from "../components/Button";

export function Table({
  headers,
  data,
  sendDataToParentToEdit,
  sendDataToParentToDelete,
}) {
  const handleDataFromGrandchild = (data) => {
    sendDataToParentToEdit(data);
  };
  const handleDataFromGrandchildDelete = (data) => {
    sendDataToParentToDelete(data);
  };
  return (
    <div className="text-center mt-7 overflow-y-auto pl-3 max-h-[560px] pb-8">
        <table className="table-fixed border-separate w-10/12 border-2 border-white text-lg text-white">
          <thead className="sticky top-0">
            <tr>
              {headers.map((header, index) => (
                <th className="p-1 text-[#71717A] border-2 bg-white border-white" key={index}>
                  {header}
                </th>
              ))}
              <th className="p-1 bg-white text-[#71717A]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                {row.map((cell, index) => (
                  <td
                    className="border-2 border-white p-1"
                    key={index}
                  >
                    {cell}
                  </td>
                ))}
                <td className="border-2 border-white">
                  <div className="flex justify-center">
                    <Button
                      type="edit"
                      idDoc={row[0]}
                      sendDataToParentToEdit={handleDataFromGrandchild}
                    />
                    <Button
                      type="delete"
                      idDoc={row[0]}
                      sendDataToParentToDelete={handleDataFromGrandchildDelete}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  );
}
