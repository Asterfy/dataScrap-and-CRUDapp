import {Button} from '../components/Button'

export function Table({ headers, data }) {
  return (
    <div className="text-center mt-7 overflow-y-auto max-h-[600px] ml-3">
      <table className="table-fixed border-collapse border-2 border-slate-500 text-sm text-white">
        <thead className="sticky top-0">
          <tr>
            {headers.map((header, index) => (
              <th className=" bg-slate-500 p-1" key={index}>
                {header}
              </th>
            ))}
            <th className="bg-slate-500 p-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {row.map((cell, index) => (
                <td
                  className="border-2 border-slate-700 bg-slate-600 p-1"
                  key={index}
                >
                  {cell}
                </td>
              ))}
              <td className="border-2 border-slate-700 bg-slate-600">
                <div className="flex justify-center">
                  <Button type="edit" idDoc={row[0]}/>
                  <Button type="delete" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
