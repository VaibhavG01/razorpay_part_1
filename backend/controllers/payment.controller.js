const { createRazorpayInstance } = require('../config/razorpay.config');

const crypto = require('crypto');
const razorpayInstance = createRazorpayInstance();

exports.createOrder = async (req, res) => {
    const { courseId, amount } = req.body;

    // Checks
    if (!courseId || !amount) {
        return res.status(400).json({
            success: false,
            message: "Please provide all required fields"
        });
    }

    // console.log(courseId, amount);

    const options = {
        amount: amount * 100,
        currency: "INR",
        receipt: `receipt_order_${courseId}_${Date.now()}`,
    }
    try {
        razorpayInstance.orders.create(options, (err, order) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }
            res.status(200).json({
                success: true,
                order
            });
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }

}

exports.verifyPayment = async (req, res) => {

    // Implementation for payment verification will go here
    const { order_id, payment_id, signature } = req.body;
    
    const secret = process.env.RAZORPAY_KEY_SECRET;

    const hmac = crypto.createHmac('sha256', secret);

    hmac.update(order_id + '|' + payment_id);

    const generatedSignature = hmac.digest('hex');

    if (generatedSignature === signature) {
        return res.status(200).json({
            success: true,
            message: "Payment verified successfully"
        });
    } else {
        return res.status(400).json({
            success: false,
            message: "Invalid signature, payment verification failed"
        });
    }

}