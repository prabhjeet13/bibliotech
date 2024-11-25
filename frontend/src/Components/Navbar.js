import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setToken, setUser } from '../slices/profileSlice';
import { FaShoppingCart } from 'react-icons/fa'; // Cart icon from react-icons

const Navbar = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    localStorage.clear();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch(setToken(null));
    dispatch(setUser(null));
    navigate('/');
  };

  return (
    <div className='bg-gradient-to-r from-purple-300 via-pink-200 to-orange-300 md:h-14 md:py-10 mx-auto w-11/12 max-w-[1260px] md:flex md:flex-row md:gap-32 md:items-center md:justify-evenly border-b-2 border-blue-950 flex flex-col items-center mt-2 gap-2 h-40 shadow-md shadow-gray-400'>
      <Link to='/'>
        <p className='text-white bg-black shadow-md shadow-black p-2 duration-200 transition-all hover:scale-90 font-mono font-bold text-2xl py-1'>
          BIBLIOTECH
        </p>
      </Link>
      <div>
        <ul className='flex flex-row gap-5'>
          <Link to='/about'>
            <li className='text-white bg-black shadow-md shadow-black px-5 py-2 duration-200 transition-all hover:scale-90 text-lg font-bold font-mono'>
              about
            </li>
          </Link>

          <Link to='/contact'>
            <li className='text-white bg-black shadow-md shadow-black px-5 py-2 duration-200 transition-all hover:scale-90 text-lg font-bold font-mono'>
              contact
            </li>
          </Link>
          <Link to='/books'>
            <li className='text-white bg-black shadow-md shadow-black px-5 py-2 duration-200 transition-all hover:scale-90 text-lg font-bold font-mono'>
              books
            </li>
          </Link>
        </ul>
      </div>

      {token === null && (
        <div className='flex flex-row gap-2'>
          <Link to='/signin'>
            <button className='rounded-full py-1 px-4 bg-blue-800 text-lime-50 shadow-sm shadow-black h-max font-semibold transition-all duration-200 hover:bg-blue-900 hover:scale-95'>
              Sign In
            </button>
          </Link>

          <Link to='/signup'>
            <button className='rounded-full px-4 py-1 bg-blue-800 text-lime-50 shadow-sm shadow-black h-max font-semibold transition-all duration-200 hover:bg-blue-900 hover:scale-95'>
              Sign Up
            </button>
          </Link>
        </div>
      )}

      {token !== null && (
        <>
          <div className='flex items-center gap-4'>
            {/* Cart Icon */}
            { user.accountType == "Buyer" && (
            <Link to='/cart' className='relative'>
              <FaShoppingCart className='text-3xl text-black hover:text-blue-800 transition duration-200' />
              {totalItems > 0 && (
                <span className='absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full'>
                  {totalItems}
                </span>
              )}
            </Link>
            )}

            {/* Logout Button */}
            <div className='group z-10'>
              <button className='rounded-full py-1 px-4 bg-blue-800 text-lime-50 shadow-sm shadow-black h-max font-semibold transition-all duration-200 hover:bg-blue-900 hover:scale-95 z-10 md:mt-28 p-1'>
                { user.fullname[0] }
              </button>
              <div className='invisible w-36 bg-white text-black border-2 border-black text-xl p-4 flex flex-col gap-3 duration-200 transition-all group-hover:visible z-20'>
                <Link to={'/dashboard'}>
                  <div className='border-b-4 cursor-pointer'>Dashboard</div>
                </Link>
                <div
                  onClick={logoutHandler}
                  className='border-b-4 cursor-pointer text-black'
                >
                  Logout
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;

// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux'
// import { setToken,setUser } from '../slices/profileSlice';
// const Navbar = () => {
//    const {user} = useSelector((state) => state.profile);
//    const {token} = useSelector((state) => state.profile);
//    const {totalItems} = useSelector((state) => state.cart);
//    const navigate = useNavigate();
//    const dispatch = useDispatch();
//    const logoutHandler = () => {
//      localStorage.clear();
//      localStorage.removeItem("token");
//      localStorage.removeItem("user");
//      dispatch(setToken(null));
//      dispatch(setUser(null));
//      navigate("/");
//    }
//   return (
//     <div className='bg-gradient-to-r from-purple-300 via-pink-200 to-orange-300 md:h-14 md:py-10 mx-auto w-11/12 max-w-[1260px] md:flex md:flex-row md:gap-32 md:items-center md:justify-evenly border-b-2 border-blue-950 flex flex-col items-center mt-2 gap-2 h-40 shadow-md shadow-gray-400'>
//       <Link to='/'>
//         <p className='text-white bg-black shadow-md shadow-black p-2 duration-200 transition-all hover:scale-90 font-mono font-bold text-2xl py-1'>
//           BIBLIOTECH
//         </p>
//       </Link>
//       <div>
//         <ul className='flex flex-row gap-5'>
//           <Link to='/about'>
//             <li className='text-white bg-black shadow-md shadow-black px-5 py-2 duration-200 transition-all hover:scale-90 text-lg font-bold font-mono'>
//               about
//             </li>
//           </Link>

//           <Link to='/contact'>
//             <li className='text-white bg-black shadow-md shadow-black px-5 py-2 duration-200 transition-all hover:scale-90 text-lg font-bold font-mono'>
//               contact
//             </li>
//           </Link>
//           <Link to='/books'>
//             <li className='text-white bg-black shadow-md shadow-black px-5 py-2 duration-200 transition-all hover:scale-90 text-lg font-bold font-mono'>
//               books
//             </li>
//           </Link>
//         </ul>
//       </div>

//       {
//          token === null && (
//             <div className='flex flex-row gap-2'>
//             <Link to = "/signin">
//               <button className='rounded-full py-1 px-4 bg-blue-800 text-lime-50  shadow-sm shadow-black h-max font-semibold transition-all duration-200 hover:bg-blue-900 hover:scale-95'>
//                  Sign In
//               </button> </Link>

//             <Link to = "/signup">
//              <button className='rounded-full px-4 py-1 bg-blue-800 text-lime-50  shadow-sm shadow-black h-max font-semibold transition-all duration-200 hover:bg-blue-900 hover:scale-95'>
//                  Sign Up
//              </button>
//             </Link>
//             </div>
//          )
//        }

//        {
//          token !== null && (
//             <>
//             <div className='group z-10'>
//   <button className='rounded-full py-1 px-4 bg-blue-800 text-lime-50 shadow-sm shadow-black h-max font-semibold transition-all duration-200 hover:bg-blue-900 hover:scale-95 z-10 md:mt-28 p-1 ml-10'>
//     Logout
//   </button>
//     <div className='invisible w-36 bg-white text-black border-2 border-black text-xl p-4 flex flex-col gap-3 duration-200 transition-all group-hover:visible z-20'>
//       <Link to={'/dashboard'}>
//         <div className='border-b-4 cursor-pointer'>Dashboard</div>
//       </Link>
//       <div onClick={logoutHandler} className='border-b-4 cursor-pointer text-black'>Logout</div>
//     </div>
// </div>
//              </>  
//          )
//        }
//     </div>
//   );
// };

// export default Navbar;
