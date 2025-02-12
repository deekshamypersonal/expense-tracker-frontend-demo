import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import { DataContext } from "./DataContext";
import { setExpense, uploadBill } from "./api";

function Dashboard() {
  const {
    total,
    groupedExpenses,
    fetchTotal,
    budgets,
    fetchExpenses,
    fetchGroupedExpenses,
    expenses,
  } = useContext(DataContext);

  // Fields for Add Expense
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("shopping");
  const [amount, setAmount] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // For Upload Bill
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadError, setUploadError] = useState("");
  const [loading, setLoading] = useState(false);

  // "Add Expense" loading
  const [isAddingExpense, setIsAddingExpense] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  // ============= ADD EXPENSE MANUALLY =============
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (expenses.length >= 10) {
      setErrorMessage(
        "Demo user can only add 10 expenses. Please delete one from View Expense tab."
      );
      return;
    }

    if (description.length > 30) {
      setErrorMessage("Description must be 30 characters or less.");
      return;
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setErrorMessage("Please enter a positive amount.");
      return;
    }

    const expenseRequest = { description, category, amount: parsedAmount };

    try {
      setIsAddingExpense(true);

      await setExpense(expenseRequest, token);
      await fetchTotal(token);
      await fetchExpenses(token);
      await fetchGroupedExpenses(token);

      // Check if user exceeded budget
      const currentExpensesForCategory = groupedExpenses[category] || 0;
      const budgetForCategory = budgets.find(
        (b) => b.category === category
      )?.amount;

      if (
        budgetForCategory &&
        currentExpensesForCategory + parsedAmount > budgetForCategory
      ) {
        alert(`Warning: You have exceeded your budget for ${category}!`);
      }

      setDescription("");
      setCategory("shopping");
      setAmount("");
      setErrorMessage("");
    } catch (error) {
      console.error("Failed to set expense:", error);
      setErrorMessage("Failed to set expense. Please try again.");
    } finally {
      setIsAddingExpense(false);
    }
  };

  // ============= UPLOAD BILL =============
  const handleFileSelect = (e) => {
    setUploadError("");
    setSelectedFile(e.target.files[0] || null);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadError("Please choose a PNG or JPEG file first.");
      return;
    }
    if (expenses.length >= 10) {
      setUploadError(
        "Demo user can only have 10 expenses total. Please delete an existing one."
      );
      return;
    }
    const validTypes = ["image/png", "image/jpeg"];
    if (!validTypes.includes(selectedFile.type)) {
      setUploadError("Please select a PNG or JPEG image only.");
      return;
    }
    const token = localStorage.getItem("token");
    if (!token) {
      setUploadError("You are not logged in.");
      return;
    }

    try {
      setLoading(true);
      const result = await uploadBill(selectedFile, token);
      setLoading(false);

      if (!result.success) {
        setUploadError(result.message || "Failed to parse bill.");
      } else {
        if (result.expenseRequest) {
          setDescription(result.expenseRequest.description || "");
          setCategory(result.expenseRequest.category || "shopping");
          setAmount(
            result.expenseRequest.amount
              ? String(result.expenseRequest.amount)
              : ""
          );
        }
        setUploadError("");
      }
    } catch (error) {
      console.error("Error uploading the file:", error);
      setLoading(false);
      setUploadError("Failed to upload file. Please try again.");
    }
  };

  // ============= CHART DATA =============
  const pieData = {
    labels: Object.keys(groupedExpenses),
    datasets: [
      {
        data: Object.values(groupedExpenses),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#FFCD56",
          "#4CAF50",
          "#F44336",
          "#E91E63",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#FFCD56",
          "#4CAF50",
          "#F44336",
          "#E91E63",
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 to-blue-800 p-4">
      <div className="container mx-auto">
        {/* Row with 2 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Add Expense Card */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center text-purple-700 mb-4">
              Add Expense
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="text-red-500 text-center">{errorMessage}</div>
              )}

              <div>
                <label className="block mb-1 font-semibold text-gray-700">
                  Description
                </label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Short expense note"
                  required
                  className="w-full px-4 py-2 border border-gray-300 
                             rounded-lg focus:outline-none focus:ring-2 
                             focus:ring-purple-600"
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold text-gray-700">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="block w-full px-4 py-2 border border-gray-300 
                             rounded-lg focus:outline-none focus:ring-2 
                             focus:ring-purple-600"
                >
                  <option value="food_and_dining">Food and Dining</option>
                  <option value="transportation">Transportation</option>
                  <option value="housing">Housing</option>
                  <option value="entertainment">Entertainment</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="personal_care">Personal Care</option>
                  <option value="shopping">Shopping</option>
                  <option value="travel">Travel</option>
                  <option value="education">Education</option>
                  <option value="miscellaneous">Miscellaneous</option>
                </select>
              </div>

              <div>
                <label className="block mb-1 font-semibold text-gray-700">
                  Amount
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="e.g. 100"
                  required
                  className="w-full px-4 py-2 border border-gray-300 
                             rounded-lg focus:outline-none focus:ring-2 
                             focus:ring-purple-600"
                />
              </div>

              {isAddingExpense && (
                <div className="text-center text-purple-700 font-semibold">
                  Adding expense, please wait...
                </div>
              )}

              <button
                type="submit"
                disabled={isAddingExpense}
                className={`w-full py-2 rounded-lg font-semibold transition duration-200
                  ${
                    isAddingExpense
                      ? "bg-gray-400 text-white"
                      : "bg-purple-700 text-white hover:bg-purple-800"
                  }`}
              >
                {isAddingExpense ? "Processing..." : "Add Expense"}
              </button>
            </form>
          </div>

          {/* Upload Bill Card */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center text-purple-700 mb-4">
              Upload Bill (PNG/JPEG)
            </h2>
            <p className="text-sm text-center text-gray-600 mb-4">
              Automatically parse fields from your receipt
            </p>

            {uploadError && (
              <div className="text-red-500 text-center mb-4">{uploadError}</div>
            )}

            <div className="space-y-4">
              <label className="block font-semibold text-gray-700">
                Choose File:
              </label>
              <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleFileSelect}
                className="w-full px-4 py-2 border border-gray-300 
                           rounded-lg focus:outline-none focus:ring-2 
                           focus:ring-purple-600"
              />

              {loading && (
                <div className="text-center text-purple-600 font-semibold">
                  Scanning your bill, please wait...
                </div>
              )}

              <button
                onClick={handleUpload}
                disabled={loading}
                className="w-full bg-purple-700 text-white py-2 rounded-lg
                           hover:bg-purple-800 transition duration-200
                           disabled:bg-gray-400"
              >
                {loading ? "Uploading..." : "Upload"}
              </button>
            </div>
          </div>
        </div>

        {/* Monthly Expense Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg mt-8">
          <h2 className="text-2xl font-bold text-purple-700 mb-4">
            Your Monthly Expense
          </h2>
          <div className="text-xl mb-4 text-gray-800">
            Total Spent: <span className="font-semibold">{total}</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:justify-between gap-6">
            {/* Pie chart */}
            <div
              className="lg:w-1/2 p-4 border border-gray-200 
                            rounded-lg shadow-sm bg-gray-50"
            >
              <Pie data={pieData} />
            </div>

            {/* Expense by Category */}
            <div
              className="lg:w-1/2 p-4 border border-gray-200 
                            rounded-lg shadow-sm bg-gray-50"
            >
              <h3 className="text-xl font-bold text-purple-700 mb-3 underline">
                Expense by Category:
              </h3>

              {Object.keys(groupedExpenses).length === 0 ? (
                <p className="text-gray-500">No expenses yet.</p>
              ) : (
                <ul className="space-y-2">
                  {Object.entries(groupedExpenses).map(([cat, amt]) => (
                    <li key={cat} className="flex justify-between items-center">
                      {/* Single color (purple) for all categories */}
                      <span className="text-sm font-medium text-purple-600">
                        {cat.toLowerCase()}
                      </span>
                      <span className="text-sm">{amt}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
