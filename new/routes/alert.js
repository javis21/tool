const express = require("express");
const { isLoggedIn } = require('../lib/auth');


const authController = require('../controllers/alert');

let connection = require('../database/conn');
let queries = require('../database/queries/alert');

const router = express.Router();
router.post('/alert',authController.alert)

router.get('/alert',isLoggedIn,(req,res)=>{

    // res.render('admin');

    connection.query(queries.list, (err, result)=>{
    //     if(err){
    //         console.log(err)
    //     }else{       
            // console.log(result)
            console.log("result")


            // var fruitObject =result[6];
            // Object.keys(fruitObject); // this returns all properties in an array ["a", "b", "c"]
            // ends = fruitObject[Object.keys(fruitObject)[Object.keys(fruitObject).length - 1]] // "carrot"
            // starts = result[6][0]
            // console.log(ends)
            // console.log(starts)
                // ass_date categories total_answered  total_tasks   ass_missing  ass_finished ass_total
 
            res.render('alert',{list: result});
           
    //     }
    })

})


module.exports = router ; 







