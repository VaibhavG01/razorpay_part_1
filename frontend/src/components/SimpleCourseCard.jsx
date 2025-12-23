import React from 'react';

const SimpleCourseCard = ({ courseName, amount }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex flex-col h-full">
        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex-grow">
          {courseName}
        </h3>
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-blue-600">
              ${amount}
            </span>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-300">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleCourseCard;