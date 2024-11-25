import React, { useState } from 'react';
import imagebg from '../assets/imagebg.jpg';
import imagesignup from '../assets/imagesignup.png';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios

const SignUp = () => {
  const navigate = useNavigate();
  const [showpassword, setshowpassword] = useState(false);
  const [showconfirmpassword, setshowconfirmpassword] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Loading state to show loading spinner
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // To handle error messages

  const textboxvaluechange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Both passwords do not match, try again.');
      return;
    }

    // Reset error before submission
    setError('');
    setLoading(true); // Set loading to true when submitting

    // Prepare the data for POST request
    const userData = {
      fullname: formData.fullname,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      accountType: "Buyer"
    };

    // Make the POST request using axios
    axios
      .post('http://localhost:4001/api/v1/auth/signup', userData)
      .then((response) => {
        setLoading(false); // Stop loading
        // Handle successful response (e.g., redirect user or show success message)
        console.log(response.data);
        navigate('/signin'); // Redirect to login page (or any other route)
      })
      .catch((error) => {
        setLoading(false); // Stop loading
        setError('Error occurred while signing up. Please try again.');
        console.error(error);
      });
  };

  return (
    <div
      className="md:h-[100vh] mx-auto w-11/12 max-w-[1260px] md:flex md:flex-row items-center justify-evenly md:mt-5 flex flex-col-reverse gap-36 bg-gradient-to-br from-purple-100 via-white to-blue-200"
    >
      <div className="w-[50%] flex flex-col gap-2">
        <p className="font-bold font-mono text-lg text-black uppercase">
          Your gateway to a smarter book shopping experience!!!
        </p>
        <form className="flex flex-col gap-5 font-mono font-semibold text-xl" onSubmit={submitHandler}>
          <div className="flex flex-col md:w-[85%]">
            <label htmlFor="fullname">Full Name</label>
            <input
              onChange={textboxvaluechange}
              value={formData.fullname}
              type="text"
              id="fullname"
              name="fullname"
              placeholder="Full Name"
              className="py-2 px-1 rounded-md text-black bg-white border-2 border-black"
              required
            />
          </div>
          <div className="flex flex-col md:w-[85%]">
            <label htmlFor="email">Email</label>
            <input
              onChange={textboxvaluechange}
              value={formData.email}
              type="text"
              id="email"
              name="email"
              placeholder="Email"
              className="border-2 border-black py-2 rounded-md px-3 text-black"
              required
            />
          </div>
          <div className="md:flex md:flex-row gap-2 flex flex-col">
            <div className="flex flex-col gap-1 relative">
              <label htmlFor="password">Password</label>
              <input
                onChange={textboxvaluechange}
                value={formData.password}
                type={`${showpassword ? "text" : "password"}`}
                id="password"
                name="password"
                placeholder="Password"
                className="px-1 border-2 border-black py-2 rounded-md text-black"
                required
              />
              <FaEye
                onClick={() => setshowpassword(false)}
                className={`${showpassword ? "visible" : "invisible"} absolute text-lg top-11 right-2`}
              />
              <FaEyeSlash
                onClick={() => setshowpassword(true)}
                className={`${showpassword ? "invisible" : "visible"} absolute text-lg top-11 right-2`}
              />
            </div>
            <div className="flex flex-col gap-1 relative">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                onChange={textboxvaluechange}
                value={formData.confirmPassword}
                type={`${showconfirmpassword ? "text" : "password"}`}
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
                className="border-2 border-black py-2 rounded-md text-black px-1"
                required
              />
              <FaEye
                onClick={() => setshowconfirmpassword(false)}
                className={`${showconfirmpassword ? "visible" : "invisible"} absolute text-lg top-11 right-2`}
              />
              <FaEyeSlash
                onClick={() => setshowconfirmpassword(true)}
                className={`${showconfirmpassword ? "invisible" : "visible"} absolute text-lg top-11 right-2`}
              />
            </div>
          </div>
          {error && <p className="text-red-500">{error}</p>} {/* Display error if any */}
          <button
            type="submit"
            className="bg-yellow-500 text-black text-xl font-mono font-medium px-4 py-2 rounded-md w-[85%] transition-all duration-200 hover:scale-95 hover:bg-yellow-400"
            disabled={loading} // Disable button while loading
          >
            {loading ? 'Signing Up...' : 'Join Us'}
          </button>
        </form>
      </div>
      <div className="w-[40%] relative md:visible invisible">
        <img src={imagebg} className="absolute -right-3 -top-40" alt="background" />
        <img src={imagesignup} className="absolute -top-36" alt="sign up" />
      </div>
    </div>
  );
};

export default SignUp;

// import React, { useState } from 'react';
// import imagebg from '../assets/imagebg.jpg';
// import imagesignup from '../assets/imagesignup.png';
// import { FaEye, FaEyeSlash } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';

// const SignUp = () => {
//   const navigate = useNavigate();
//   const [showpassword, setshowpassword] = useState(false);
//   const [showconfirmpassword, setshowconfirmpassword] = useState(false);
//   const [formData, setFormData] = useState({
//     fullname: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const textboxvaluechange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const submitHandler = (e) => {
//     e.preventDefault();
//     if (formData.password !== formData.confirmPassword) {
//       // toast.error('both passwords are not matched try again');
//       return;
//     }

//   };

//   return (
//     <div
//       className="md:h-[100vh] mx-auto w-11/12 max-w-[1260px] md:flex md:flex-row items-center justify-evenly md:mt-5 flex flex-col-reverse gap-36 bg-gradient-to-br from-purple-100 via-white to-blue-200"
//     >
//       <div className="w-[50%] flex flex-col gap-2">
//         <p className="font-bold font-mono text-lg text-black uppercase">
//           Your gateway to a smarter book shopping experience!!!
//         </p>
//         <form className="flex flex-col gap-5 font-mono font-semibold text-xl" onSubmit={submitHandler}>
//           <div className="flex flex-col md:w-[85%]">
//             <label htmlFor="fullname">Full Name</label>
//             <input
//               onChange={textboxvaluechange}
//               value={formData.fullname}
//               type="text"
//               id="fullname"
//               name="fullname"
//               placeholder="fullname"
//               className="py-2 px-1 rounded-md text-black bg-white border-2 border-black"
//               required
//             />
//           </div>
//           <div className="flex flex-col md:w-[85%]">
//             <label htmlFor="email">Email</label>
//             <input
//               onChange={textboxvaluechange}
//               value={formData.email}
//               type="text"
//               id="email"
//               name="email"
//               placeholder="email"
//               className="border-2 border-black py-2 rounded-md px-3 text-black"
//               required
//             />
//           </div>
//           <div className="md:flex md:flex-row gap-2 flex flex-col">
//             <div className="flex flex-col gap-1 relative">
//               <label htmlFor="password">Password</label>
//               <input
//                 onChange={textboxvaluechange}
//                 value={formData.password}
//                 type={`${showpassword ? "text" : "password"}`}
//                 id="password"
//                 name="password"
//                 placeholder="password"
//                 className="px-1 border-2 border-black py-2 rounded-md text-black"
//                 required
//               />
//               <FaEye
//                 onClick={() => setshowpassword(false)}
//                 className={`${showpassword ? "visible" : "invisible"} absolute text-lg top-11 right-2`}
//               />
//               <FaEyeSlash
//                 onClick={() => setshowpassword(true)}
//                 className={`${showpassword ? "invisible" : "visible"} absolute text-lg top-11 right-2`}
//               />
//             </div>
//             <div className="flex flex-col gap-1 relative">
//               <label htmlFor="confirmPassword">Confirm Password</label>
//               <input
//                 onChange={textboxvaluechange}
//                 value={formData.confirmPassword}
//                 type={`${showconfirmpassword ? "text" : "password"}`}
//                 id="confirmPassword"
//                 name="confirmPassword"
//                 placeholder="confirmPassword"
//                 className="border-2 border-black py-2 rounded-md text-black px-1"
//                 required
//               />
//               <FaEye
//                 onClick={() => setshowconfirmpassword(false)}
//                 className={`${showconfirmpassword ? "visible" : "invisible"} absolute text-lg top-11 right-2`}
//               />
//               <FaEyeSlash
//                 onClick={() => setshowconfirmpassword(true)}
//                 className={`${showconfirmpassword ? "invisible" : "visible"} absolute text-lg top-11 right-2`}
//               />
//             </div>
//           </div>
//           <button
//             type="Submit"
//             className="bg-yellow-500 text-black text-xl font-mono font-medium px-4 py-2 rounded-md w-[85%] transition-all duration-200 hover:scale-95 hover:bg-yellow-400"
//           >
//             Join Us
//           </button>
//         </form>
//       </div>
//       <div className="w-[40%] relative md:visible invisible">
//         <img src={imagebg} className="absolute -right-3 -top-40" alt="background" />
//         <img src={imagesignup} className="absolute -top-36" alt="sign up" />
//       </div>
//     </div>
//   );
// };

// export default SignUp;
