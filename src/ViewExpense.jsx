// import React, { useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { DataContext } from "./DataContext";

// function ViewExpense() {
//   const { fetchTotal, fetchGroupedExpenses, expenses, fetchExpenses } =
//     useContext(DataContext);

//   const [sortedExpenses, setSortedExpenses] = useState([]);
//   const [sortConfig, setSortConfig] = useState({
//     key: "date",
//     direction: "asc",
//   });

//   // NEW: Track which ID is currently deleting
//   const [deletingId, setDeletingId] = useState(null);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       navigate("/login");
//       return;
//     }

//     // Initial sorting
//     setSortedExpenses(
//       [...expenses].sort((a, b) => new Date(a.date) - new Date(b.date))
//     );
//   }, [navigate, fetchExpenses, expenses]);

//   // If expenses changes later, keep sortedExpenses in sync:
//   useEffect(() => {
//     setSortedExpenses([...expenses]);
//   }, [expenses]);

//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this expense?"
//     );
//     if (!confirmDelete) {
//       return;
//     }

//     const token = localStorage.getItem("token");
//     try {
//       // Indicate we are deleting this particular ID
//       setDeletingId(id);

//       const response = await fetch(
//         `${import.meta.env.VITE_API_URL}/deleteExpense/${id}`,
//         {
//           method: "DELETE",
//           headers: {
//             Authorization: token,
//           },
//         }
//       );
//       if (response.ok) {
//         fetchTotal(token);
//         fetchGroupedExpenses(token);
//         fetchExpenses(token);
//       } else {
//         console.error("Failed to delete expense");
//         localStorage.removeItem("token");
//         navigate("/login");
//       }
//     } catch (error) {
//       console.error("There was an error!", error);
//       localStorage.removeItem("token");
//       navigate("/login");
//     } finally {
//       // Stop the deleting state regardless of success/failure
//       setDeletingId(null);
//     }
//   };

//   const handleSort = (key) => {
//     let direction = "asc";
//     if (sortConfig.key === key && sortConfig.direction === "asc") {
//       direction = "desc";
//     }
//     setSortConfig({ key, direction });

//     const sorted = [...expenses].sort((a, b) => {
//       if (key === "date") {
//         return direction === "asc"
//           ? new Date(a.date) - new Date(b.date)
//           : new Date(b.date) - new Date(a.date);
//       } else if (key === "amount") {
//         return direction === "asc" ? a.amount - b.amount : b.amount - a.amount;
//       } else {
//         return 0;
//       }
//     });

//     setSortedExpenses(sorted);
//   };

//   const handleSortChange = (event) => {
//     handleSort(event.target.value);
//   };

//   const toggleSortDirection = () => {
//     const newDirection = sortConfig.direction === "asc" ? "desc" : "asc";
//     setSortConfig((prevConfig) => ({
//       ...prevConfig,
//       direction: newDirection,
//     }));

//     const sorted = [...sortedExpenses].sort((a, b) => {
//       if (sortConfig.key === "date") {
//         return newDirection === "asc"
//           ? new Date(a.date) - new Date(b.date)
//           : new Date(b.date) - new Date(a.date);
//       } else if (sortConfig.key === "amount") {
//         return newDirection === "asc"
//           ? a.amount - b.amount
//           : b.amount - a.amount;
//       } else {
//         return 0;
//       }
//     });

//     setSortedExpenses(sorted);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-purple-600 to-blue-800 p-4">
//       <div className="container mx-auto bg-white p-8 rounded-lg shadow-lg">
//         <div className="flex flex-col gap-4 justify-between items-center mb-6 ">
//           <h2 className="text-2xl font-bold text-center text-purple-700 underline">
//             View Expenses
//           </h2>
//           <div className="flex items-center">
//             <label htmlFor="sort" className="mr-2 text-purple-700 font-bold">
//               Sort by:
//             </label>
//             <select
//               id="sort"
//               onChange={handleSortChange}
//               className="px-1 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
//             >
//               <option value="date">Date</option>
//               <option value="amount">Amount</option>
//             </select>
//             <button
//               onClick={toggleSortDirection}
//               className="ml-4 px-1 py-1 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition duration-200"
//             >
//               {sortConfig.direction === "asc" ? "ASC" : "DESC"}
//             </button>
//           </div>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white">
//             <thead className="bg-gray-200">
//               <tr>
//                 <th className="py-2 px-4 text-left">Description</th>
//                 <th className="py-2 px-4 text-left">Date</th>
//                 <th className="py-2 px-4 text-left">Category</th>
//                 <th className="py-2 px-4 text-left">Amount</th>
//                 <th className="py-2 px-4 text-center">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {sortedExpenses.map((expense) => (
//                 <tr key={expense.id} className="border-t">
//                   <td className="py-2 px-4 wrap-after-20">
//                     {expense.description}
//                   </td>
//                   <td className="py-2 px-4">{expense.date}</td>
//                   <td className="py-2 px-4">{expense.category}</td>
//                   <td className="py-2 px-4">{expense.amount}</td>
//                   <td className="py-2 px-4 text-center">
//                     <button
//                       onClick={() => handleDelete(expense.id)}
//                       disabled={deletingId === expense.id} // disable if it's currently deleting
//                       className={`bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition duration-200
//                         ${
//                           deletingId === expense.id
//                             ? "opacity-50 cursor-not-allowed"
//                             : ""
//                         }
//                       `}
//                     >
//                       {deletingId === expense.id ? "Deleting..." : "Delete"}
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ViewExpense;

//--------------------------------------

import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "./DataContext";

function ViewExpense() {
  const { fetchTotal, fetchGroupedExpenses, expenses, fetchExpenses } =
    useContext(DataContext);

  const [sortedExpenses, setSortedExpenses] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: "amount", // <-- default to "amount"
    direction: "asc", // <-- default to ascending
  });

  // Track which ID is currently deleting
  const [deletingId, setDeletingId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // Initial sorting by amount ASC
    setSortedExpenses([...expenses].sort((a, b) => a.amount - b.amount));
  }, [navigate, fetchExpenses, expenses]);

  // Keep sortedExpenses in sync if 'expenses' changes:
  useEffect(() => {
    setSortedExpenses([...expenses]);
  }, [expenses]);

  // Helper to map categories to color classes
  function getCategoryBadgeClass(cat) {
    switch (cat.toLowerCase()) {
      case "food_and_dining":
        return "bg-red-500";
      case "transportation":
        return "bg-blue-500";
      case "housing":
        return "bg-orange-500";
      case "entertainment":
        return "bg-purple-500";
      case "healthcare":
      case "personal_care":
        return "bg-green-500";
      case "shopping":
        return "bg-pink-500";
      case "travel":
        return "bg-indigo-500";
      case "education":
        return "bg-yellow-500";
      case "miscellaneous":
        return "bg-gray-500";
      default:
        return "bg-gray-400"; // fallback
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this expense?"))
      return;

    const token = localStorage.getItem("token");
    try {
      setDeletingId(id);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/deleteExpense/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: token,
          },
        }
      );
      if (response.ok) {
        // Refresh data
        fetchTotal(token);
        fetchGroupedExpenses(token);
        fetchExpenses(token);
      } else {
        console.error("Failed to delete expense");
        localStorage.removeItem("token");
        navigate("/login");
      }
    } catch (error) {
      console.error("There was an error!", error);
      localStorage.removeItem("token");
      navigate("/login");
    } finally {
      setDeletingId(null);
    }
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sorted = [...expenses].sort((a, b) => {
      if (key === "date") {
        return direction === "asc"
          ? new Date(a.date) - new Date(b.date)
          : new Date(b.date) - new Date(a.date);
      } else if (key === "amount") {
        return direction === "asc" ? a.amount - b.amount : b.amount - a.amount;
      }
      return 0;
    });
    setSortedExpenses(sorted);
  };

  const handleSortChange = (event) => {
    handleSort(event.target.value);
  };

  const toggleSortDirection = () => {
    const newDirection = sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig((prevConfig) => ({
      ...prevConfig,
      direction: newDirection,
    }));

    const sorted = [...sortedExpenses].sort((a, b) => {
      if (sortConfig.key === "date") {
        return newDirection === "asc"
          ? new Date(a.date) - new Date(b.date)
          : new Date(b.date) - new Date(a.date);
      } else if (sortConfig.key === "amount") {
        return newDirection === "asc"
          ? a.amount - b.amount
          : b.amount - a.amount;
      }
      return 0;
    });
    setSortedExpenses(sorted);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 to-blue-800 p-4">
      <div className="container mx-auto bg-white p-8 rounded-lg shadow-lg">
        <div className="flex flex-col gap-4 justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-center text-purple-700 underline">
            View Expenses
          </h2>
          <div className="flex items-center">
            <label htmlFor="sort" className="mr-2 text-purple-700 font-bold">
              Sort by:
            </label>
            <select
              id="sort"
              value={sortConfig.key} // reflect current sort key
              onChange={handleSortChange}
              className="px-1 py-1 border border-gray-300 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-purple-600"
            >
              <option value="date">Date</option>
              <option value="amount">Amount</option>
            </select>
            <button
              onClick={toggleSortDirection}
              className="ml-4 px-1 py-1 bg-purple-700 text-white rounded-lg 
                         hover:bg-purple-800 transition duration-200"
            >
              {sortConfig.direction === "asc" ? "ASC" : "DESC"}
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4 text-left">Description</th>
                <th className="py-2 px-4 text-left">Date</th>
                <th className="py-2 px-4 text-left">Category</th>
                <th className="py-2 px-4 text-left">Amount</th>
                <th className="py-2 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {sortedExpenses.map((expense) => (
                <tr key={expense.id} className="border-t">
                  <td className="py-2 px-4">{expense.description}</td>
                  <td className="py-2 px-4">{expense.date}</td>
                  <td className="py-2 px-4">
                    <span
                      className={`
                        inline-block text-white text-xs font-semibold 
                        px-2 py-1 rounded-full
                        ${getCategoryBadgeClass(expense.category)}
                      `}
                    >
                      {expense.category.toLowerCase()}
                    </span>
                  </td>
                  <td className="py-2 px-4">{expense.amount}</td>
                  <td className="py-2 px-4 text-center">
                    <button
                      onClick={() => handleDelete(expense.id)}
                      disabled={deletingId === expense.id}
                      className={`bg-red-500 text-white py-1 px-3 rounded-lg 
                        hover:bg-red-600 transition duration-200
                        ${
                          deletingId === expense.id
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                    >
                      {deletingId === expense.id ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}

              {sortedExpenses.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="py-4 px-4 text-center text-gray-500 italic"
                  >
                    No expenses found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ViewExpense;
