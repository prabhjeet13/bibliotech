import React from "react";

const About = () => {
  return (
    <div className="bg-gradient-to-br from-purple-500 via-pink-400 to-orange-300 min-h-screen">
      <div className="container mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold text-center text-white">
          About BIBLIOTECH
        </h1>
        <p className="text-center text-lg text-white mt-4">
          Learn more about our journey and mission.
        </p>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white bg-opacity-80 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              Our Mission
            </h2>
            <p className="mt-4 text-gray-600">
              At BIBLIOTECH, we aim to make knowledge accessible to everyone. 
              We believe in empowering communities through education and easy 
              access to resources.
            </p>
          </div>
          <div className="bg-white bg-opacity-80 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              Why Choose Us?
            </h2>
            <p className="mt-4 text-gray-600">
              From curated collections to state-of-the-art digital solutions, 
              we redefine how you interact with books and learning materials.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
