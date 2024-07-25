
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Pie } from 'react-chartjs-2';
// import 'chart.js/auto'; 

// function Dashboard() {
//   const [total, setTotal] = useState(0);
//   const [description, setDescription] = useState('');
//   const [category, setCategory] = useState('shopping');
//   const [amount, setAmount] = useState('');
//   const [groupedExpenses, setGroupedExpenses] = useState({});
//   const [errorMessage, setErrorMessage] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       navigate('/login');
//       return;
//     }

//     const fetchData = async () => {
//       try {
//         const totalResponse = await fetch('http://localhost:8080/getTotal', {
//           headers: {
//             'Authorization': token,
//           },
//         });
//         if (totalResponse.ok) {
//           const totalResult = await totalResponse.json();
//           setTotal(totalResult);
//         } else {
//           console.error('Failed to fetch total');
//           navigate('/login');
//         }
//       } catch (error) {
//         console.error('There was an error!', error);
//         navigate('/login');
//       }
//     };
//     const fetchGroupedExpenses = async () => {
//       try {
//         const response = await fetch('http://localhost:8080/getGroupedExpense', {
//           headers: {
//             'Authorization': token,
//           },
//         });
//         if (response.ok) {
//           const result = await response.json();
//           setGroupedExpenses(result);
//         } else {
//           console.error('Failed to fetch grouped expenses');
//           navigate('/login');
//         }
//       } catch (error) {
//         console.error('There was an error!', error);
//         navigate('/login');
//       }
//     };

//     fetchData();
//     fetchGroupedExpenses();
//   }, [navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem('token');

//     if (description.length > 30) {
//       setErrorMessage('Description must be 30 characters or less');
//       return;
//     }

//     const expenseRequest = {
//       description,
//       category,
//       amount: parseFloat(amount),
//     };

//     try {
//       const response = await fetch('http://localhost:8080/setExpense', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': token,
//         },
//         body: JSON.stringify(expenseRequest),
//       });
//       if (response.ok) {
//         // After successfully adding the expense, refetch the total and expenses
//         const totalResponse = await fetch('http://localhost:8080/getTotal', {
//           headers: {
//             'Authorization': token,
//           },
//         });
//         if (totalResponse.ok) {
//           const totalResult = await totalResponse.json();
//           setTotal(totalResult);
//         }

//         const fetchGroupedExpenses = async () => {
//           try {
//             const response = await fetch('http://localhost:8080/getGroupedExpense', {
//               headers: {
//                 'Authorization': token,
//               },
//             });
//             if (response.ok) {
//               const result = await response.json();
//               setGroupedExpenses(result);
//             } else {
//               console.error('Failed to fetch grouped expenses');
//               navigate('/login');
//             }
//           } catch (error) {
//             console.error('There was an error!', error);
//             navigate('/login');
//           }
//         };

//         fetchGroupedExpenses();

//         // Reset the form fields and error message
//         setDescription('');
//         setCategory('shopping');
//         setAmount('');
//         setErrorMessage('');
//       } else {
//         console.error('Failed to set expense');
//       }
//     } catch (error) {
//       console.error('There was an error!', error);
//     }
//   };

//   const pieData = {
//     labels: Object.keys(groupedExpenses),
//     datasets: [
//       {
//         data: Object.values(groupedExpenses),
//         backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
//         hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
//       },
//     ],
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-purple-600 to-blue-800 p-4">
//       <div className="container mx-auto">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//           <div className="bg-white p-4 rounded-lg shadow-lg">
//             <h2 className="text-xl font-bold text-center text-purple-700 mb-4">Add Expense</h2>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               {errorMessage && <div className="text-red-500 text-center">{errorMessage}</div>}
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
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
//                 >
//                   <option value="shopping">Shopping</option>
//                   <option value="bills">Bills</option>
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
//             <h2 className="text-xl font-bold text-purple-700 mb-4">Your Total Expense</h2>
//             <div className="text-3xl text-gray-800">{total}</div>
//           </div>
//         </div>
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
//           <div className="bg-white p-4 rounded-lg shadow-lg">
//             <Pie data={pieData} />
//           </div>
//           <div className="bg-white p-4 rounded-lg shadow-lg">
//             <h2 className="text-xl font-bold text-purple-700 mb-4">Expense Categories</h2>
//             <ul className="space-y-2">
//               {Object.entries(groupedExpenses).map(([category, amount]) => (
//                 <li key={category} className="flex justify-between">
//                   <span>{category}</span>
//                   <span>{amount}</span>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;

//----------------------------------------------------------------


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto'; 

function Dashboard() {
  const [total, setTotal] = useState(0);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('shopping');
  const [amount, setAmount] = useState('');
  const [groupedExpenses, setGroupedExpenses] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const totalResponse = await fetch('http://localhost:8080/getTotal', {
          headers: {
            'Authorization': token,
          },
        });
        if (totalResponse.ok) {
          const totalResult = await totalResponse.json();
          setTotal(totalResult);
        } else {
          console.error('Failed to fetch total');
          navigate('/login');
        }
      } catch (error) {
        console.error('There was an error!', error);
        navigate('/login');
      }
    };
    const fetchGroupedExpenses = async () => {
      try {
        const response = await fetch('http://localhost:8080/getGroupedExpense', {
          headers: {
            'Authorization': token,
          },
        });
        if (response.ok) {
          const result = await response.json();
          setGroupedExpenses(result);
        } else {
          console.error('Failed to fetch grouped expenses');
          navigate('/login');
        }
      } catch (error) {
        console.error('There was an error!', error);
        navigate('/login');
      }
    };

    fetchData();
    fetchGroupedExpenses();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (description.length > 30) {
      setErrorMessage('Description must be 30 characters or less');
      return;
    }

    const expenseRequest = {
      description,
      category,
      amount: parseFloat(amount),
    };

    try {
      const response = await fetch('http://localhost:8080/setExpense', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        body: JSON.stringify(expenseRequest),
      });
      if (response.ok) {
        // After successfully adding the expense, refetch the total and expenses
        const totalResponse = await fetch('http://localhost:8080/getTotal', {
          headers: {
            'Authorization': token,
          },
        });
        if (totalResponse.ok) {
          const totalResult = await totalResponse.json();
          setTotal(totalResult);
        }

        const fetchGroupedExpenses = async () => {
          try {
            const response = await fetch('http://localhost:8080/getGroupedExpense', {
              headers: {
                'Authorization': token,
              },
            });
            if (response.ok) {
              const result = await response.json();
              setGroupedExpenses(result);
            } else {
              console.error('Failed to fetch grouped expenses');
              navigate('/login');
            }
          } catch (error) {
            console.error('There was an error!', error);
            navigate('/login');
          }
        };

        fetchGroupedExpenses();

        // Reset the form fields and error message
        setDescription('');
        setCategory('shopping');
        setAmount('');
        setErrorMessage('');
      } else {
        console.error('Failed to set expense');
      }
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  const pieData = {
    labels: Object.keys(groupedExpenses),
    datasets: [
      {
        data: Object.values(groupedExpenses),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#FFCD56', '#4CAF50', '#F44336', '#E91E63'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#FFCD56', '#4CAF50', '#F44336', '#E91E63'],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 to-blue-800 p-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-center text-purple-700 mb-4">Add Expense</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && <div className="text-red-500 text-center">{errorMessage}</div>}
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
                Add Expense
              </button>
            </form>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold text-purple-700 mb-4">Your Total Expense</h2>
            <div className="text-3xl text-gray-800">{total}</div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
          <div className="bg-white p-4 rounded-lg shadow-lg lg:min-h-[600px]" >
            <Pie data={pieData} />
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg lg:min-h-[600px]">
            <h2 className="text-xl font-bold text-purple-700 mb-4">Expense Categories</h2>
            <ul className="space-y-2">
              {Object.entries(groupedExpenses).map(([category, amount]) => (
                <li key={category} className="flex justify-between">
                  <span>{category}</span>
                  <span>{amount}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;




