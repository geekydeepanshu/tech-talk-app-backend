const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.send("hello this is test route!!");
})

router.get('/health',(req,res)=>{
    res.send("hello health is OK!!");
})

module.exports = router;
