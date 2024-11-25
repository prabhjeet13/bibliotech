import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Books = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch books from the database
    axios.get('http://localhost:4001/api/v1/book/getallbooks')
      .then(response => setBooks(response.data.books))
      .catch(error => console.error('Error fetching books:', error));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-10 px-4">
      <div className="mx-auto max-w-[1260px] text-center">
        <h1 className="text-4xl font-extrabold text-white mb-8">Explore Our Book Collection</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {books.length > 0 ? (
            books.map(book => (
              <div
                key={book.ISBN}
                onClick={() => navigate(`/books/book/${book._id}`)}
                className="bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform duration-200 cursor-pointer"
              >
                {/* Larger image size */}
                <img
                  src={`http://localhost:4001/${book.image}`}
                  alt={book.title}
                  className="w-full h-60 object-cover" // Increased height of the image
                />
                <div className="p-6"> {/* Increased padding for card content */}
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">{book.title}</h2> {/* Bigger font for title */}
                  <p className="text-gray-500 mb-2">by {book.name}</p>
                  <p className="text-gray-700 text-sm mb-4">{book.description}</p>
                  <p className="text-gray-800 font-bold mb-2">Price: ₹{book.price}</p>
                  <p className="text-gray-600 text-sm">Category: {book.category}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-white">No books available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Books;
