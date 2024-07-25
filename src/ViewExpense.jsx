

// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// function ViewExpense() {
//   const [expenses, setExpenses] = useState([]);
//   const navigate = useNavigate();

//   const fetchExpenses = async () => {
//     const token = localStorage.getItem('token');
//     try {
//       const response = await fetch('http://localhost:8080/getExpense', {
//         headers: {
//           'Authorization': token,
//         },
//       });
//       if (response.ok) {
//         const result = await response.json();
//         setExpenses(result);
//       } else {
//         console.error('Failed to fetch expenses');
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
//       fetchExpenses();
//     }
//   }, [navigate]);

//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm('Are you sure you want to delete this expense?');
//     if (!confirmDelete) {
//       return;
//     }

//     const token = localStorage.getItem('token');
//     try {
//       const response = await fetch(`http://localhost:8080/deleteExpense/${id}`, {
//         method: 'DELETE',
//         headers: {
//           'Authorization': token,
//         },
//       });
//       if (response.ok) {
//         // After successfully deleting the expense, refetch the expenses
//         fetchExpenses();
//       } else {
//         console.error('Failed to delete expense');
//       }
//     } catch (error) {
//       console.error('There was an error!', error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-purple-600 to-blue-800 p-4">
//       <div className="container mx-auto bg-white p-8 rounded-lg shadow-lg">
//         <h2 className="text-2xl font-bold text-center text-purple-700 mb-6 underline">View Expenses</h2>
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
//               {expenses.map((expense) => (
//                 <tr key={expense.id} className="border-t">
//                   <td className="py-2 px-4 wrap-after-20">{expense.description}</td>
//                   <td className="py-2 px-4">{expense.date}</td>
//                   <td className="py-2 px-4">{expense.category}</td>
//                   <td className="py-2 px-4">{expense.amount}</td>
//                   <td className="py-2 px-4 text-center">
//                     <button 
//                       onClick={() => handleDelete(expense.id)}
//                       className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition duration-200"
//                     >
//                       Delete
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

//-------------------------------------------------------------

// import React, { useContext, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { DataContext } from './DataContext';

// function ViewExpense() {
//   const { fetchTotal, fetchGroupedExpenses,expenses, fetchExpenses } = useContext(DataContext);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       navigate('/login');
//       return;
//     }
   
//   }, [navigate]);

//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm('Are you sure you want to delete this expense?');
//     if (!confirmDelete) {
//       return;
//     }

//     const token = localStorage.getItem('token');
//     try {
//       const response = await fetch(`http://localhost:8080/deleteExpense/${id}`, {
//         method: 'DELETE',
//         headers: {
//           'Authorization': token,
//         },
//       });
//       if (response.ok) {
//         console.log('delete');
//         fetchTotal(token);
//         fetchGroupedExpenses(token);
//         fetchExpenses(token);
//       } else {
//         console.error('Failed to delete expense');
//       }
//     } catch (error) {
//       console.error('There was an error!', error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-purple-600 to-blue-800 p-4">
//       <div className="container mx-auto bg-white p-8 rounded-lg shadow-lg">
//         <h2 className="text-2xl font-bold text-center text-purple-700 mb-6 underline">View Expenses</h2>
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
//               {expenses.map((expense) => (
//                 <tr key={expense.id} className="border-t">
//                   <td className="py-2 px-4 wrap-after-20">{expense.description}</td>
//                   <td className="py-2 px-4">{expense.date}</td>
//                   <td className="py-2 px-4">{expense.category}</td>
//                   <td className="py-2 px-4">{expense.amount}</td>
//                   <td className="py-2 px-4 text-center">
//                     <button
//                       onClick={() => handleDelete(expense.id)}
//                       className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition duration-200"
//                     >
//                       Delete
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

//-------------------------------------------------

// import React, { useContext, useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { DataContext } from './DataContext';

// function ViewExpense() {
//   const { fetchTotal, fetchGroupedExpenses, expenses, fetchExpenses } = useContext(DataContext);
//   const [sortedExpenses, setSortedExpenses] = useState([]);
  
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       navigate('/login');
//       return;
//     }

//     // Initial sorting
//     setSortedExpenses([...expenses].sort((a, b) => new Date(a.date) - new Date(b.date)));
//   }, [navigate, expenses]);

 

//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm('Are you sure you want to delete this expense?');
//     if (!confirmDelete) {
//       return;
//     }

//     const token = localStorage.getItem('token');
//     try {
//       const response = await fetch(`http://localhost:8080/deleteExpense/${id}`, {
//         method: 'DELETE',
//         headers: {
//           'Authorization': token,
//         },
//       });
//       if (response.ok) {
//         fetchTotal(token);
//         fetchGroupedExpenses(token);
//         fetchExpenses(token);
//       } else {
//         console.error('Failed to delete expense');
//       }
//     } catch (error) {
//       console.error('There was an error!', error);
//     }
//   };

//   const handleSort = (key) => {
//     console.log(`Sorting by: ${key}`);
//     let direction = 'asc';

//     console.log('1:',expenses);

//     const sorted = [...expenses].sort((a, b) => {
//       if (key === 'date') {
//         return direction === 'asc'
//           ? new Date(a.date) - new Date(b.date)
//           : new Date(b.date) - new Date(a.date);
//       } else if (key === 'amount') {
//         return direction === 'asc' ? a.amount - b.amount : b.amount - a.amount;
//       } else {
//         return 0;
//       }
//     });

//     console.log('2:',expenses);
//     console.log('3:',sorted);

//     setSortedExpenses(sorted);
//   };

//   const handleSortChange = (event) => {
//     const key = event.target.value;
//     handleSort(key);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-purple-600 to-blue-800 p-4">
//       <div className="container mx-auto bg-white p-8 rounded-lg shadow-lg">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-bold text-center text-purple-700 underline">View Expenses</h2>
//           <div>
//             <label htmlFor="sort" className="mr-2 text-purple-700 font-bold">Sort by:</label>
//             <select
//               id="sort"
//               onChange={handleSortChange}
//               className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
//             >
//               <option value="date">Date</option>
//               <option value="amount">Amount</option>
//             </select>
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
//                   <td className="py-2 px-4 wrap-after-20">{expense.description}</td>
//                   <td className="py-2 px-4">{expense.date}</td>
//                   <td className="py-2 px-4">{expense.category}</td>
//                   <td className="py-2 px-4">{expense.amount}</td>
//                   <td className="py-2 px-4 text-center">
//                     <button
//                       onClick={() => handleDelete(expense.id)}
//                       className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition duration-200"
//                     >
//                       Delete
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


//-------------------------------------

import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataContext } from './DataContext';

function ViewExpense() {
  const { fetchTotal, fetchGroupedExpenses, expenses, fetchExpenses } = useContext(DataContext);
  const [sortedExpenses, setSortedExpenses] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'asc' });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    // fetchExpenses(token);

    // Initial sorting
    setSortedExpenses([...expenses].sort((a, b) => new Date(a.date) - new Date(b.date)));
  }, [navigate, fetchExpenses, expenses]);

  useEffect(() => {
    setSortedExpenses([...expenses]);
  }, [expenses]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this expense?');
    if (!confirmDelete) {
      return;
    }

    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:8080/deleteExpense/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': token,
        },
      });
      if (response.ok) {
        fetchTotal(token);
        fetchGroupedExpenses(token);
        fetchExpenses(token);
      } else {
        console.error('Failed to delete expense');
      }
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sorted = [...expenses].sort((a, b) => {
      if (key === 'date') {
        return direction === 'asc'
          ? new Date(a.date) - new Date(b.date)
          : new Date(b.date) - new Date(a.date);
      } else if (key === 'amount') {
        return direction === 'asc' ? a.amount - b.amount : b.amount - a.amount;
      } else {
        return 0;
      }
    });

    setSortedExpenses(sorted);
  };

  const handleSortChange = (event) => {
    const key = event.target.value;
    handleSort(key);
  };

  const toggleSortDirection = () => {
    const newDirection = sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig((prevConfig) => ({
      ...prevConfig,
      direction: newDirection,
    }));

    const sorted = [...sortedExpenses].sort((a, b) => {
      if (sortConfig.key === 'date') {
        return newDirection === 'asc'
          ? new Date(a.date) - new Date(b.date)
          : new Date(b.date) - new Date(a.date);
      } else if (sortConfig.key === 'amount') {
        return newDirection === 'asc' ? a.amount - b.amount : b.amount - a.amount;
      } else {
        return 0;
      }
    });

    setSortedExpenses(sorted);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 to-blue-800 p-4">
      <div className="container mx-auto bg-white p-8 rounded-lg shadow-lg">
        <div className="flex flex-col gap-4 justify-between items-center mb-6 ">
          <h2 className="text-2xl font-bold text-center text-purple-700 underline">View Expenses</h2>
          <div className="flex items-center">
            <label htmlFor="sort" className="mr-2 text-purple-700 font-bold">Sort by:</label>
            <select
              id="sort"
              onChange={handleSortChange}
              className="px-1 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            >
              <option value="date">Date</option>
              <option value="amount">Amount</option>
            </select>
            <button
              onClick={toggleSortDirection}
              className="ml-4 px-1 py-1 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition duration-200"
            >
              {sortConfig.direction === 'asc' ? 'ASC' : 'DESC'}
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
                  <td className="py-2 px-4 wrap-after-20">{expense.description}</td>
                  <td className="py-2 px-4">{expense.date}</td>
                  <td className="py-2 px-4">{expense.category}</td>
                  <td className="py-2 px-4">{expense.amount}</td>
                  <td className="py-2 px-4 text-center">
                    <button
                      onClick={() => handleDelete(expense.id)}
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
      </div>
    </div>
  );
}

export default ViewExpense;




