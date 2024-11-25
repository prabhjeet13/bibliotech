import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const { user } = useSelector((state) => state.profile); // Access user state from Redux

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 py-10 px-6">
      {
        user && (
          <div className="max-w-4xl mx-auto p-8 rounded-lg shadow-xl bg-transparent">
            {/* User Image Section (Static or Profile Image) */}
            {/* User Information Section */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-extrabold text-white mb-4">Dashboard</h1>

              {/* User's Full Name */}
              <h2 className="text-3xl font-bold text-white mb-2">{user.fullname}</h2>

              {/* User's Email */}
              <p className="text-lg text-white mb-4">{user.email}</p>

              {/* User's Account Type */}
              <p className="text-lg font-semibold text-white mb-6">
                Account Type: <span className="font-bold">{user.accountType}</span>
              </p>
            </div>

            {/* Conditional Button for Admin */}
            {user.accountType === 'Admin' && (
              <div className="flex justify-center mt-8">
                <Link to="/add-book">
                  <button className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-200">
                    Add Book
                  </button>
                </Link>
              </div>
            )}
            {user.accountType === 'Admin' && (
              <div className="flex justify-center mt-8">
                <Link to="/myaddbooks">
                  <button className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-200">
                    My Add Books
                  </button>
                </Link>
              </div>
            )}
            {user.accountType === 'Buyer' && (
              <div className="flex justify-center mt-8">
                <Link to="/mypurchasedbooks">
                  <button className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-200">
                    My Purchased Books
                  </button>
                </Link>
              </div>
            )}
          </div>
        )
      }
    </div>
  );
};

export default Dashboard;


// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// const Dashboard = () => {
//   const { user } = useSelector((state) => state.profile); // Access user state from Redux

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 py-10 px-6">
//       <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-xl">
//         {/* User Information Section */}
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-800 mb-4">Dashboard</h1>

//           {/* User's Full Name */}
//           <h2 className="text-2xl font-semibold text-gray-700 mb-2">{user.fullname}</h2>

//           {/* User's Email */}
//           <p className="text-lg text-gray-600">{user.email}</p>

//           {/* User's Account Type */}
//           <p className="text-lg text-gray-600 mb-6">Account Type: {user.accountType}</p>
//         </div>

//         {/* Conditional Button for Admin */}
//         {user.accountType === 'Admin' && (
//           <div className="flex justify-center mt-8">
//             <Link to="/add-book">
//               <button className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-200">
//                 Add Book
//               </button>
//             </Link>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
