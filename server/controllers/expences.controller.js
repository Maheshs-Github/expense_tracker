import { Expense } from "../models/expences.model.js";

const getExpences = async (req, res) => {
  try {
    const { sortBy = "recent", page = 1, limit = 2 } = req.query;
    // console.log("sortBy: ",sortBy)
    const currentPage = Number(page);
    const pageLimit = Number(limit);
    const skip = (currentPage - 1) * pageLimit;
    // console.log("currentPage: ", currentPage);
    let sortStage = {};
    if (sortBy === "recent") sortStage = { createdAt: -1 };
    else sortStage = { createdAt: 1 };
    // const expencesData = await Expense.find();
    const expencesData = await Expense.aggregate([
      { $sort: sortStage },
      { $skip: skip },
      { $limit: pageLimit },
    ]);
    const totalExpRecords = await Expense.find().countDocuments();

    const total = await Expense.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);
    // console.log("total: ",total);
    return res.status(200).json({
      error: false,
      success: true,
      data: {
        expencesData,
        totalAmount: total[0]?.totalAmount || 0,
        pagination: {
          totalExpRecords,
          totalPages: pageLimit > 0 ? Math.ceil(totalExpRecords / pageLimit) : 0,
          currentPage,
          pageLimit,
        },
      },
      message: "Expences has been fetched successfully",
    });
  } catch (error) {
    console.log("error: ", error);
    return res.status(500).json({
      error: true,
      success: false,
      message: "Could not able to fetch expenses",
    });
  }
};

const postExpence = async (req, res) => {
  try {
    const { amount, category, date, description } = req.body;
    console.log("req.body: ", req.body);
    if (
      [category, date, description].some(
        (field) => !field || field.trim() === "",
      )
    )
      return res.status(400).json({
        error: true,
        success: false,
        message: "All fields are required",
      });

    if (Number(amount) <= 0) {
      return res.status(400).json({
        error: true,
        success: false,
        message: "amount must be greaterr than 0",
      });
    }

    const addedExpence = await Expense.create({
      amount,
      date,
      category,
      description,
    });
    console.log("Added Expence: ", addedExpence);
    return res.status(200).json({
      success: true,
      error: false,
      message: "Expence has been Added Successfully",
      data: addedExpence,
    });
  } catch (error) {
    console.log("error: ", error);
    return res
      .status(500)
      .json({ error: true, success: false, message: "Failed to Add Expences" });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const {expenseId} = req.params;
    // console.log("expenseId: ",expenseId);
    if (!expenseId)
      return status(400).json({
        error: true,
        success: false,
        message: "Expense id is not found",
      });

    const deletedExpense = await Expense.findByIdAndDelete(expenseId);

    if (!deletedExpense)
      return res.status(404).json({
        error: true,
        success: false,
        message: "Could not able to delete",
      });

    return res.status(200).json({
      error: false,
      success: true,
      message: "Expence is deleted successfully",
    });
  } catch (error) {
    console.log("error: ", error);
    return res.status(500).json({
      error: true,
      success: false,
      message: "Some Error while deleting ",
    });
  }
};

export { getExpences, postExpence, deleteExpense };
