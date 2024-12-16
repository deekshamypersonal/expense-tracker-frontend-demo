// import React, { useContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Pie } from "react-chartjs-2";
// import "chart.js/auto";
// import { DataContext } from "./DataContext";
// import FileUpload from "./FileUpload";
// import { setExpense } from "./api";

// function Dashboard() {
//   const {
//     total,
//     groupedExpenses,
//     fetchTotal,
//     budgets,
//     fetchExpenses,
//     fetchGroupedExpenses,
//   } = useContext(DataContext);

//   const [description, setDescription] = useState("");
//   const [category, setCategory] = useState("shopping");
//   const [amount, setAmount] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");

//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       navigate("/login");
//       return;
//     }
//   }, [navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem("token");

//     if (description.length > 30) {
//       setErrorMessage("Description must be 30 characters or less.");
//       return;
//     }

//     const expenseRequest = {
//       description,
//       category,
//       amount: parseFloat(amount),
//     };

//     try {
//       await setExpense(expenseRequest, token);
//       await fetchTotal(token);
//       await fetchExpenses(token);
//       await fetchGroupedExpenses(token);

//       const currentExpensesForCategory = groupedExpenses[category] || 0;
//       const budgetForCategory = budgets.find(
//         (b) => b.category === category
//       )?.amount;
//       if (
//         budgetForCategory &&
//         currentExpensesForCategory + parseFloat(amount) > budgetForCategory
//       ) {
//         alert(`Warning: You have exceeded your budget for ${category}!`);
//       }

//       setDescription("");
//       setCategory("shopping");
//       setAmount("");
//       setErrorMessage("");
//     } catch (error) {
//       console.error("There was an error!", error);
//       setErrorMessage("Failed to set expense. Please try again.");
//     }
//   };

//   const pieData = {
//     labels: Object.keys(groupedExpenses),
//     datasets: [
//       {
//         data: Object.values(groupedExpenses),
//         backgroundColor: [
//           "#FF6384",
//           "#36A2EB",
//           "#FFCE56",
//           "#4BC0C0",
//           "#9966FF",
//           "#FF9F40",
//           "#FFCD56",
//           "#4CAF50",
//           "#F44336",
//           "#E91E63",
//         ],
//         hoverBackgroundColor: [
//           "#FF6384",
//           "#36A2EB",
//           "#FFCE56",
//           "#4BC0C0",
//           "#9966FF",
//           "#FF9F40",
//           "#FFCD56",
//           "#4CAF50",
//           "#F44336",
//           "#E91E63",
//         ],
//       },
//     ],
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-purple-600 to-blue-800 p-4">
//       <div className="container mx-auto">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//           <div className="bg-white p-4 rounded-lg shadow-lg">
//             <h2 className="text-xl font-bold text-center text-purple-700 mb-4">
//               Add Expense
//             </h2>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               {errorMessage && (
//                 <div className="text-red-500 text-center">{errorMessage}</div>
//               )}
//               <div>
//                 <input
//                   type="text"
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   placeholder="Description"
//                   required
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
//                 />
//               </div>
//               <div>
//                 <select
//                   value={category}
//                   onChange={(e) => setCategory(e.target.value)}
//                   className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm sm:text-base lg:text-lg"
//                 >
//                   <option value="food_and_dining">Food and Dining</option>
//                   <option value="transportation">Transportation</option>
//                   <option value="housing">Housing</option>
//                   <option value="entertainment">Entertainment</option>
//                   <option value="healthcare">Healthcare</option>
//                   <option value="personal_care">Personal Care</option>
//                   <option value="shopping">Shopping</option>
//                   <option value="travel">Travel</option>
//                   <option value="education">Education</option>
//                   <option value="miscellaneous">Miscellaneous</option>
//                 </select>
//               </div>
//               <div>
//                 <input
//                   type="number"
//                   value={amount}
//                   onChange={(e) => setAmount(e.target.value)}
//                   placeholder="Amount"
//                   required
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className="w-full bg-purple-700 text-white py-2 rounded-lg hover:bg-purple-800 transition duration-200"
//               >
//                 Add Expense
//               </button>
//             </form>
//           </div>
//           <div className="bg-white p-4 rounded-lg shadow-lg text-center">
//             <h2 className="text-xl font-bold text-purple-700 mb-4">
//               Your Total Expense
//             </h2>
//             <div className="text-3xl text-gray-800">{total}</div>
//           </div>
//         </div>
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
//           <div className="bg-white p-4 rounded-lg shadow-lg lg:min-h-[600px]">
//             <Pie data={pieData} />
//           </div>
//           <div className="bg-white p-4 rounded-lg shadow-lg lg:min-h-[600px]">
//             <h2 className="text-xl font-bold text-purple-700 mb-4">
//               Expense Categories
//             </h2>
//             <ul className="space-y-2">
//               {Object.entries(groupedExpenses).map(([cat, amt]) => (
//                 <li key={cat} className="flex justify-between">
//                   <span>{cat}</span>
//                   <span>{amt}</span>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//         <div className="mt-8">
//           <FileUpload />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;

//-----------------------------------------------------------

import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import { DataContext } from "./DataContext";
import FileUpload from "./FileUpload";
import { setExpense } from "./api";

function Dashboard() {
  const {
    total,
    groupedExpenses,
    fetchTotal,
    budgets,
    fetchExpenses,
    fetchGroupedExpenses,
    expenses, // So we can see how many expenses user already has
  } = useContext(DataContext);

  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("shopping");
  const [amount, setAmount] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
  }, [navigate]);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const token = localStorage.getItem("token");

  //   // Demo limit: If user already has 10 expenses, block creation
  //   if (expenses.length >= 10) {
  //     setErrorMessage(
  //       "Demo user can only add 10 expenses. Please delete one from View Expense tab."
  //     );
  //     return;
  //   }

  //   if (description.length > 30) {
  //     setErrorMessage("Description must be 30 characters or less.");
  //     return;
  //   }

  //   const expenseRequest = {
  //     description,
  //     category,
  //     amount: parseFloat(amount),
  //   };

  //   try {
  //     await setExpense(expenseRequest, token);
  //     await fetchTotal(token);
  //     await fetchExpenses(token);
  //     await fetchGroupedExpenses(token);

  //     const currentExpensesForCategory = groupedExpenses[category] || 0;
  //     const budgetForCategory = budgets.find(
  //       (b) => b.category === category
  //     )?.amount;
  //     if (
  //       budgetForCategory &&
  //       currentExpensesForCategory + parseFloat(amount) > budgetForCategory
  //     ) {
  //       alert(`Warning: You have exceeded your budget for ${category}!`);
  //     }

  //     setDescription("");
  //     setCategory("shopping");
  //     setAmount("");
  //     setErrorMessage("");
  //   } catch (error) {
  //     console.error("There was an error!", error);
  //     setErrorMessage("Failed to set expense. Please try again.");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    // Demo limit check: If user already has 10 expenses, block creation
    if (expenses.length >= 10) {
      setErrorMessage(
        "Demo user can only add 10 expenses. Please delete one from View Expense tab."
      );
      return;
    }

    // Description length check
    if (description.length > 30) {
      setErrorMessage("Description must be 30 characters or less.");
      return;
    }

    // Positive amount check
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setErrorMessage("Please enter a positive amount.");
      return;
    }

    const expenseRequest = {
      description,
      category,
      amount: parsedAmount,
    };

    try {
      await setExpense(expenseRequest, token);
      await fetchTotal(token);
      await fetchExpenses(token);
      await fetchGroupedExpenses(token);

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

      // Reset form fields
      setDescription("");
      setCategory("shopping");
      setAmount("");
      setErrorMessage("");
    } catch (error) {
      console.error("There was an error!", error);
      setErrorMessage("Failed to set expense. Please try again.");
    }
  };

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-center text-purple-700 mb-4">
              Add Expense
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="text-red-500 text-center">{errorMessage}</div>
              )}
              <div>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
              <div>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm sm:text-base lg:text-lg"
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
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Amount"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-purple-700 text-white py-2 rounded-lg hover:bg-purple-800 transition duration-200"
              >
                Add Expense
              </button>
            </form>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold text-purple-700 mb-4">
              Your Total Expense
            </h2>
            <div className="text-3xl text-gray-800">{total}</div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
          <div className="bg-white p-4 rounded-lg shadow-lg lg:min-h-[600px]">
            <Pie data={pieData} />
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg lg:min-h-[600px]">
            <h2 className="text-xl font-bold text-purple-700 mb-4">
              Expense Categories
            </h2>
            <ul className="space-y-2">
              {Object.entries(groupedExpenses).map(([cat, amt]) => (
                <li key={cat} className="flex justify-between">
                  <span>{cat}</span>
                  <span>{amt}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-8">
          <FileUpload />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
