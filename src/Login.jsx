
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// function Login() {
//   const [formData, setFormData] = useState({ email: '', password: '' });
//   const [errorMessage, setErrorMessage] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('http://localhost:8080/users/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(formData)
//       });

//       if (response.ok) {
//         const token = response.headers.get('authorization') || response.headers.get('Authorization');
//         if (token) {
//           localStorage.setItem('token', `Bearer ${token}`);
//           navigate('/dashboard');
//         } else {
//           setErrorMessage('Token is undefined');
//         }
//       } else {
//         setErrorMessage('Invalid credentials. Please try again.');
//       }
//     } catch (error) {
//       console.error('There was an error!', error);
//       setErrorMessage('An error occurred. Please try again later.');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-600 to-blue-800 m-0">
//       <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
//         <h2 className="text-2xl font-bold text-center mb-6 underline text-purple-700">Login</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <input 
//               type="email" 
//               name="email" 
//               placeholder="Email" 
//               onChange={handleChange} 
//               required 
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
//             />
//           </div>
//           <div>
//             <input 
//               type="password" 
//               name="password" 
//               placeholder="Password" 
//               onChange={handleChange} 
//               required 
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
//             />
//           </div>
//           {errorMessage && <p className="text-red-500">{errorMessage}</p>}
//           <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
//             <button 
//               type="submit" 
//               className="w-full sm:w-auto bg-purple-700 text-white py-2 px-4 rounded-lg hover:bg-purple-800 transition duration-200"
//             >
//               Login
//             </button>
//             <button 
//               type="button" 
//               onClick={() => navigate('/signup')} 
//               className="w-full sm:w-auto bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition duration-200"
//             >
//               Sign Up
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Login;

//------------------------------------------

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const token = response.headers.get('authorization') || response.headers.get('Authorization');
        if (token) {
          localStorage.setItem('token', `Bearer ${token}`);
          navigate('/dashboard');
        } else {
          setErrorMessage('Token is undefined');
        }
      } else {
        setErrorMessage('Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('There was an error!', error);
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-600 to-blue-800 m-0">
      <h1 className="text-4xl font-bold text-white mb-6">Monthly Expense Tracker</h1>
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold text-center mb-6 underline text-purple-700">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-purple-600">
            <span className="mx-3 text-gray-400">@</span>
            <input 
              type="email" 
              name="email" 
              placeholder="Email" 
              onChange={handleChange} 
              required 
              className="w-full px-4 py-2 border-0 focus:outline-none"
            />
          </div>
          <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-purple-600">
            <span className="mx-3 text-gray-400">🔒</span>
            <input 
              type="password" 
              name="password" 
              placeholder="Password" 
              onChange={handleChange} 
              required 
              className="w-full px-4 py-2 border-0 focus:outline-none"
            />
          </div>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button 
              type="submit" 
              className="w-full sm:w-auto bg-purple-700 text-white py-2 px-4 rounded-lg hover:bg-purple-800 transition duration-200"
            >
              Login
            </button>
            <button 
              type="button" 
              onClick={() => navigate('/signup')} 
              className="w-full sm:w-auto bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition duration-200"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

//------------------------------------







