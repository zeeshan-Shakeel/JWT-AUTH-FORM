import express from 'express'
import { protect } from '../middleware/protect.js';
const router=express.Router();


router.post("/product",protect,async(req,res)=>{
    console(req.user)
    res.status(403).json([
        {
            name:"Bicycle",
            price:2300,
        },
        {
            name:"Bike",
            price:222,
        }
    ])
});
export default router