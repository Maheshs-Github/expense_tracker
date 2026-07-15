// Form componnet which adds Expences
import React, { useEffect, useState } from "react";
import { CATEGORIES } from "../constants/categories";
import BASE_URL from "../constants/BASE_URL";
import axios from "axios";
import toast from "react-hot-toast";
import ExpencesCard from "./ExpencesCard";
import CardsSkeleton from "./CardsSkeleton";
import { IndianRupee, MoveLeft, MoveRight } from "lucide-react";

const AddExpence = () => {
  const [expenceData, setExpenceData] = useState({
    amount: "",
    description: "",
    category: "",
    date: "",
  });
  const [loading, setLoading] = useState(false);
  const [getLoading, setGetLoading] = useState(false);
  const [sortBy, setSortBy] = useState("recent");
  const [expenses, setExpences] = useState([]);
  const [pagination, setPagination] = useState({});
  const [totalSpent, setTotalSpent] = useState(0);

  const LIMIT = 3;
  const [curPage, setCurPage] = useState(1);
  const handleExpenceChnage = (e) => {
    setExpenceData((expData) => ({
      ...expData,
      [e.target.name]: e.target.value,
    }));
  };
  // useEffect(() => console.log("expenceData: ", expenceData), [expenceData]);

  const handleAddExpense = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();
      // console.log("expenceData: ", expenceData);
      const addRes = await axios.post(`${BASE_URL}expences`, {
        ...expenceData,
        amount: Number(expenceData.amount),
      });
      // console.log("res: ", addRes);
      toast.success(addRes?.data?.message || "Successfully Added the Expence");
      setExpenceData({
        amount: "",
        description: "",
        category: "",
        date: "",
      });
      handleGetExpence();
    } catch (error) {
      console.log("error: ", error);
      toast.error(error.message || "Failed to Add Expence");
    } finally {
      setLoading(false);
    }
  };

  const handleGetExpence = async () => {
    try {
      setGetLoading(true);
      const getExpences = await axios.get(
        `${BASE_URL}expences?sortBy=${sortBy}&page=${curPage}&limit=${LIMIT}`,
      );
      setExpences(getExpences?.data?.data?.expencesData || []);
      setPagination(getExpences?.data?.data?.pagination || {});
      setTotalSpent(getExpences?.data?.data?.totalAmount || 0);
      // setExpences([]);
      // console.log("getExpences: ", getExpences);
      toast.success(
        getExpences?.data?.message || "Expenses fetched successfully",
      );
    } catch (error) {
      console.log("error: ", error);
      toast.error(error?.message || "Error while fetching the Expences");
    } finally {
      setGetLoading(false);
    }
  };

  const handleDelete = async (id) => {
    // console.log("id: ",id)
    try {
      const deleExp = await axios.delete(`${BASE_URL}expences/${id}`);
      console.log("deleExp: ", deleExp);
      toast.success(
        deleExp?.data?.message || "Expense has been Deletd successfully",
      );
      handleGetExpence();
    } catch (error) {
      console.log("error: ", error);
      toast.error(error.message || "Failed to Add Expence");
    }
  };

  const paginationData = useEffect(() => {
    handleGetExpence();
  }, [sortBy, curPage]);
  // useEffect(() => console.log("expenses: ", expenses), [expenses]);

  return (
    <div className="flex flex-col gap-10 w-full">
      <form
        className="w-full flex flex-col gap-4 justify-center items-center"
        onSubmit={handleAddExpense}
      >
        <div className="   w-full items-center grid grid-cols-1 sm:grid-cols-5">
          <label htmlFor="amount" className="font-semibold text-lg col-span-1">
            Amount:{" "}
          </label>
          <input
            type="number"
            name="amount"
            placeholder="Enter Amount eg. ₹1,200"
            value={expenceData.amount}
            onChange={handleExpenceChnage}
            className=" w-full rounded-lg border border-primary px-4 py-2.5 text-gray-900 focus:border-2 focus:border-primary focus:outline-none sm:col-span-4"
          />
        </div>
        <div className="  gap-2 w-full grid grid-cols-1 sm:grid-cols-5">
          <label
            htmlFor="description"
            className="font-semibold text-lg col-span-1"
          >
            Description:{" "}
          </label>
          <textarea
            name="description"
            id=""
            rows="6"
            placeholder="Enter Expense Description"
            value={expenceData.description}
            onChange={handleExpenceChnage}
            className=" w-full rounded-lg border border-primary resize-none px-4 py-2.5 text-gray-900 focus:border-2 focus:border-primary focus:outline-none sm:col-span-4"
          ></textarea>
        </div>
        <div className="  gap-2 w-full items-center grid grid-cols-1 sm:grid-cols-5">
          <label
            htmlFor="category"
            className="font-semibold text-lg col-span-1"
          >
            Category:{" "}
          </label>
          <select
            name="category"
            value={expenceData.category}
            required
            onChange={handleExpenceChnage}
            className=" w-full rounded-lg border border-primary px-4 py-2.5 text-gray-900 focus:border-2 focus:border-primary focus:outline-none sm:col-span-4"
          >
            <option value="">Select Category</option>
            {CATEGORIES.map((cate) => (
              <option key={cate.label} value={cate.label}>
                {cate.label}
              </option>
            ))}
          </select>
        </div>
        <div className="  gap-2 w-full items-center grid  grid-cols-1 sm:grid-cols-5">
          <label htmlFor="date" className="font-semibold text-lg col-span-1">
            Date:{" "}
          </label>
          <input
            type="date"
            name="date"
            required
            value={expenceData.date}
            onChange={handleExpenceChnage}
            className=" w-full rounded-lg border border-primary px-4 py-2.5 text-gray-900 focus:border-2 focus:border-primary focus:outline-none sm:col-span-4"
          />
        </div>
        <button
          className=" w-full sm:w-fit rounded-lg border hover:border-primary hover:bg-white px-10 text-center py-3 mt-4 font-semibold hover:text-primary bg-primary border-secondary text-white hover:scale-105 col-span-4 "
          disabled={loading}
        >
          {loading ? "Loading..." : "Add Expence"}
        </button>
      </form>
      {expenses.length === 0 ? (
        <div className="flex justify-center items-center w-full">
          <h2>No Expences Added Yet, Add one to Track your Expenses...</h2>
        </div>
      ) : getLoading ? (
        Array.from({ length: LIMIT }).map((_, index) => (
          <CardsSkeleton key={index} />
        ))
      ) : (
        <div>
          <div className="flex justify-end w-full mb-6">
            <select
              name="sortBy"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="  rounded-lg border border-primary px-4 py-2.5 text-gray-900 focus:border-2 focus:border-primary focus:outline-none col-span-4"
            >
              <option value="recent">Recent</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
          {(expenses || []).map((data) => (
            <ExpencesCard
              key={data._id}
              expenses={data}
              handleDelete={handleDelete}
            />
          ))}
          <div className="flex justify-end gap-2 mt-6 items-center">
            <button
              className="rounded-lg border border-primary px-2.5 py-2.5 text-primary   focus:outline-none hover:scale-105 hover:bg-primary hover:text-white
              disabled:cursor-not-allowed disabled:bg-secondary
              "
              onClick={() => setCurPage((cur) => cur - 1)}
              disabled={curPage <= 1}
            >
              <MoveLeft className=" size-6 " />
            </button>
            <p className="text-xl text-primary font-semibold">{curPage}</p>
            <button
              className="rounded-lg border border-primary px-2.5 py-2.5 text-primary   focus:outline-none hover:scale-105 hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:bg-secondary"
              onClick={() => setCurPage((cur) => cur + 1)}
              disabled={curPage >= pagination.totalPages}
            >
              {/* {console.log("curPage: ",curPage)}
              {console.log("pagination.totalPages: ",pagination.totalPages)} */}
              <MoveRight className=" size-6 " />
            </button>
          </div>
        </div>
      )}

      {/* Total Expenses section */}
      <div className="bg-blue-400 text-white rounded-lg p-4 flex flex-col gap-4">
        <div className="flex justify-between text-3xl font-semibold">
          <h3>Total Expences</h3>
          <p className="flex gap-2 items-center">
            <IndianRupee />
            {Number(totalSpent).toLocaleString("en-IN") || 0}
          </p>
        </div>
        <span className="rounded-full w-fit text-primary font-semibold bg-white px-3 py-1 text-sm">
          {pagination.totalExpRecords} Records
        </span>
      </div>
    </div>
  );
};

export default AddExpence;
