// import React, { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { DataContext } from "./DataContext";
// import { loginUser } from "./api";

// function Login() {
//   // Default the formData to the demo credentials
//   const [formData, setFormData] = useState({
//     email: "userdemo@gmail.com",
//     password: "Demo2024!",
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   // <-- NEW: This state tracks if we are awaiting response
//   const [isLoading, setIsLoading] = useState(false);

//   const navigate = useNavigate();
//   const { fetchAllData, setToken } = useContext(DataContext);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       setIsLoading(true); // <-- start loading
//       const token = await loginUser(formData);
//       localStorage.setItem("token", token);
//       setToken(token);

//       // Fetch all user data after login
//       await fetchAllData(token);

//       // Done, navigate to dashboard
//       navigate("/dashboard");
//     } catch (error) {
//       console.error("Error occurred during login:", error);
//       setErrorMessage("Invalid credentials. Please try again.");
//     } finally {
//       // <-- stop loading, whether success or failure
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-600 to-blue-800 m-0">
//       <h1 className="text-4xl font-bold text-white mb-6">
//         Monthly Expense Tracker
//       </h1>

//       <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
//         <h2 className="text-2xl font-bold text-center mb-2 underline text-purple-700">
//           Login
//         </h2>

//         {errorMessage && (
//           <p className="text-red-500 text-center mb-4">{errorMessage}</p>
//         )}

//         {/* Display the demo credentials info, even though they're pre-filled */}
//         <div className="text-sm text-gray-600 mb-4 text-center">
//           <p>Demo Credentials:</p>
//           <p>
//             Username: <span className="font-semibold">userdemo@gmail.com</span>
//           </p>
//           <p>
//             Password: <span className="font-semibold">Demo2024!</span>
//           </p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Email Field */}
//           <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-purple-600">
//             <span className="mx-3 text-gray-400">@</span>
//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-2 border-0 focus:outline-none"
//             />
//           </div>

//           {/* Password Field with Show/Hide Icon */}
//           <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-purple-600">
//             <span className="mx-3 text-gray-400">🔒</span>
//             <input
//               type={showPassword ? "text" : "password"}
//               name="password"
//               placeholder="Password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-2 border-0 focus:outline-none"
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="mx-3 text-gray-400 hover:text-gray-600 focus:outline-none"
//             >
//               {showPassword ? "🙈" : "👁️"}
//             </button>
//           </div>

//           {/* Loading indicator */}
//           {isLoading && (
//             <div className="text-center text-purple-700 font-bold">
//               Logging in, please wait...
//             </div>
//           )}

//           <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
//             <button
//               type="submit"
//               // Disable the button while loading to prevent re-click
//               disabled={isLoading}
//               className={`w-full sm:w-auto text-white py-2 px-4 rounded-lg transition duration-200
//                 ${
//                   isLoading
//                     ? "bg-gray-400"
//                     : "bg-purple-700 hover:bg-purple-800"
//                 }`}
//             >
//               {isLoading ? "Loading..." : "Login"}
//             </button>

//             <button
//               type="button"
//               onClick={() => navigate("/signup")}
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

//------------------------------------------------------------------------------

import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "./DataContext";
import { loginUser } from "./api";

function Login() {
  // Default the formData to the demo credentials
  const [formData, setFormData] = useState({
    email: "userdemo@gmail.com",
    password: "Demo2024!",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { fetchAllData, setToken } = useContext(DataContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const token = await loginUser(formData);
      localStorage.setItem("token", token);
      setToken(token);

      // Fetch all user data after login
      await fetchAllData(token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error occurred during login:", error);
      setErrorMessage("Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Outer container now has p-4 so it’s not flush against edges on mobile
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-600 to-blue-800 p-6">
      <h1 className="text-4xl font-bold text-white mb-6">
        Monthly Expense Tracker
      </h1>

      {/* The login box has p-6, w-full, max-w-md, and mx-auto to center + ensure spacing */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-center mb-2 underline text-purple-700">
          Login
        </h2>

        {errorMessage && (
          <p className="text-red-500 text-center mb-4">{errorMessage}</p>
        )}

        {/* Display the demo credentials info, even though they're pre-filled */}
        <div className="text-sm text-gray-600 mb-4 text-center">
          <p>Demo Credentials:</p>
          <p>
            Username: <span className="font-semibold">userdemo@gmail.com</span>
          </p>
          <p>
            Password: <span className="font-semibold">Demo2024!</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-purple-600">
            <span className="mx-3 text-gray-400">@</span>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border-0 focus:outline-none"
            />
          </div>

          {/* Password Field with Show/Hide Icon */}
          <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-purple-600">
            <span className="mx-3 text-gray-400">🔒</span>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border-0 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="mx-3 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          {/* Loading indicator */}
          {isLoading && (
            <div className="text-center text-purple-700 font-bold">
              Logging in, please wait...
            </div>
          )}

          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full sm:w-auto text-white py-2 px-4 rounded-lg transition duration-200
                ${
                  isLoading
                    ? "bg-gray-400"
                    : "bg-purple-700 hover:bg-purple-800"
                }`}
            >
              {isLoading ? "Loading..." : "Login"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/signup")}
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
