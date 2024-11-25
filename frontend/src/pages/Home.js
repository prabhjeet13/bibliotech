import React from "react";

const Home = () => {
  return (
    <div className="bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 min-h-screen text-white">
      <header className="p-6 text-center">
        <h1 className="text-5xl font-bold">Welcome to BIBLIOTECH</h1>
        <p className="mt-4 text-xl">
          Your ultimate online library for exploring, learning, and growing.
        </p>
      </header>
      <div className="flex justify-around items-center flex-wrap mt-10 px-8">
        <div className="bg-white text-black rounded-lg shadow-lg p-6 w-72 mb-6">
          <h2 className="text-2xl font-semibold">Explore Books</h2>
          <p className="mt-4">
            Discover a vast collection of books across genres and categories.
          </p>
        </div>
        <div className="bg-white text-black rounded-lg shadow-lg p-6 w-72 mb-6">
          <h2 className="text-2xl font-semibold">Easy Access</h2>
          <p className="mt-4">
            Search, preview, and borrow books from the comfort of your home.
          </p>
        </div>
        <div className="bg-white text-black rounded-lg shadow-lg p-6 w-72 mb-6">
          <h2 className="text-2xl font-semibold">Personalized</h2>
          <p className="mt-4">
            Tailored recommendations based on your preferences.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
