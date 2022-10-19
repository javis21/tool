const express = require('express');
const router = express.Router();
const pool = require('../database');
// const helpers = require('./helpers');
// const passport = require('passport');

let connection = require('../database/conn');
let queries = require('../database/queries/page1');


const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');
const { end } = require('pdfkit');

router.get('/signup', isNotLoggedIn, (req, res) => {
    res.render('auth/signup',{layout: false});
});

router.post('/signup', isNotLoggedIn, passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
}));

router.get('/signin', isNotLoggedIn, (req, res) => {
    res.render('auth/signin',{layout: false});
});

router.post('/signin', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local.signin', {
        
      
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next);
});

router.get('/profile', isLoggedIn, (req, res, next) => {
//    us = 0 ; 
//    ad = 1 ; 
//     const rows =  pool.query('SELECT * FROM pros WHERE username = ?', [username]);
//     const user = rows[0];
//     const admin =  helpers.matchPassword(ad, user.admin);
//     // const use = await helpers.matchPassword(us, user.admin);

//      if (admin) {
//         res.redirect('page4/user1');
//         return;
//     }
//     else {
//       res.redirect('page4/user2');
//       return;
//     }

user = req.session.loggedUser;

// console.log(req.user.username);
// queries.question(req.params.id)

connection.query(queries.ass_total(req.user.username)+ '; '+queries.ass_finished(req.user.username)
+ '; '+queries.ass_missing(req.user.username)+ '; '+queries.total_tasks(req.user.username)+ '; '+queries.total_answered(req.user.username)
+ '; '+queries.categories+ '; '+queries.ass_date,+ '; '+queries.total_missing(req.user.username), (err, result)=>{
    if(err){
        // ass_date categories total_answered  total_tasks   ass_missing  ass_finished ass_total
        console.log(err)
    }else{       
        var fruitObject =result[6];
        Object.keys(fruitObject); // this returns all properties in an array ["a", "b", "c"]
        ends = fruitObject[Object.keys(fruitObject)[Object.keys(fruitObject).length - 1]] // "carrot"
        starts = result[6][0]
        console.log(ends)
        console.log(starts)

        res.render('page1',{ass_total: result[0],ass_finished: result[1],ass_missing: result[2],total_tasks: result[3],total_answered: result[4] ,categories: result[5],ass_date: result[6],total_missing: result[7],ends:ends ,starts: starts});
       
    }
})




    // res.render('page1',{ title: 'my other page', layout: 'base' });
    
});

router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/signin');
});

module.exports = router;