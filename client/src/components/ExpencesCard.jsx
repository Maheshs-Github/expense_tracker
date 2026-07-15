import React from "react";
import { CATEGORIES } from "../constants/categories";

const ExpencesCard = ({ expenses,handleDelete }) => {
  const category = CATEGORIES.find(
    (cateData) => cateData.label == expenses.category,
  );
  return (
    <div className="w-full shadow-md p-5 hover:shadow-lg rounded-lg flex flex-col gap-4">
      <div className="flex justify-between items-center gap-4">
        <h2 className="font-semibold text-lg flex gap-1 items-center border border-primary rounded-full p-2">
          <category.icon size={22} />
          <p>{expenses.category}</p>
        </h2>
        <div className="text-lg text-primary font-bold">{expenses.amount}</div>
      </div>
      <div className="text-sm font-serif  ">{expenses.description}</div>
      <div className="flex justify-between">
        <div className="text-sm text-gray-600 font-semibold">
          {expenses.date}
        </div>
        <button className="w-fit rounded-lg border border-primary px-2 text-center py-2 font-semibold text-primary hover:bg-primary hover:border-secondary hover:text-white hover:scale-105 "
        onClick={()=>handleDelete(expenses._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ExpencesCard;
