import express from 'express';
const router = express.Router();
import DataModel from '../schema/main.mjs';
router.get("/",async(req,res)=>
{
    try {
        const posts = await DataModel.find({});
        res.send
        ({
            Data : posts
    })
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: "Something Went Wrong"});
    }
})
router.post("/",async(req,res)=>
{
    try {
        const {author , name , content} = req.body;
        if (!author || !name || !content) {
            throw new Error("Missing Required Params");
        }
        const post = await DataModel.create({
            author: author,
            name: name,
            content: content
        })
        res.send({
            Data : post
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: "Something Went Wrong"});
    }
})
router.put("/:id",async(req,res)=>
{
    try {
        const {author , name , content} = req.body;
        const id = req.params.id;
        if (!id || !author || !name || !content) 
        {
            throw new Error("Missing Required Params");
        }
        const posts = await DataModel.findByIdAndUpdate(id,{
            author: author,
            name: name,
            content: content
        },{new: true });
        res.send(
            {
                Data: posts
            }
        )
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: "Something Went Wrong"});
    }
})
router.delete("/:id",async(req,res)=>
{
    try {
        const id = req.params.id
        if (!id) 
        {
            throw new Error("Missing Required Params");
        }
        const posts = await DataModel.findByIdAndDelete(id);
        res.send({Data: []});
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message:"Something Went Wrong"});
    }
})
export default router;