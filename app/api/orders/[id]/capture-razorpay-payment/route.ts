import { auth } from '@/lib/auth'
import dbConnect from '@/lib/dbConnect'
import OrderModel from '@/lib/models/OrderModel'
import { razorpay } from '@/lib/razorpay'

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
      const { razorpayPaymentId, razorpayOrderId } = await req.json()

      // Optionally verify the payment signature here using Razorpay's SDK

      // Mark the order as paid
      order.isPaid = true
      order.paidAt = Date.now()
      order.paymentResult = {
        id: razorpayPaymentId,
        status: 'captured',
        orderId: razorpayOrderId,
      }

      const updatedOrder = await order.save()

      return Response.json(updatedOrder)
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
