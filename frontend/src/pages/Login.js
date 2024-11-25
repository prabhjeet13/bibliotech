import React, { useState } from 'react';
import imagebg from '../assets/imagebg.jpg';
import imagesignup from '../assets/imagesignup.png';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '../slices/profileSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showpassword, setshowpassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);  // Loading state

  const textboxvaluechange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    
    // Form validation (optional)
    if (!formData.email || !formData.password) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true); // Set loading to true when the request is initiated

    try {
      // Send POST request to backend with form data
      const response = await axios.post('http://localhost:4001/api/v1/auth/signin', formData);

      // Handle successful response (e.g., storing tokens, navigating to dashboard)
      if (response.data.success) {
        // Storing the token and user data in Redux
        dispatch(setToken(response.data.token));
        dispatch(setUser(response.data.existUser));

        // Save user data to localStorage
        localStorage.setItem('user', JSON.stringify(response.data.existUser));
        localStorage.setItem('token', JSON.stringify(response.data.token));
        // Navigate to the home/dashboard page after successful login
        navigate('/dashboard');  // Change this to the appropriate route
      } else {
        alert(response.data.message);  // Show error message from backend if login failed
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Login failed. Please try again.");
    } finally {
      setLoading(false); // Set loading to false when the request is completed
    }
  };

  return (
    <div
      className="mx-auto max-w-[1260px] md:flex md:flex-row md:mt-2 justify-evenly items-center md:gap-3 flex flex-col-reverse sm:gap-52 sm:mt-36 mt-10 bg-gradient-to-br from-blue-100 via-white to-purple-200 md:h-[100vh]"
    >
      <div className="md:w-[40%] flex flex-col gap-2 w-11/12">
        <p className="text-xl font-semibold font-mono uppercase">Welcome again to BIBLIOTECH !!!</p>
        <form className="flex flex-col gap-5 font-semibold" onSubmit={onSubmitHandler}>
          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email</label>
            <input
              onChange={textboxvaluechange}
              value={formData.email}
              type="text"
              name="email"
              id="email"
              placeholder="email"
              className="bg-white py-2 rounded-md text-black border-2 border-black"
              required
            />
          </div>

          <div className="flex flex-col gap-1 relative">
            <label htmlFor="password">Password</label>
            <input
              onChange={textboxvaluechange}
              value={formData.password}
              type={`${showpassword ? "text" : "password"}`}
              name="password"
              id="password"
              placeholder="password"
              className="bg-white py-2 rounded-md text-black border-2 border-black"
              required
            />
            <FaEye
              onClick={() => setshowpassword(false)}
              className={`${showpassword ? "visible" : "invisible"} absolute text-lg top-10 right-2`}
            />
            <FaEyeSlash
              onClick={() => setshowpassword(true)}
              className={`${showpassword ? "invisible" : "visible"} absolute text-lg top-10 right-2`}
            />
          </div>
          <button
            type="Submit"
            className="bg-yellow-400 text-black font-bold font-mono py-2 rounded-md transition-all duration-200 hover:bg-yellow-500 hover:scale-95"
            disabled={loading}  // Disable the button when loading
          >
            {loading ? "Signing In..." : "Sign In"} {/* Show loading text */}
          </button>
        </form>
      </div>
      <div className="md:w-[40%] relative max-500:invisible sm:w-[50%]">
        <img src={imagebg} className="absolute -right-3 -top-32" alt="background" />
        <img src={imagesignup} className="absolute right-1 -top-28" alt="sign up" />
      </div>
    </div>
  );
};

export default Login;


// import React, { useState } from 'react';
// import imagebg from '../assets/imagebg.jpg';
// import imagesignup from '../assets/imagesignup.png';
// import { FaEye, FaEyeSlash } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const navigate = useNavigate();
//   const [showpassword, setshowpassword] = useState(false);
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const textboxvaluechange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const onSubmitHandler = (e) => {
//     e.preventDefault();
//     // Handle form submission
//   };

//   return (
//     <div
//       className="mx-auto max-w-[1260px] md:flex md:flex-row md:mt-2 justify-evenly items-center md:gap-3 flex flex-col-reverse sm:gap-52 sm:mt-36 mt-10 bg-gradient-to-br from-blue-100 via-white to-purple-200 md:h-[100vh]"
//     >
//       <div className="md:w-[40%] flex flex-col gap-2 w-11/12">
//         <p className="text-xl font-semibold font-mono uppercase">Welcome again to BIBLIOTECH !!!</p>
//         <form className="flex flex-col gap-5 font-semibold" onSubmit={onSubmitHandler}>
//           <div className="flex flex-col gap-1">
//             <label htmlFor="email">Email</label>
//             <input
//               onChange={textboxvaluechange}
//               value={formData.email}
//               type="text"
//               name="email"
//               id="email"
//               placeholder="email"
//               className="bg-white py-2 rounded-md text-black border-2 border-black"
//               required
//             />
//           </div>

//           <div className="flex flex-col gap-1 relative">
//             <label htmlFor="password">Password</label>
//             <input
//               onChange={textboxvaluechange}
//               value={formData.password}
//               type={`${showpassword ? "text" : "password"}`}
//               name="password"
//               id="password"
//               placeholder="password"
//               className="bg-white py-2 rounded-md text-black border-2 border-black"
//               required
//             />
//             <FaEye
//               onClick={() => setshowpassword(false)}
//               className={`${showpassword ? "visible" : "invisible"} absolute text-lg top-10 right-2`}
//             />
//             <FaEyeSlash
//               onClick={() => setshowpassword(true)}
//               className={`${showpassword ? "invisible" : "visible"} absolute text-lg top-10 right-2`}
//             />
//           </div>
//           <button
//             type="Submit"
//             className="bg-yellow-400 text-black font-bold font-mono py-2 rounded-md transition-all duration-200 hover:bg-yellow-500 hover:scale-95"
//           >
//             Sign In
//           </button>
//         </form>
//       </div>
//       <div className="md:w-[40%] relative max-500:invisible sm:w-[50%]">
//         <img src={imagebg} className="absolute -right-3 -top-32" alt="background" />
//         <img src={imagesignup} className="absolute right-1 -top-28" alt="sign up" />
//       </div>
//     </div>
//   );
// };

// export default Login;
