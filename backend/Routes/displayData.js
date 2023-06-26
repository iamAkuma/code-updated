const express = require('express');
const router = express.Router();

router.post('/drinkData', (req,res)=>{
    try {
        
        res.send([global.drink_items, global.drink_category])
    } catch (error) {
        console.log(error.message)
        res.send("Server Error")
        
    }
})

module.exports = router;