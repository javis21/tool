
const express = require("express");
let connection = require('../database/conn');
let queries = require('../database/queries/page3');
const { isLoggedIn } = require('../lib/auth');


const router = express.Router();

router.get('/questions',isLoggedIn,(req,res)=>{
    connection.query(queries.category, (err, result)=>{
        if(err){
            console.log(err)
        }else{
            console.log(result)
var dont_show= 1

    res.render('questions',{category: result , dont_show:dont_show});
    
}
})
})



router.get('/questions/:id',isLoggedIn,(req,res)=>{
    connection.query(queries.questions(req.params.id), (err, result)=>{
        if(err){
            console.log(err)
        }else{
            console.log(result)


    res.render('questions',{question2: result , category:req.params.id});
    
}
})
})

router.get('/edits/:id/:id1',isLoggedIn, (req, res)=>{
    connection.query(queries.question(req.params.id,req.params.id1),(err, result)=>{
        if(err){
            console.log(err)
        }else{
            console.log(result )

            // req.app.locals.layout = 'base'; 
            // ,layout: false
            res.render('edits',{question: result });
        }
    })
});


router.post('/edits/:id/:id1',isLoggedIn, (req, res)=>{
    // idname: req.params.idname,
    let data={                      

        id: req.params.id1,
        main_question: req.body.main_question,
        sub_question: req.body.sub_question,
        question: req.body.question,
        question_num: req.body.question_num,

        category: req.body.category

        
    }

    connection.query(queries.edit(data,req.params.id),(err, result)=>{
        if(err){
            console.log(err)
        }else{

            // res.redirect('/questions/'+req.params.id)
        }
    })
});



// router.get('/add',isLoggedIn, (req, res)=>{
//     req.app.locals.layout = 'base'; 

//     res.render('templates/add');
// });
router.get('/delete/:id/:id1',isLoggedIn, (req, res)=>{
    connection.query(queries.delete(req.params.id,req.params.id1),(err, result)=>{
        if(err){
            console.log(err)
        }else{
            req.app.locals.layout = 'main'; 

// console.log(req.params.id1 )
            res.redirect('/questions/'+req.params.id)
        }
    })
});


module.exports = router ; 