import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * A standalone Budget management component
 * that also fetches and displays an AI insight.
 */
function Budget() {
  const navigate = useNavigate();

  // States for budget management
  const [budgets, setBudgets] = useState([]);
  const [category, setCategory] = useState("shopping");
  const [amount, setAmount] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSettingBudget, setIsSettingBudget] = useState(false);
  const [deletingBudgetId, setDeletingBudgetId] = useState(null);

  // State for the AI insight
  const [insight, setInsight] = useState(null);

  // On mount, check token and fetch data
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    // Fetch budgets and insight in parallel
    fetchBudgets(token);
    fetchInsight(token);
  }, [navigate]);

  /**
   * Fetch all budgets for the current user
   */
  const fetchBudgets = async (token) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/getBudgets`,
        {
          headers: { Authorization: token },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setBudgets(data);
      } else {
        console.error("Failed to fetch budgets");
      }
    } catch (error) {
      console.error("Error fetching budgets:", error);
    }
  };

  /**
   * Fetch the single user insight
   */
  const fetchInsight = async (token) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/insights`,
        {
          headers: { Authorization: token },
        }
      );
      if (response.ok) {
        const data = await response.json(); // { id, insightText, generatedAt } or null
        setInsight(data);
      } else {
        console.error("Failed to fetch insight");
      }
    } catch (error) {
      console.error("Error fetching insight:", error);
    }
  };

  /**
   * Handle creating/updating a budget
   */
  const handleSetBudget = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const budgetAmount = parseFloat(amount);
    if (budgetAmount <= 0 || isNaN(budgetAmount)) {
      setErrorMessage("Budget must be a positive number.");
      return;
    }

    try {
      setIsSettingBudget(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/setBudget`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({ category, amount: budgetAmount }),
        }
      );
      if (response.ok) {
        // Re-fetch budgets
        fetchBudgets(token);
        // Reset form
        setCategory("shopping");
        setAmount("");
        setErrorMessage("");
      } else {
        console.error("Failed to set budget");
      }
    } catch (error) {
      console.error("Error setting budget:", error);
    } finally {
      setIsSettingBudget(false);
    }
  };

  /**
   * Handle deleting a budget by ID
   */
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this budget?")) return;

    const token = localStorage.getItem("token");
    try {
      setDeletingBudgetId(id);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/deleteBudget/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: token },
        }
      );
      if (response.ok) {
        // Re-fetch budgets
        fetchBudgets(token);
      } else {
        console.error("Failed to delete budget");
      }
    } catch (error) {
      console.error("Error deleting budget:", error);
    } finally {
      setDeletingBudgetId(null);
    }
  };

  /**
   * Color badge helper for budget categories
   */
  function getCategoryBadgeClass(cat) {
    switch (cat.toLowerCase()) {
      case "shopping":
        return "bg-pink-500";
      case "entertainment":
        return "bg-purple-500";
      case "food_and_dining":
        return "bg-red-500";
      case "transportation":
        return "bg-blue-500";
      case "housing":
        return "bg-orange-500";
      case "healthcare":
        return "bg-green-600";
      case "personal_care":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 to-blue-800 p-4">
      <div className="container mx-auto bg-white p-8 rounded-lg shadow-lg">
        {/* ========== SET BUDGET ========== */}
        <h2 className="text-3xl font-bold text-center text-purple-700 underline mb-2">
          Set Budget
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Set budgets by category and get alerts if your expenses exceed them.
        </p>

        <form onSubmit={handleSetBudget} className="space-y-4 max-w-md mx-auto">
          {errorMessage && (
            <div className="text-red-500 text-center mb-4">{errorMessage}</div>
          )}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-purple-600"
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
              placeholder="e.g. 500"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
          <button
            type="submit"
            disabled={isSettingBudget}
            className={`w-full py-2 rounded-lg font-semibold transition duration-200 
              ${
                isSettingBudget
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-purple-700 text-white hover:bg-purple-800"
              }`}
          >
            {isSettingBudget ? "Setting..." : "Set Budget"}
          </button>
        </form>

        {/* ========== CURRENT BUDGETS ========== */}
        <h2 className="text-3xl font-bold text-center text-purple-700 underline mt-10 mb-2">
          Current Budgets
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Manage or remove your set budgets below.
        </p>

        {budgets.length === 0 ? (
          <p className="text-center text-gray-700">
            You have not set any budgets.
          </p>
        ) : (
          <div className="overflow-x-auto mt-4 shadow-md">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-purple-50">
                <tr>
                  <th className="py-3 px-4 text-left font-semibold text-gray-700 border-b">
                    Category
                  </th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-700 border-b">
                    Budget
                  </th>
                  <th className="py-3 px-4 text-center font-semibold text-gray-700 border-b">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {budgets.map((budget, idx) => (
                  <tr
                    key={budget.id}
                    className={`border-b hover:bg-purple-50 transition-colors
                      ${idx % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                  >
                    <td className="py-2 px-4">
                      <span
                        className={`
                          inline-block text-white text-xs font-semibold 
                          px-2 py-1 rounded-full 
                          ${getCategoryBadgeClass(budget.category)}
                        `}
                      >
                        {budget.category.toLowerCase()}
                      </span>
                    </td>
                    <td className="py-2 px-4">{budget.amount}</td>
                    <td className="py-2 px-4 text-center">
                      <button
                        onClick={() => handleDelete(budget.id)}
                        disabled={deletingBudgetId === budget.id}
                        className={`bg-red-500 text-white py-1 px-4 rounded 
                          hover:bg-red-600 transition duration-200
                          ${
                            deletingBudgetId === budget.id
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                      >
                        {deletingBudgetId === budget.id
                          ? "Deleting..."
                          : "Delete"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ========== AI INSIGHT ========== */}
        {insight && insight.insightText && (
          <div className="mt-10 p-6 bg-purple-50 border-l-4 border-purple-600 rounded-md shadow-sm">
            <h2 className="text-2xl font-bold text-purple-700 mb-2">
              AI Insight
            </h2>
            <p className="text-gray-700 whitespace-pre-line">
              {insight.insightText.replace(/\\n/g, "\n")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Budget;
