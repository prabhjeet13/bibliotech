import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setUser } from '../slices/profileSlice';
const AddBook = () => {
  const navigate = useNavigate();
  const {token} = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    ISBN: '',
    name: '',
    price: '',
    category: '',
    description: '',
    title: '',
    quantity: '',
    image: null,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      image: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const formDataToSend = new FormData();
    for (const key in formData) {
      if (key === 'image') {
        formDataToSend.append('file', formData[key]);
      } else {
        formDataToSend.append(key, formData[key]);
      }
    }

    formDataToSend.append('token', token); 

    try {
      const response = await axios.post('http://localhost:4001/api/v1/book/storeBook',formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        alert('Book added successfully!');
        dispatch(setUser(response.data.userDetails));

        // Save user data to localStorage
        localStorage.setItem('user', JSON.stringify(response.data.userDetails));
        navigate('/myaddbooks');
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error adding book:', error);
      alert('Failed to add book. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-green-500 p-5">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Add A Book!!!</h1>
        <form onSubmit={handleSubmit} className="flex flex-wrap">
          {/* Left Section */}
          <div className="w-full md:w-1/2 px-4">
            <div className="mb-4">
              <label htmlFor="ISBN" className="block text-sm font-semibold text-gray-700">ISBN:</label>
              <input
                type="text"
                name="ISBN"
                value={formData.ISBN}
                onChange={handleChange}
                required
                className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700">Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="price" className="block text-sm font-semibold text-gray-700">Price:</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="category" className="block text-sm font-semibold text-gray-700">Category:</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="w-full md:w-1/2 px-4">
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-semibold text-gray-700">Description:</label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-semibold text-gray-700">Title:</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="quantity" className="block text-sm font-semibold text-gray-700">Quantity:</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
                className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="image" className="block text-sm font-semibold text-gray-700">Image:</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
                required
                className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="w-full px-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full p-3 bg-blue-500 text-white text-lg font-semibold rounded-lg focus:outline-none hover:bg-blue-600 disabled:bg-gray-400"
            >
              {loading ? 'Adding Book...' : 'Add Book'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBook;

// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const AddBook = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     ISBN: '',
//     name: '',
//     price: '',
//     category: '',
//     description: '',
//     title: '',
//     quantity: '',
//     image: null, // To store the selected image
//   });
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setFormData((prevData) => ({
//       ...prevData,
//       image: file, // Store the image file
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setLoading(true);

//     const formDataToSend = new FormData();
    
//     for (const key in formData) {
//       if (key === 'image') {
//         formDataToSend.append(key, formData[key]);
//       } else {
//         formDataToSend.append(key, formData[key]);
//       }
//     }

//     try {
//       const response = await axios.post('http://localhost:4001/api/v1/books', formDataToSend, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       if (response.data.success) {
//         alert('Book added successfully!');
//         navigate('/dashboard');
//       } else {
//         alert(response.data.message);
//       }
//     } catch (error) {
//       console.error('Error adding book:', error);
//       alert('Failed to add book. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-green-500 p-5">
//       <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg">
//         <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Add A Book!!!</h1>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label htmlFor="ISBN" className="block text-sm font-semibold text-gray-700">ISBN:</label>
//             <input
//               type="text"
//               name="ISBN"
//               value={formData.ISBN}
//               onChange={handleChange}
//               required
//               className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div className="mb-4">
//             <label htmlFor="name" className="block text-sm font-semibold text-gray-700">Name:</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//               className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div className="mb-4">
//             <label htmlFor="price" className="block text-sm font-semibold text-gray-700">Price:</label>
//             <input
//               type="number"
//               name="price"
//               value={formData.price}
//               onChange={handleChange}
//               required
//               className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div className="mb-4">
//             <label htmlFor="category" className="block text-sm font-semibold text-gray-700">Category:</label>
//             <input
//               type="text"
//               name="category"
//               value={formData.category}
//               onChange={handleChange}
//               required
//               className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div className="mb-4">
//             <label htmlFor="description" className="block text-sm font-semibold text-gray-700">Description:</label>
//             <input
//               type="text"
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               required
//               className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div className="mb-4">
//             <label htmlFor="title" className="block text-sm font-semibold text-gray-700">Title:</label>
//             <input
//               type="text"
//               name="title"
//               value={formData.title}
//               onChange={handleChange}
//               required
//               className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div className="mb-4">
//             <label htmlFor="quantity" className="block text-sm font-semibold text-gray-700">Quantity:</label>
//             <input
//               type="number"
//               name="quantity"
//               value={formData.quantity}
//               onChange={handleChange}
//               required
//               className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div className="mb-4">
//             <label htmlFor="image" className="block text-sm font-semibold text-gray-700">Image:</label>
//             <input
//               type="file"
//               name="image"
//               accept="image/*"
//               onChange={handleFileChange}
//               required
//               className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full p-3 bg-blue-500 text-white text-lg font-semibold rounded-lg focus:outline-none hover:bg-blue-600 disabled:bg-gray-400"
//           >
//             {loading ? 'Adding Book...' : 'Add Book'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddBook;
