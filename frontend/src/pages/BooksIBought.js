import React from 'react'
import { useSelector } from 'react-redux';
const BooksIBought = () => {
  const { user } = useSelector((state) => state.profile);
  const seen = new Set();
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500 p-5">
      <h1 className="text-4xl font-bold text-center text-white mb-8">
        Purchase-History
      </h1>

      {user?.books?.length === 0 ? (
        <p className="text-center text-white text-lg">
          You have not purchase any books yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center">
          {  
            user.books.map((book) => {
            if(seen.has(book.ISBN))
            {
              return;
            }
            seen.add(book.ISBN);
            return ( 
            <div
              key={book.ISBN}
              className="bg-white rounded-lg shadow-lg p-6 hover:scale-105 transition-transform duration-300 w-full max-w-sm flex flex-col gap-5"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-2 gap-10">
                {book.title}
              </h2>
              <p className="text-gray-600 mb-4">{book.description}</p>
              <div className="text-sm">
                <p className="font-semibold text-gray-700">
                  <span className="font-bold">Category:</span> {book.category}
                </p>
                {/* <p className="font-semibold text-gray-700">
                  <span className="font-bold">Price:</span> ₹{book.price}
                </p> */}
                {/* <p className="font-semibold text-gray-700">
                  <span className="font-bold">Quantity:</span> {book.quantity}
                </p> */}
                <p className="font-semibold text-gray-700">
                  <span className="font-bold">ISBN:</span> {book.ISBN}
                </p>
              </div>
            </div>)
          })}
        </div>
      )}
    </div>
)};

export default BooksIBought