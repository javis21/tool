const express = require("express");
const { isLoggedIn } = require('../lib/auth');


let connection = require('../database/conn');
let queries = require('../database/queries/admin');

const router = express.Router();

router.get('/admin',isLoggedIn,(req,res)=>{

    // res.render('admin');

    connection.query(queries.ass_total+ '; '+ queries.member_total + '; '+ queries.admin_total+ '; '+ queries.report_total 
    + '; '+ queries.categories+ '; '+ queries.total_protected+ '; '+ queries.total_tasks+ '; '+ queries.total_yes+ '; '+ queries.total_no
    + '; '+ queries.ass_date_filled+ '; '+ queries.ass_date, (err, result)=>{
        if(err){
            console.log(err)
        }else{       
            console.log("his")

            // var fruitObject =result[6];
            // Object.keys(fruitObject); // this returns all properties in an array ["a", "b", "c"]
            // ends = fruitObject[Object.keys(fruitObject)[Object.keys(fruitObject).length - 1]] // "carrot"
            // starts = result[6][0]
            // console.log(ends)
            // console.log(starts)
                // ass_date categories total_answered  total_tasks   ass_missing  ass_finished ass_total
 
            res.render('admin',{ass_total: result[0], member_total: result[1], admin_total: result[2], report_total: result[3]
                , categories: result[4], total_protected: result[5],total_tasks:result[6],total_yes:result[7],total_no:result[8],date:result[9],date_filled:result[10]});
           
        }
    })

})


module.exports = router ; 



// const express = require('express');
// const router = express.Router();
// // const helpers = require('./helpers');
// // const passport = require('passport');

// let connection = require('../database/conn');
// let queries = require('../database/queries/admin');

// router.get('/admin', isLoggedIn, (req, res, next) => {
//     //    us = 0 ; 
//     //    ad = 1 ; 
//     //     const rows =  pool.query('SELECT * FROM pros WHERE username = ?', [username]);
//     //     const user = rows[0];
//     //     const admin =  helpers.matchPassword(ad, user.admin);
//     //     // const use = await helpers.matchPassword(us, user.admin);
    
//     //      if (admin) {
//     //         res.redirect('page4/user1');
//     //         return;
//     //     }
//     //     else {
//     //       res.redirect('page4/user2');
//     //       return;
//     //     }
    
//     user = req.session.loggedUser;
    
//     // console.log(req.user.username);
//     // queries.question(req.params.id)
//     // ass_total  member_total admin_total report_total categories total_protected
//     connection.query(queries.ass_total+ '; '+ queries.member_total + '; '+ queries.admin_total+ '; '+ queries.report_total
//     + '; '+ queries.categories+ '; '+ queries.total_protected, (err, result)=>{
//         if(err){
//             // ass_date categories total_answered  total_tasks   ass_missing  ass_finished ass_total
//             console.log(err)
//         }else{       
//             console.log(result)

//             // var fruitObject =result[6];
//             // Object.keys(fruitObject); // this returns all properties in an array ["a", "b", "c"]
//             // ends = fruitObject[Object.keys(fruitObject)[Object.keys(fruitObject).length - 1]] // "carrot"
//             // starts = result[6][0]
//             // console.log(ends)
//             // console.log(starts)
    
//             res.render('admin',{ass_total: result});
           
//         }
//     })
// });
    
    