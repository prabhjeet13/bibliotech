import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, clearCart } from '../slices/cartSlice';
import jsPDF from 'jspdf';
import axios from 'axios';
import { setUser } from '../slices/profileSlice';
import { useNavigate } from 'react-router-dom';
const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, totalItems, totalPrice } = useSelector((state) => state.cart);
  const {token} = useSelector((state) => state.profile);
  const {user} = useSelector((state) => state.profile);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const handleRemove = (ISBN) => {
    dispatch(removeItem({ ISBN }));
  };

  const handlePayment = async(e) => {
    e.preventDefault();

    // Simulate validation
    const { cardNumber, expiryDate, cvv } = cardDetails;
    if (cardNumber.length !== 16 || expiryDate === '' || cvv.length !== 3) {
      alert('Invalid card details. Please try again.');
      return;
    }

    // Generate and download the invoice
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Invoice", 105, 20, null, null, "center");
    doc.setFontSize(12);
    doc.text('SellerName : BIBLIOTECH',20,40)
    doc.text(`Buyer Name : ${user.fullname}`,20,50)
    doc.text(`Total Items: ${totalItems}`, 20, 60);
    doc.text(`Total Price: ₹${totalPrice}`, 20, 70);

    doc.text("Items Purchased:", 20, 80);
    items.forEach((item, index) => {
      doc.text(`${index + 1}. ${item.title} (x${item.quantity}) - ₹${item.price * item.quantity}`, 20, 90 + index * 10);
    });

    doc.text("Payment Method: Debit Card", 20, 120);
    doc.text("Thank you for your purchase!", 105, 140, null, null, "center");

    doc.save("invoice.pdf");

    // send to database server
    const orderData = {
            items,
            token
    }

    const response = await axios.post('http://localhost:4001/api/v1/book/order',orderData)
    if (response.data.success) {
        // Storing the token and user data in Redux
        dispatch(setUser(response.data.userDetails));
        // Save user data to localStorage
        localStorage.setItem('user', JSON.stringify(response.data.userDetails));
    }    

    // Clear the cart
    dispatch(clearCart());
    alert('Payment Successful! Your invoice has been downloaded.');
    setShowPaymentForm(false); // Hide the payment form
    navigate('/mypurchasedbooks');
  };

  const handleInputChange = (e) => {
    setCardDetails({
      ...cardDetails,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 via-purple-900 to-black py-10 px-4">
      <div className="max-w-4xl mx-auto p-6 rounded-lg shadow-md backdrop-blur-md bg-gradient-to-r from-gray-800/30 to-gray-900/20 border border-gray-700">
        <h1 className="text-4xl font-bold text-center text-white mb-6">Your Cart</h1>
        {items.length === 0 ? (
          <div className="text-center text-gray-300 text-xl">Your cart is empty.</div>
        ) : (
          <>
            <ul className="divide-y divide-gray-600">
              {items.map((item) => (
                <li key={item.ISBN} className="py-4">
                  <div className="flex justify-between items-center text-white">
                    <div>
                      <h2 className="text-lg font-bold">{item.title}</h2>
                      <p>Quantity: {item.quantity}</p>
                      <p>Price: ₹{item.price * item.quantity}</p>
                    </div>
                    <button
                      onClick={() => handleRemove(item.ISBN)}
                      className="bg-red-600 text-white py-1 px-3 rounded-md hover:bg-red-700 transition-all duration-200"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 text-white">
              <p className="text-xl font-bold">Total Items: {totalItems}</p>
              <p className="text-xl font-bold">Total Price: ₹{totalPrice}</p>
            </div>

            {!showPaymentForm && (
              <button
                onClick={() => setShowPaymentForm(true)}
                className="mt-6 w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-all duration-200"
              >
                Buy Now
              </button>
            )}
          </>
        )}
      </div>

      {/* Payment Modal */}
      {showPaymentForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="relative bg-gray-800 text-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <button
              onClick={() => setShowPaymentForm(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-6">BIBLIOTECH GATEWAY</h2>
            <h2 className="text-2xl font-bold mb-6">Enter Card Details</h2>
            <form onSubmit={handlePayment}>
              <div className="mb-4">
                <label className="block text-gray-300 mb-2">Card Number</label>
                <input
                  type="text"
                  name="cardNumber"
                  maxLength="16"
                  value={cardDetails.cardNumber}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded-md bg-gray-700 text-white"
                  placeholder="1234 5678 9101 1121"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-300 mb-2">Expiry Date</label>
                <input
                  type="month"
                  name="expiryDate"
                  value={cardDetails.expiryDate}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded-md bg-gray-700 text-white"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-300 mb-2">CVV</label>
                <input
                  type="text"
                  name="cvv"
                  maxLength="3"
                  value={cardDetails.cvv}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded-md bg-gray-700 text-white"
                  placeholder="123"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-all duration-200"
              >
                Complete Payment
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

// import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { removeItem, clearCart } from '../slices/cartSlice';
// import jsPDF from 'jspdf';

// const Cart = () => {
//   const dispatch = useDispatch();
//   const { items, totalItems, totalPrice } = useSelector((state) => state.cart);

//   const [showPaymentForm, setShowPaymentForm] = useState(false);
//   const [cardDetails, setCardDetails] = useState({
//     cardNumber: '',
//     expiryDate: '',
//     cvv: '',
//   });

//   const handleRemove = (ISBN) => {
//     dispatch(removeItem({ ISBN }));
//   };

//   const handlePayment = (e) => {
//     e.preventDefault();

//     // Simulate validation
//     const { cardNumber, expiryDate, cvv } = cardDetails;
//     if (cardNumber.length !== 16 || expiryDate === '' || cvv.length !== 3) {
//       alert('Invalid card details. Please try again.');
//       return;
//     }

//     // Generate and download the invoice
//     const doc = new jsPDF();
//     doc.setFontSize(18);
//     doc.text("Invoice", 105, 20, null, null, "center");

//     doc.setFontSize(12);
//     doc.text(`Total Items: ${totalItems}`, 20, 40);
//     doc.text(`Total Price: ₹${totalPrice}`, 20, 50);

//     doc.text("Items Purchased:", 20, 70);
//     items.forEach((item, index) => {
//       doc.text(`${index + 1}. ${item.title} (x${item.quantity}) - ₹${item.price * item.quantity}`, 20, 80 + index * 10);
//     });

//     doc.text("Payment Method: Fake Debit Card", 20, 120);
//     doc.text("Thank you for your purchase!", 105, 140, null, null, "center");

//     doc.save("invoice.pdf");

//     // Clear the cart
//     dispatch(clearCart());
//     alert('Payment Successful! Your invoice has been downloaded.');
//     setShowPaymentForm(false); // Hide the payment form
//   };

//   const handleInputChange = (e) => {
//     setCardDetails({
//       ...cardDetails,
//       [e.target.name]: e.target.value,
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-blue-900 via-purple-900 to-black py-10 px-4">
//       <div className="max-w-4xl mx-auto p-6 rounded-lg shadow-md backdrop-blur-md bg-gradient-to-r from-gray-800/30 to-gray-900/20 border border-gray-700">
//         <h1 className="text-4xl font-bold text-center text-white mb-6">Your Cart</h1>
//         {items.length === 0 ? (
//           <div className="text-center text-gray-300 text-xl">Your cart is empty.</div>
//         ) : (
//           <>
//             <ul className="divide-y divide-gray-600">
//               {items.map((item) => (
//                 <li key={item.ISBN} className="py-4">
//                   <div className="flex justify-between items-center text-white">
//                     <div>
//                       <h2 className="text-lg font-bold">{item.title}</h2>
//                       <p>Quantity: {item.quantity}</p>
//                       <p>Price: ₹{item.price * item.quantity}</p>
//                     </div>
//                     <button
//                       onClick={() => handleRemove(item.ISBN)}
//                       className="bg-red-600 text-white py-1 px-3 rounded-md hover:bg-red-700 transition-all duration-200"
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 </li>
//               ))}
//             </ul>

//             <div className="mt-6 text-white">
//               <p className="text-xl font-bold">Total Items: {totalItems}</p>
//               <p className="text-xl font-bold">Total Price: ₹{totalPrice}</p>
//             </div>

//             {!showPaymentForm && (
//               <button
//                 onClick={() => setShowPaymentForm(true)}
//                 className="mt-6 w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-all duration-200"
//               >
//                 Buy Now
//               </button>
//             )}

//             {showPaymentForm && (
//               <form onSubmit={handlePayment} className="mt-6 bg-gray-800 p-6 rounded-md">
//                 <h2 className="text-xl font-bold text-white mb-4">BIBLIOTECH GATEWAY</h2>
//                 <h2 className="text-xl font-bold text-white mb-4">Enter Card Details</h2>
//                 <div className="mb-4">
//                   <label className="block text-gray-300 mb-2">Card Number</label>
//                   <input
//                     type="text"
//                     name="cardNumber"
//                     maxLength="16"
//                     value={cardDetails.cardNumber}
//                     onChange={handleInputChange}
//                     className="w-full p-2 rounded-md bg-gray-700 text-white"
//                     placeholder="1234 5678 9101 1121"
//                     required
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-gray-300 mb-2">Expiry Date</label>
//                   <input
//                     type="month"
//                     name="expiryDate"
//                     value={cardDetails.expiryDate}
//                     onChange={handleInputChange}
//                     className="w-full p-2 rounded-md bg-gray-700 text-white"
//                     required
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-gray-300 mb-2">CVV</label>
//                   <input
//                     type="text"
//                     name="cvv"
//                     maxLength="3"
//                     value={cardDetails.cvv}
//                     onChange={handleInputChange}
//                     className="w-full p-2 rounded-md bg-gray-700 text-white"
//                     placeholder="123"
//                     required
//                   />
//                 </div>
//                 <button
//                   type="submit"
//                   className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-all duration-200"
//                 >
//                   Complete Payment
//                 </button>
//               </form>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Cart;

// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { removeItem } from '../slices/cartSlice'; // Adjust the path as needed

// const Cart = () => {
//   const dispatch = useDispatch();
//   const { items, totalItems, totalPrice } = useSelector((state) => state.cart);

//   const handleRemove = (ISBN) => {
//     dispatch(removeItem({ ISBN }));
//   };

//   const handleBuyNow = () => {
//     if (items.length === 0) {
//       alert("Your cart is empty! Add items to proceed.");
//       return;
//     }
//     alert("Proceeding to checkout...");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-blue-900 via-purple-900 to-black py-10 px-4">
//       <div className="max-w-4xl mx-auto p-6 rounded-lg shadow-md backdrop-blur-md bg-gradient-to-r from-gray-800/30 to-gray-900/20 border border-gray-700">
//         <h1 className="text-4xl font-bold text-center text-white mb-6">Your Cart</h1>
//         {items.length === 0 ? (
//           <div className="text-center text-gray-300 text-xl">Your cart is empty.</div>
//         ) : (
//           <>
//             <ul className="divide-y divide-gray-600">
//               {items.map((item) => (
//                 <li key={item.ISBN} className="py-4 flex justify-between items-center">
//                   <div>
//                     <h2 className="text-2xl font-semibold text-white">{item.title}</h2>
//                     <p className="text-gray-300">Price: ₹{item.price}</p>
//                     <p className="text-gray-300">Quantity: {item.quantity}</p>
//                     <p className="text-gray-300">Subtotal: ₹{item.price * item.quantity}</p>
//                   </div>
//                   <button
//                     onClick={() => handleRemove(item.ISBN)}
//                     className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-all duration-200"
//                   >
//                     Remove from Cart
//                   </button>
//                 </li>
//               ))}
//             </ul>
//             <div className="mt-6">
//               <div className="flex justify-between text-lg font-bold text-gray-300">
//                 <span>Total Items:</span>
//                 <span>{totalItems}</span>
//               </div>
//               <div className="flex justify-between text-lg font-bold text-gray-300 mt-2">
//                 <span>Total Price:</span>
//                 <span>₹{totalPrice}</span>
//               </div>
//             </div>
//             <div className="flex justify-end mt-8">
//               <button
//                 onClick={handleBuyNow}
//                 className="bg-green-600 text-white py-3 px-6 rounded-md hover:bg-green-700 transition-all duration-200 text-lg font-bold shadow-lg"
//               >
//                 Buy Now
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Cart;

// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { removeItem } from '../slices/cartSlice'; // Adjust the path as needed

// const Cart = () => {
//   const dispatch = useDispatch();
//   const { items, totalItems, totalPrice } = useSelector((state) => state.cart);

//   const handleRemove = (ISBN) => {
//     dispatch(removeItem({ ISBN }));
//   };

//   const handleBuyNow = () => {
//     if (items.length === 0) {
//       alert("Your cart is empty! Add items to proceed.");
//       return;
//     }
//     // Replace this alert with your actual buy/checkout logic
//     alert("Proceeding to checkout...");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-10 px-4">
//       <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
//         <h1 className="text-3xl font-bold text-center mb-6">Your Cart</h1>
//         {items.length === 0 ? (
//           <div className="text-center text-gray-700">Your cart is empty.</div>
//         ) : (
//           <>
//             <ul className="divide-y divide-gray-300">
//               {items.map((item) => (
//                 <li key={item.ISBN} className="py-4 flex justify-between items-center">
//                   <div>
//                     <h2 className="text-xl font-semibold">{item.title}</h2>
//                     <p className="text-gray-600">Price: ₹{item.price}</p>
//                     <p className="text-gray-600">Quantity: {item.quantity}</p>
//                     <p className="text-gray-600">Subtotal: ₹{item.price * item.quantity}</p>
//                   </div>
//                   <button
//                     onClick={() => handleRemove(item.ISBN)}
//                     className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-all duration-200"
//                   >
//                     Remove from Cart
//                   </button>
//                 </li>
//               ))}
//             </ul>
//             <div className="mt-6">
//               <div className="flex justify-between text-lg font-bold">
//                 <span>Total Items:</span>
//                 <span>{totalItems}</span>
//               </div>
//               <div className="flex justify-between text-lg font-bold mt-2">
//                 <span>Total Price:</span>
//                 <span>₹{totalPrice}</span>
//               </div>
//             </div>
//             <div className="flex justify-end mt-6">
//               <button
//                 onClick={handleBuyNow}
//                 className="bg-green-500 text-white py-3 px-6 rounded-md hover:bg-green-600 transition-all duration-200 text-lg font-bold"
//               >
//                 Buy Now
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Cart;
