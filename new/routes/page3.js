const express = require("express");
let connection = require('../database/conn');
let queries = require('../database/queries/page3');
const { isLoggedIn } = require('../lib/auth');


const router = express.Router();

router.get('/page3',isLoggedIn,(req,res)=>{
    connection.query(queries.category, (err, result)=>{
        if(err){
            console.log(err)
        }else{
            console.log(result)

    res.render('page3',{category: result});
    
}
})
})

// router.get('/page43',isLoggedIn, (req, res)=>{
//         connection.query(queries.list+ '; '+ queries.user, (err, result)=>{
//             if(err){
//                 console.log(err)
//             }else{
//                 console.log(result[1])
//                 res.render('page4/page43',{question: result[0] , list: result[1]});
                
//             }
//         })
//     });


module.exports = router ; 