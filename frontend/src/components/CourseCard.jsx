import React from 'react';

const CourseCard = ({ courseName, amount, instructor, category, duration, discount, onPayment }) => {
    // Calculate discounted price if discount exists
    const finalAmount = discount ? amount - (amount * discount / 100) : amount;

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1 border border-gray-100">
            {/* Category Badge */}
            <div className="px-4 pt-4">
                <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                    {category || "Development"}
                </span>
            </div>

            {/* Course Content */}
            <div className="p-6">
                {/* Course Name */}
                <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 min-h-[56px]">
                    {courseName}
                </h3>

                {/* Instructor */}
                <p className="text-gray-600 text-sm mb-4 flex items-center">
                    <svg className="w-4 h-4 mr-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                    {instructor || "Instructor Name"}
                </p>

                {/* Duration */}
                <p className="text-gray-600 text-sm mb-4 flex items-center">
                    <svg className="w-4 h-4 mr-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    {duration || "8 Weeks"}
                </p>

                {/* Price Section */}
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                    <div>
                        {/* Original Price with discount */}
                        {discount && (
                            <span className="text-gray-500 line-through text-sm mr-2">
                                ${amount}
                            </span>
                        )}
                        {/* Final Price */}
                        <span className="text-2xl font-bold text-gray-900">
                            ${finalAmount.toFixed(2)}
                        </span>

                        {/* Discount Badge */}
                        {discount && (
                            <span className="ml-2 bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
                                {discount}% OFF
                            </span>
                        )}
                    </div>

                    {/* Enroll Button */}
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300 text-sm"
                        onClick={() => onPayment(courseName, finalAmount)}>
                        Enroll Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;