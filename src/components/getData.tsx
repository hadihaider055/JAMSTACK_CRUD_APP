import React from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { GetDataProps } from "./types";

const FetchData: React.FC<GetDataProps> = ({
  data,
  handleDelete,
  handleEdit,
}) => {
  if (data.data.length === 0) return <h2>No data Found!</h2>;
  return (
    <div>
      {data.data.map((item) => (
        <div
          key={item.ts}
          className="w-80 bg-indigo-100 my-3 p-2 flex items-center justify-between rounded-sm shadow-md"
        >
          <div className="w-60">
            <h1 className="text-xl font-semibold">{item.data.title}</h1>
            <p>{item.data.description}</p>
          </div>
          <div>
            <button className="border-0 mx-1">
              <AiOutlineDelete
                className="text-xl text-red-500"
                onClick={() => handleDelete(item.ref["@ref"].id)}
              />
            </button>
            <button className="border-0 mx-1">
              <AiOutlineEdit
                className="text-xl text-green-500"
                onClick={() => handleEdit(item)}
              />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FetchData;
