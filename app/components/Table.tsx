import React from "react";

const Table = ({ columns, data, handleEdit, handleDelete }: any) => {
  return (
    <table className="border table-auto w-full text-sm mt-10">
      <thead className="bg-gray-100">
        <tr>
          {columns.map(({ title, dataIndex }: any, ind: number) => (
            <th
              className="border-b font-medium p-4 text-slate-400 text-left"
              key={`${dataIndex}-${ind}`}
            >
              {title}
            </th>
          ))}
          <th className="border-b font-medium p-4 text-slate-400 text-left">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white">
        {data?.map((obj: any, ind: number) => (
          <tr key={`row-${ind}`}>
            {columns?.map((colObj: any, colInd: number) => (
              <td
                className="border-b border-slate-100 p-4 text-slate-500"
                key={`col-${ind}-${colInd}`}
              >
                {colObj?.render
                  ? colObj?.render(obj?.[colObj?.dataIndex], obj, ind)
                  : obj?.[colObj?.dataIndex]}
              </td>
            ))}
            <td className="border-b border-slate-100 p-4 text-slate-500 flex w=full justify-between items-center">
              <button
                onClick={() => handleEdit(obj)}
                disabled={!obj?.modifiable}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(obj?._id)}
                disabled={!obj?.modifiable}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
