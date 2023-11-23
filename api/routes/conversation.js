const router = require("express").Router();
const Conversation = require("../models/Conversation");


router.post("/",async (req,res)=>{
    const newconversation = new Conversation({
        member:[req.body.senderId,req.body.receiverId]
    })

    try {
        const savedConversation = await newconversation.save()
        res.status(200).json(savedConversation)
    } catch (error) {
        res.status(500).json(err)
    }
})

router.get("/:userId",async (req,res)=>{
    try {
        const conversation = await Conversation.find({
            member:{$in:[req.params.userId]}
        })
        res.status(200).json(conversation)
        
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router