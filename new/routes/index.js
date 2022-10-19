const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../lib/auth');



// const express = require('express');
// const router = express.Router();
// const { isLoggedIn } = require('../lib/auth');
let connection = require('../database/conn');
let queries = require('../database/queries/user');

// app.post('/start', (req, res) => {
//   const name = req.body.name;

//   res.render('play', { name });
// });


// router.get('/',isLoggedIn, (req, res) => {

//   let data={
       
        
//     username: req.body.username,
//     password: req.body.password,
// }
// connection.query(queries.user, (err, result)=>{
//   if(err){
//       console.log(err)
//   }else{
//     res.render('auth/signin.hbs',{user: result});
//       // res.render('page4/user3',{user: result});
//   }
// })
//     // res.render('auth/signin.hbs');
// });

// router.get('/signin', (req, res) => {
  
// //   let data={
    
// //     username: req.body.username,
// //     password: req.body.password,
// // }
// const data = req.body.username;
// // var sql = 'SELECT * FROM pros WHERE username = \'' + data + '\'';
//   // res.render('page1', { data });
//   connection.query(queries.admin, (err, result)=>{
//     if(err){
//         console.log(err)
//     }else{
//       console.log(result)
//         res.render('page1',{user: result});
//     }
//   })
  
// });


router.get('/',isLoggedIn, (req, res) => {

//   if (user.admin === '0' ) {
//     res.redirect('page4/user1');
//     return;
// }
// else if (user.admin === '1' ){
//   res.redirect('page4/user1');
//   return;
// }
    // console.log(user.admin)

    res.render('auth/signin.hbs');
  
});

// router.get('/',isLoggedIn, (req, res) => {
//   res.render('auth/signin.hbs');
// });


router.post('/', function (req, res) {


    //login validations
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
  
    req.getValidationResult().then(function (result) {
      if (!result.isEmpty()) {
        res.render('index1', {
          title: 'Login Panel',
          message: '',
          message_type: '',
          errors: result.array(),
          user: req.session.loggedUser,
        });
  
      } else {
        var user = {
          username: req.body.username,
          password: req.body.password,
          admin: ''
        }
  
        var query = "SELECT * FROM pros WHERE username = ? AND password = ?";
        db.getData(query, [user.username, user.password], function (rows) {
          console.log(rows[0]);
          if (!rows[0]) {
            res.render('view_login', {
              title: 'User Login',
              message: 'Login Failed! Enter Correct Infromatins.',
              message_type: 'alert-danger',
              errors: ''
            });
          } else {
            if (rows[0].admin == '0') {
  
              user.UserType = 'admin';
              req.session.loggedUser = user;
  
              res.redirect('/index1');
  
            } else if (rows[0].Usertype == 'Staff') {
  
              user.UserType = 'Staff';
              req.session.loggedUser = user;
  
              res.redirect('/index1');
  
            }
          }
        });
  
      } // validation end
  
    });
  
  });


module.exports = router;