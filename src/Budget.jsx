// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// function Budget() {
//   const [budgets, setBudgets] = useState([]);
//   const [category, setCategory] = useState('shopping');
//   const [amount, setAmount] = useState('');
//   const navigate = useNavigate();

//   const fetchBudgets = async () => {
//     const token = localStorage.getItem('token');
//     try {
//       const response = await fetch('http://localhost:8080/getBudgets', {
//         headers: {
//           'Authorization': token,
//         },
//       });
//       if (response.ok) {
//         const result = await response.json();
//         setBudgets(result);
//       } else {
//         console.error('Failed to fetch budgets');
//         navigate('/login');
//       }
//     } catch (error) {
//       console.error('There was an error!', error);
//       navigate('/login');
//     }
//   };

//   useEffect(() => {
//     if (!localStorage.getItem('token')) {
//       navigate('/login');
//     } else {
//       fetchBudgets();
//     }
//   }, [navigate]);

//   const handleSetBudget = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem('token');

//     const budgetRequest = {
//       category,
//       amount: parseFloat(amount),
//     };

//     try {
//       const response = await fetch('http://localhost:8080/setBudget', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': token,
//         },
//         body: JSON.stringify(budgetRequest),
//       });
//       if (response.ok) {
//         // Refetch the budgets after setting a new budget
//         fetchBudgets();
//         // Reset the form fields
//         setCategory('shopping');
//         setAmount('');
//       } else {
//         console.error('Failed to set budget');
//       }
//     } catch (error) {
//       console.error('There was an error!', error);
//     }
//   };

//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm('Are you sure you want to delete this budget?');
//     if (!confirmDelete) {
//       return;
//     }

//     const token = localStorage.getItem('token');
//     try {
//       const response = await fetch(`http://localhost:8080/deleteBudget/${id}`, {
//         method: 'DELETE',
//         headers: {
//           'Authorization': token,
//         },
//       });
//       if (response.ok) {
//         // After successfully deleting the budget, refetch the budgets
//         fetchBudgets();
//       } else {
//         console.error('Failed to delete budget');
//       }
//     } catch (error) {
//       console.error('There was an error!', error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-purple-600 to-blue-800 p-4">
//       <div className="container mx-auto bg-white p-8 rounded-lg shadow-lg">
//         <h2 className="text-2xl font-bold text-center text-purple-700 mb-6 underline">Set Budget</h2>
//         <form onSubmit={handleSetBudget} className="space-y-4">
//           <div>
//             <select 
//               value={category} 
//               onChange={(e) => setCategory(e.target.value)} 
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
//             >
//               <option value="shopping">Shopping</option>
//               <option value="bills">Bills</option>
//             </select>
//           </div>
//           <div>
//             <input
//               type="number"
//               value={amount}
//               onChange={(e) => setAmount(e.target.value)}
//               placeholder="Amount"
//               required
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
//             />
//           </div>
//           <button 
//             type="submit" 
//             className="w-full bg-purple-700 text-white py-2 rounded-lg hover:bg-purple-800 transition duration-200"
//           >
//             Set Budget
//           </button>
//         </form>

//         <h2 className="text-2xl font-bold text-center text-purple-700 mb-6 underline mt-8">Budgets</h2>
//         {budgets.length === 0 ? (
//           <p className="text-center text-gray-700">You have not set any budgets.</p>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full bg-white">
//               <thead className="bg-gray-200">
//                 <tr>
//                   <th className="py-2 px-4 text-left">Category</th>
//                   <th className="py-2 px-4 text-left">Budget</th>
//                   <th className="py-2 px-4 text-center">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {budgets.map((budget) => (
//                   <tr key={budget.id} className="border-t">
//                     <td className="py-2 px-4">{budget.category}</td>
//                     <td className="py-2 px-4">{budget.amount}</td>
//                     <td className="py-2 px-4 text-center">
//                       <button 
//                         onClick={() => handleDelete(budget.id)}
//                         className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition duration-200"
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Budget;

//----------------------------------------

import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataContext } from './DataContext';

function Budget() {
  const { budgets, fetchBudgets } = useContext(DataContext);
  const [category, setCategory] = useState('shopping');
  const [amount, setAmount] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
  }, [navigate]);

  const handleSetBudget = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const budgetRequest = {
      category,
      amount: parseFloat(amount),
    };

    try {
      const response = await fetch('http://localhost:8080/setBudget', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        body: JSON.stringify(budgetRequest),
      });
      if (response.ok) {
        fetchBudgets(token);
        setCategory('shopping');
        setAmount('');
      } else {
        console.error('Failed to set budget');
      }
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this budget?');
    if (!confirmDelete) {
      return;
    }

    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:8080/deleteBudget/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': token,
        },
      });
      if (response.ok) {
        fetchBudgets(token);
      } else {
        console.error('Failed to delete budget');
      }
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 to-blue-800 p-4">
      <div className="container mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-purple-700 mb-6 underline">Set Budget</h2>
        <form onSubmit={handleSetBudget} className="space-y-4">
          <div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
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
            Set Budget
          </button>
        </form>

        <h2 className="text-2xl font-bold text-center text-purple-700 mb-6 underline mt-8">Budgets</h2>
        {budgets.length === 0 ? (
          <p className="text-center text-gray-700">You have not set any budgets.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-2 px-4 text-left">Category</th>
                  <th className="py-2 px-4 text-left">Budget</th>
                  <th className="py-2 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {budgets.map((budget) => (
                  <tr key={budget.id} className="border-t">
                    <td className="py-2 px-4">{budget.category}</td>
                    <td className="py-2 px-4">{budget.amount}</td>
                    <td className="py-2 px-4 text-center">
                      <button
                        onClick={() => handleDelete(budget.id)}
                        className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition duration-200"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Budget;


