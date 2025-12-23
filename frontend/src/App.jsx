import React, { useEffect } from 'react';
import CourseCard from './components/CourseCard';
import { courses } from './data/data';
import axios from 'axios';
const App = () => {
  // load Script
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  const onPayment = async () => {
    try {
      // 1️⃣ Create Order
      const res = await axios.post(
        "http://localhost:5000/api/payment/createOrder",
        {
          courseId: 1,
          amount: 100,
        }
      );

      const order = res.data.order; // ✅ IMPORTANT

      // 2️⃣ Razorpay Options
      const paymentObject = new window.Razorpay({

        key: "rzp_test_RmOX6fSIDBulsx",
        amount: order.amount,
        currency: order.currency,
        order_id: order.id, // ✅ CORRECT

        handler: async function (response) {
          
          // console.log("Order ID:", response.razorpay_order_id);
          // console.log("Payment ID:", response.razorpay_payment_id);
          // console.log("Signature:", response.razorpay_signature);

          // 3️⃣ Verify payment
          const verifyRes = await axios.post(
            "http://localhost:5000/api/payment/verifyPayment",
            {
              order_id: response.razorpay_order_id,
              payment_id: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            }
          );

          if (verifyRes.data.success) {
            alert("Payment Successful ✅");
          } else {
            alert("Payment Verification Failed ❌");
          }
        },
      });

      paymentObject.open();

    } catch (error) {
      console.error("Payment Error:", error);
      alert("Payment Failed ❌");
    }
  };


  useEffect(() => {
    loadScript('https://checkout.razorpay.com/v1/checkout.js');
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Our Courses</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose from our wide range of professional courses designed to boost your career
          </p>
        </header>

        {/* Course Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Mapping a cards */}
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              courseName={course.courseName}
              amount={course.amount}
              instructor={course.instructor}
              category={course.category}
              duration={course.duration}
              discount={course.discount}
              onPayment={onPayment}
            />
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-12 bg-white rounded-xl shadow p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-3xl font-bold text-blue-600">{courses.length}+</p>
              <p className="text-gray-600">Courses</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-green-600">50+</p>
              <p className="text-gray-600">Instructors</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-purple-600">10K+</p>
              <p className="text-gray-600">Students</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-orange-600">98%</p>
              <p className="text-gray-600">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;