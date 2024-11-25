import React from 'react';
import { useSelector } from 'react-redux';

const MyStoredBooks = () => {
  const { user } = useSelector((state) => state.profile);

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500 p-5">
      <h1 className="text-4xl font-bold text-center text-white mb-8">
        My Stored Books
      </h1>

      {user?.books?.length === 0 ? (
        <p className="text-center text-white text-lg">
          You have not stored any books yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center">
          {user.books.map((book) => (
            <div
              key={book.ISBN}
              className="bg-white rounded-lg shadow-lg p-6 hover:scale-105 transition-transform duration-300 w-full max-w-sm"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                {book.title}
              </h2>
              <p className="text-gray-600 mb-4">{book.description}</p>
              <div className="text-sm">
                <p className="font-semibold text-gray-700">
                  <span className="font-bold">Category:</span> {book.category}
                </p>
                <p className="font-semibold text-gray-700">
                  <span className="font-bold">Price:</span> ₹{book.price}
                </p>
                <p className="font-semibold text-gray-700">
                  <span className="font-bold">Quantity:</span> {book.quantity}
                </p>
                <p className="font-semibold text-gray-700">
                  <span className="font-bold">ISBN:</span> {book.ISBN}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyStoredBooks;

// import React from 'react';
// import { useSelector } from 'react-redux';

// const MyStoredBooks = () => {
//   const { user } = useSelector((state) => state.profile);

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500 p-5">
//       <h1 className="text-4xl font-bold text-center text-white mb-8">
//         My Stored Books
//       </h1>

//       {user?.books?.length === 0 ? (
//         <p className="text-center text-white text-lg">
//           You have not stored any books yet.
//         </p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {user.books.map((book) => (
//             <div
//               key={book.ISBN}
//               className="bg-white rounded-lg shadow-lg p-6 hover:scale-105 transition-transform duration-300"
//             >
//               <h2 className="text-xl font-bold text-gray-800 mb-2">
//                 {book.title}
//               </h2>
//               <p className="text-gray-600 mb-4">{book.description}</p>
//               <div className="text-sm">
//                 <p className="font-semibold text-gray-700">
//                   <span className="font-bold">Category:</span> {book.category}
//                 </p>
//                 <p className="font-semibold text-gray-700">
//                   <span className="font-bold">Price:</span> ₹{book.price}
//                 </p>
//                 <p className="font-semibold text-gray-700">
//                   <span className="font-bold">Quantity:</span> {book.quantity}
//                 </p>
//                 <p className="font-semibold text-gray-700">
//                   <span className="font-bold">ISBN:</span> {book.ISBN}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyStoredBooks;

// import React from 'react';
// import { useSelector } from 'react-redux';

// const MyStoredBooks = () => {
//   const { user } = useSelector((state) => state.profile);

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500 p-5">
//       <h1 className="text-4xl font-bold text-center text-white mb-8">
//         My Stored Books
//       </h1>

//       {user?.books?.length === 0 ? (
//         <p className="text-center text-white text-lg">
//           You have not stored any books yet.
//         </p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {user.books.map((book) => (
//             <div
//               key={book.ISBN}
//               className="bg-white rounded-lg shadow-lg p-6 hover:scale-105 transition-transform duration-300"
//             >
//               <h2 className="text-xl font-bold text-gray-800 mb-2">
//                 {book.title}
//               </h2>
//               <p className="text-gray-600 mb-4">{book.description}</p>
//               <div className="text-sm">
//                 <p className="font-semibold text-gray-700">
//                   <span className="font-bold">Category:</span> {book.category}
//                 </p>
//                 <p className="font-semibold text-gray-700">
//                   <span className="font-bold">Price:</span> ₹{book.price}
//                 </p>
//                 <p className="font-semibold text-gray-700">
//                   <span className="font-bold">Quantity:</span> {book.quantity}
//                 </p>
//                 <p className="font-semibold text-gray-700">
//                   <span className="font-bold">ISBN:</span> {book.ISBN}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyStoredBooks;

// import React from 'react';
// import { useSelector } from 'react-redux';

// const MyStoredBooks = () => {
//   const { user } = useSelector((state) => state.profile);

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500 p-5">
//       <h1 className="text-4xl font-bold text-center text-white mb-8">
//         My Added Books
//       </h1>

//       {user?.books?.length === 0 ? (
//         <p className="text-center text-white text-lg">
//           You have not stored any books yet.
//         </p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {user.books.map((book) => (
//             <div
//               key={book.ISBN}
//               className="bg-white shadow-md rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
//             >
//               <img
//                 src={`http://localhost:4001/${book.image}`} // Assuming image path is relative to backend
//                 alt={book.title}
//                 className="w-full h-48 object-cover"
//               />
//               <div className="p-4">
//                 <h2 className="text-2xl font-bold text-gray-800">
//                   {book.title}
//                 </h2>
//                 <p className="text-gray-600 mt-2">{book.description}</p>
//                 <div className="mt-4">
//                   <p className="text-sm font-semibold text-gray-700">
//                     <span className="font-bold">Category:</span> {book.category}
//                   </p>
//                   <p className="text-sm font-semibold text-gray-700">
//                     <span className="font-bold">Price:</span> ₹{book.price}
//                   </p>
//                   <p className="text-sm font-semibold text-gray-700">
//                     <span className="font-bold">Quantity:</span> {book.quantity}
//                   </p>
//                   <p className="text-sm font-semibold text-gray-700">
//                     <span className="font-bold">ISBN:</span> {book.ISBN}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyStoredBooks;
