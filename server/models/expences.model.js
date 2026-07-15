import mongoose from "mongoose";

const expensesSchema = new mongoose.Schema({
  amount: {
    required: true,
    type: Number,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
},{timestamps:true});

export const  Expense=new mongoose.model("expense",expensesSchema);
