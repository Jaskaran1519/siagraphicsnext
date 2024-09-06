import { auth } from '@/lib/auth'
import dbConnect from '@/lib/dbConnect'
import OrderModel from '@/lib/models/OrderModel'
import { razorpay } from '../../../../../lib/razorpay' // Assuming you have a Razorpay instance set up

export const POST = auth(async (...request: any) => {
  const [req, { params }] = request

  if (!req.auth) {
    return Response.json(
      { message: 'Unauthorized' },
      { status: 401 }
    )
  }

  await dbConnect()
  const order = await OrderModel.findById(params.id)

  if (order) {
    try {
      // Create a Razorpay order
      const razorpayOrder = await razorpay.orders.create({
        amount: order.totalPrice * 100, // Razorpay accepts the amount in paise (1 INR = 100 paise)
        currency: 'INR',
        receipt: order._id.toString(),
      })

      // Return the Razorpay order details
      return Response.json(razorpayOrder)
    } catch (err: any) {
      return Response.json(
        { message: err.message },
        { status: 500 }
      )
    }
  } else {
    return Response.json(
      { message: 'Order not found' },
      { status: 404 }
    )
  }
}) as any
