import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from '../slices/cartSlice'; // Import the addItem action

const Book = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.profile);
  const { bookid } = useParams(); // Extract bookid from the route
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const error = useSelector((state) => state.cart.error); // Access error from Redux store
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch book details by sending the id in the request body
    axios
      .post('http://localhost:4001/api/v1/book/getbookbyid', { bookId: bookid })
      .then((response) => {
        setBook(response.data.book);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching book details:', error);
        setLoading(false);
      });
  }, [bookid]);

  // Show the error alert if there's an error
  useEffect(() => {
    if (error) {
      alert(error); // Show alert with the error message
    }
  }, [error]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-gray-700">Loading...</div>;
  }

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-700">
        Book not found.
      </div>
    );
  }

  const handleAddToCart = (quantity) => {
    if (quantity <= book.quantity) {
      dispatch(addItem({ book, quantity }));
    } else {
      alert(`Cannot add more than ${book.quantity} items to the cart.`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-10 px-4">
      <div className="max-w-4xl mx-auto p-8">
        {/* Image - centered */}
        <div className="flex justify-center mb-6">
          <img
            src={`http://localhost:4001/${book.image}`}
            alt={book.title}
            className="w-full h-auto object-cover max-w-md"
          />
        </div>

        {/* Book Information */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-white mb-4">{book.title}</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Description</h2>
            <p className="text-base">{book.description}</p>
          </div>

          <div className="mb-6">
            <p className="text-2xl font-bold mb-2">Price: ₹{book.price}</p>
            <p className="text-xl font-bold mb-2">Category: {book.category}</p>
            <p className="text-xl font-bold mb-2">Quantity Available: {book.quantity}</p>
          </div>
        </div>

        {/* Add to Cart Button */}
        {
          token !== null && user.accountType === "Buyer" && (
            <div className="flex justify-center gap-4 mb-6">
              <button
                onClick={() => {
                  const quantity = prompt('Enter quantity:');
                  if (quantity) {
                    handleAddToCart(Number(quantity)); // Add item with the specified quantity
                  }
                }}
                className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-all duration-200"
              >
                Add to Cart
              </button>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default Book;

// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { useSelector } from 'react-redux';
// const Book = () => {
//   const {user} = useSelector((state) => state.profile);
//   const {token} = useSelector((state) => state.profile);
//   const { bookid } = useParams(); // Extract bookid from the route
//   const [book, setBook] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Fetch book details by sending the id in the request body
//     axios
//       .post('http://localhost:4001/api/v1/book/getbookbyid', { bookId: bookid })
//       .then((response) => {
//         setBook(response.data.book);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error('Error fetching book details:', error);
//         setLoading(false);
//       });
//   }, [bookid]);

//   if (loading) {
//     return <div className="min-h-screen flex items-center justify-center text-gray-700">Loading...</div>;
//   }

//   if (!book) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-gray-700">
//         Book not found.
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-10 px-4">
//       <div className="max-w-4xl mx-auto p-8">
//         {/* Image - centered */}
//         <div className="flex justify-center mb-6">
//           <img
//             src={`http://localhost:4001/${book.image}`}
//             alt={book.title}
//             className="w-full h-auto object-cover max-w-md" // Keeps image width in check
//           />
//         </div>

//         {/* Book Information - Bolder text */}
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-extrabold text-white mb-4">{book.title}</h1>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
//           {/* Left Column - Description */}
//           <div className="mb-6">
//             <h2 className="text-2xl font-bold mb-2">Description</h2>
//             <p className="text-base">{book.description}</p>
//           </div>

//           {/* Right Column - Price and Category */}
//           <div className="mb-6">
//             <p className="text-2xl font-bold mb-2">Price: ₹{book.price}</p>
//             <p className="text-xl font-bold mb-2">Category: {book.category}</p>
//             <p className="text-xl font-bold mb-2">Quantity Available: {book.quantity}</p>
//           </div>
//         </div>

//         {/* Buttons - moved below the book details */}
//        {
//          token !== null && user !== null && (
//               <div className="flex justify-center gap-4 mb-6">
//               <button
//                 onClick={() => alert('Book added to cart!')}
//                 className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-all duration-200"
//               >
//                 Add to Cart
//               </button>
//             </div>
//          )
//        }
//       </div>
//     </div>
//   );
// };

// export default Book;



// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const Book = () => {
//   const { bookid } = useParams(); // Extract bookid from the route
//   const [book, setBook] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Fetch book details by sending the id in the request body
//     axios
//       .post('http://localhost:4001/api/v1/book/getbookbyid', { bookId: bookid })
//       .then((response) => {
//         setBook(response.data.book);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error('Error fetching book details:', error);
//         setLoading(false);
//       });
//   }, [bookid]);

//   if (loading) {
//     return <div className="min-h-screen flex items-center justify-center text-gray-700">Loading...</div>;
//   }

//   if (!book) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-gray-700">
//         Book not found.
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-10 px-4">
//       <div className="max-w-4xl mx-auto p-8">
//         {/* Buttons - placed at the top */}
//         <div className="flex justify-center gap-4 mb-6">
//           <button
//             onClick={() => alert('Book added to cart!')}
//             className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-all duration-200"
//           >
//             Add to Cart
//           </button>
//           <button
//             onClick={() => alert('Proceed to Payment')}
//             className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-all duration-200"
//           >
//             Pay Now
//           </button>
//         </div>

//         {/* Flex Container for Image and Info */}
//         <div className="flex justify-between items-center gap-10">
//           {/* Book Image - on the left, with margin to the right */}
//           <div className="w-1/3">
//             <img
//               src={`http://localhost:4001/${book.image}`}
//               alt={book.title}
//               className="w-full h-auto object-cover"
//             />
//           </div>

//           {/* Book Information - on the right */}
//           <div className="w-2/3 text-white">
//             <h1 className="text-4xl font-extrabold mb-4">{book.title}</h1>
//             <p className="text-lg font-semibold mb-4">by {book.name}</p>

//             <div className="grid grid-cols-1 gap-6 mb-8">
//               {/* Description */}
//               <div>
//                 <h2 className="text-2xl font-bold mb-2">Description</h2>
//                 <p className="text-base">{book.description}</p>
//               </div>

//               {/* Price and Category */}
//               <div>
//                 <p className="text-2xl font-bold mb-2">Price: ₹{book.price}</p>
//                 <p className="text-xl font-bold mb-2">Category: {book.category}</p>
//                 <p className="text-xl font-bold mb-2">Quantity Available: {book.quantity}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Book;


// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const Book = () => {
//   const { bookid } = useParams(); // Extract bookid from the route
//   const [book, setBook] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Fetch book details by sending the id in the request body
//     axios
//       .post('http://localhost:4001/api/v1/book/getbookbyid', { bookId: bookid })
//       .then((response) => {
//         setBook(response.data.book);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error('Error fetching book details:', error);
//         setLoading(false);
//       });
//   }, [bookid]);

//   if (loading) {
//     return <div className="min-h-screen flex items-center justify-center text-gray-700">Loading...</div>;
//   }

//   if (!book) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-gray-700">
//         Book not found.
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-10 px-4">
//       <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden p-8">
//         {/* Image - centered */}
//         <div className="flex justify-center mb-6">
//           <img
//             src={`http://localhost:4001/${book.image}`}
//             alt={book.title}
//             className="w-full h-auto object-cover max-w-md" // Keeps image width in check
//           />
//         </div>

//         {/* Book Title */}
//         <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">{book.title}</h1>

//         {/* Book Information */}
//         <div className="space-y-6">
//           {/* Author */}
//           <p className="text-gray-600 text-lg text-center">by {book.name}</p>

//           {/* Description */}
//           <p className="text-gray-700 text-sm">{book.description}</p>

//           {/* Price & Category */}
//           <div className="flex justify-between text-sm text-gray-800 mt-4">
//             <p className="font-bold">Price: ₹{book.price}</p>
//             <p>Category: {book.category}</p>
//           </div>

//           {/* Quantity */}
//           <div className="mt-4 text-sm text-gray-800">
//             <p className="font-bold">Quantity Available: {book.quantity}</p>
//           </div>

//           {/* Add to Cart and Pay Now Buttons */}
//           <div className="flex gap-4 justify-center mt-8">
//             <button
//               onClick={() => alert('Book added to cart!')}
//               className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-all duration-200"
//             >
//               Add to Cart
//             </button>
//             <button
//               onClick={() => alert('Proceed to Payment')}
//               className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-all duration-200"
//             >
//               Pay Now
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Book;

// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const Book = () => {
//   const { bookid } = useParams(); // Extract bookid from the route
//   const [book, setBook] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Fetch book details by sending the id in the request body
//     axios
//       .post('http://localhost:4001/api/v1/book/getbookbyid', { bookId: bookid })
//       .then((response) => {
//         setBook(response.data.book);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error('Error fetching book details:', error);
//         setLoading(false);
//       });
//   }, [bookid]);

//   if (loading) {
//     return <div className="min-h-screen flex items-center justify-center text-gray-700">Loading...</div>;
//   }

//   if (!book) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-gray-700">
//         Book not found.
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-10 px-4">
//       <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
//         <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
//           {/* Book Image */}
//           <div className="w-full lg:w-1/3 flex justify-center">
//             <img
//               src={`http://localhost:4001/${book.image}`}
//               alt={book.title}
//               className="w-full h-auto object-cover max-h-96"
//             />
//           </div>

//           {/* Book Details */}
//           <div className="p-6 w-full lg:w-2/3">
//             <h1 className="text-3xl font-bold text-gray-800 mb-4">{book.title}</h1>
//             <p className="text-gray-600 text-lg mb-4">{book.name}</p>
//             <p className="text-gray-700 text-sm mb-6">{book.description}</p>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
//               <div>
//                 <p className="text-gray-800 font-bold mb-2">Price: ₹{book.price}</p>
//                 <p className="text-gray-600 text-sm">Category: {book.category}</p>
//               </div>
//               <div>
//                 <p className="text-gray-800 font-bold mb-2">Quantity: {book.quantity}</p>
//               </div>
//             </div>

//             {/* Add to Cart Button */}
//             <div className="flex gap-4">
//               <button
//                 onClick={() => alert('Book added to cart!')}
//                 className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-all duration-200"
//               >
//                 Add to Cart
//               </button>
//               <button
//                 onClick={() => alert('Proceed to Payment')}
//                 className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-all duration-200"
//               >
//                 Pay Now
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Book;

// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const Book = () => {
//   const { bookid } = useParams(); // Extract bookid from the route
//   const [book, setBook] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Fetch book details by sending the id in the request body
//     axios
//       .post('http://localhost:4001/api/v1/book/getbookbyid', { bookId: bookid })
//       .then((response) => {
//         setBook(response.data.book);
//         setLoading(false);
//       })
//       .catch((error) => {
//         // console.error('Error fetching book details:', error);
//         setLoading(false);
//       });
//   }, [bookid]);

//   if (loading) {
//     return <div className="min-h-screen flex items-center justify-center text-gray-700">Loading...</div>;
//   }

//   if (!book) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-gray-700">
//         Book not found.
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-10 px-4">
//       <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
//         <div className="flex flex-col lg:flex-row">
//           {/* Book Image */}
//           <div className="w-full lg:w-1/3">
//             <img
//               src={`http://localhost:4001/${book.image}`}
//               alt={book.title}
//               className="w-full h-full object-cover"
//             />
//           </div>

//           {/* Book Details */}
//           <div className="p-6 w-full lg:w-2/3">
//             <h1 className="text-3xl font-bold text-gray-800 mb-4">{book.title}</h1>
//             <p className="text-gray-600 text-lg mb-4">by {book.name}</p>
//             <p className="text-gray-700 text-sm mb-6">{book.description}</p>
//             <div className="mb-6">
//               <p className="text-gray-800 font-bold mb-2">Price: ₹{book.price}</p>
//               <p className="text-gray-600 text-sm">Category: {book.category}</p>
//             </div>
//             {/* Add to Cart Button */}
//             <button
//               onClick={() => alert('Book added to cart!')}
//               className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-all duration-200"
//             >
//               Add to Cart
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Book;
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const Book = () => {
//   const { bookid } = useParams(); // Extract bookid from the route
//   const [book, setBook] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Fetch book details by sending the id in the request body
//     axios
//       .post('http://localhost:4001/api/v1/book/getbookbyid', { bookId: bookid })
//       .then((response) => {
//         setBook(response.data.book);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error('Error fetching book details:', error);
//         setLoading(false);
//       });
//   }, [bookid]);

//   if (loading) {
//     return <div className="min-h-screen flex items-center justify-center text-gray-700">Loading...</div>;
//   }

//   if (!book) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-gray-700">
//         Book not found.
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-10 px-4">
//       <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden p-6 space-y-6">
//         {/* Book Title */}
//         <h1 className="text-4xl font-extrabold text-gray-800 text-center">{book.title}</h1>

//         <div className="flex flex-col lg:flex-row gap-6">
//           {/* Book Image */}
//           <div className="w-full lg:w-1/3">
//             <img
//               src={`http://localhost:4001/${book.image}`}
//               alt={book.title}
//               className="w-full h-80 object-cover rounded-lg shadow-md"
//             />
//           </div>

//           {/* Book Details */}
//           <div className="w-full lg:w-2/3 flex flex-col justify-between space-y-4">
//             {/* Description */}
//             <p className="text-gray-700 text-lg leading-relaxed">{book.description}</p>

//             <div className="flex flex-col sm:flex-row justify-between gap-4">
//               {/* Other Details */}
//               <div>
//                 <p className="text-gray-800 font-bold text-lg mb-2">Author: {book.name}</p>
//                 <p className="text-gray-800 font-bold text-lg">Price: ₹{book.price}</p>
//                 <p className="text-gray-600 text-sm">Category: {book.category}</p>
//                 <p className="text-gray-600 text-sm">Quantity Available: {book.quantity}</p>
//               </div>

//               {/* Action Buttons */}
//               <div className="flex flex-col gap-4">
//                 <button
//                   onClick={() => alert('Book added to cart!')}
//                   className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-all duration-200"
//                 >
//                   Add to Cart
//                 </button>
//                 <button
//                   onClick={() => alert('Proceeding to payment!')}
//                   className="bg-pink-600 text-white py-2 px-4 rounded-md hover:bg-pink-700 transition-all duration-200"
//                 >
//                   Pay Now
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Book;
