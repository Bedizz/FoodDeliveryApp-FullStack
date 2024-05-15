import foodModel from "../models/foodModel.js";
import fs from 'fs'

//add a food item

export const addFood = async (req,res) => {
    let image_filename= `${req.file.filename}`

    // _______one way ____

    // const food = new foodModel({
    //     name: req.body.name,
    //     description: req.body.description,
    //     price: req.body.price,
    //     category: req.body.category,
    //     image: image_filename
    // })
    // try {
    //     await food.save();
    //     res.status(200).json({message:"Food added"})
        
    // } catch (error) {
    //     res.sendStatus(500).json({message:"Food could not added"})
        
    // }

    // _________another way_____________

    const { name,description,price,category,image} = req.body

    try {
        const data = await foodModel.create({name,description,price,image:image_filename,category})
        res.status(200).json(data)
            
    } catch (error) {
      res.sendStatus(500).json({message:"Food could not POST"})
    }
}
export const getAllFoods = async(req,res) => {
    try {
        const foods = await foodModel.find()
        res.status(200).json(foods)
    } catch (error) {
        res.status(500).json({message:"Foods could not GET"})
    }

}
export const deleteFood = async(req,res) => {
    
    try {
        // ------------something new => it deletes files which are hold in uploads file-------
        const food= await foodModel.findById(req.body.id)
        fs.unlink(`uploads/${food.image}`, () => {})
        // ----------------------------------------------------------------------------
        const data = await foodModel.findByIdAndDelete(req.body.id)
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({message:" Food could not DELETE"})
        
    }
}

