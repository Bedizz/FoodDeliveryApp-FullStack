import express from 'express'
import authMiddleware from '../middlewares/auth.js'
import { placeOrder,verifyOrder,userOrders,getAllOrders,updateOrderStatus } from '../controllers/orderController.js'


const orderRouter = express.Router()


orderRouter.post('/place',authMiddleware,placeOrder)
orderRouter.post('/verify',verifyOrder)
orderRouter.post('/userOrders',authMiddleware,userOrders)
orderRouter.get('/getAllOrders',getAllOrders)
orderRouter.post('/status',updateOrderStatus)


export default orderRouter;