import orderModel from "../models/orderModel.js"
import userModel from "../models/orderModel.js"
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
//placing user order for frontend

export const placeOrder = async(req,res) => {
    const frontEndURL = "http://localhost:5174"
    try {
        // here we created for new order
        const newOrder = new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address
        })
        // now it will save the order in the database
        await newOrder.save()
        // here we clean the user's cart Data.
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}})
        // this is necessary for stripe library. 
        const line_items = req.body.items.map((item,index) => {
            return(
                {price_data: {
                    currency:"inr",
                    product_data:{
                        name:item.name
                    },
                    unit_amount:item.price*100*80
                },
                quantity:item.quantity
            }
                
            )})
            // here is just for delivery charge part
            line_items.push({
                price_data:{
                    currency:"inr",
                    product_data:{
                        name:"Delivery Charges",

                    },
                    unit_amount:2*100*80
                },
                quantity:1
            })
            const session = await stripe.checkout.sessions.create({
                line_items:line_items,
                mode:'payment',
                success_url:`${frontEndURL}/verify?success=true&orderId=${newOrder._id}`,
                cancel_url:`${frontEndURL}/verify?success=false&orderId=${newOrder._id}`,
            })
            res.json({success:true,session_url:session.url})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

export const verifyOrder =async (req,res ) => {
    const {orderId,success} = req.body
    try {
        if (success=="true") {
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            res.json({success:true,message:"Paid"})    
        } else {
            await orderId.findByIdAndDelete(orderId)
            res.json({success:false,message:"Not Paid"})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}
export const userOrders = async(req,res) => {
    const {userId} = req.body
    try {
        const orders = await orderModel.find({userId:userId})
        console.log(orders)
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message: "Error"})
    }

}
export const getAllOrders = async(req,res) => {
    try {
        const orders= await orderModel.find({})
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}
export const updateOrderStatus =async(req,res) => {
    try {
        const response = await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
        res.json({success:true,message:"Status Updated Successfully"})
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}
