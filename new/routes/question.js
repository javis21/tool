let router = require('express').Router();
let connection = require('../database/conn');
let queries = require('../database/queries/question');
let report_queries = require('../database/queries/report');

const { isLoggedIn } = require('../lib/auth');
// const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');
// upload


// -----
const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const multer = require('multer')
const path = require('path')
const fs = require("fs");
const mysql = require("mysql");
const fastcsv = require("fast-csv");

// upload



// ----- ecryption
const bcrypt = require('bcryptjs');
const helpers = require('../lib/helpers');
const { count } = require('console');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST ,
    user : process.env.DATABASE_USER,
    password : process.env.DATABASE_PASSWORD,
    database : process.env.DATABASE
});


router.get('/cmmc',isLoggedIn, (req, res)=>{
    connection.query(queries.listNist + '; '+ queries.list  + '; '+queries.category,(err, result)=>{
        if(err){
            console.log(result[2])
        }else{
            console.log("-------------------------------- here")
            console.log(req.user.admin )
            console.log(result[2] )

            req.app.locals.layout = 'main'; 
            // console.log(result)
            if(req.user.admin){
            res.render('templates/question',{question: result[0] , question2 : result[1],category : result[2]});
        }
        else {
        res.render('page1');

        }
    }
    })
   
});


router.get('/nist',isLoggedIn, (req, res)=>{
   
    connection.query(queries.listNist,(err, result)=>{
        if(err){
            console.log(err)
        }else{
            req.app.locals.layout = 'main'; 
            if(req.user.admin){
            res.render('templates/question2',{question: result});
        }
        else {
        res.render('page1');

        }
        }
    })
});

router.get('/users',isLoggedIn, (req, res)=>{
   
    connection.query(queries.listUsers,(err, result)=>{
        if(err){
            console.log(err)
        }else{
            req.app.locals.layout = 'main'; 
            if(req.user.admin){
            res.render('templates/users',{user: result});
        }
        else {
        res.render('page1');

        }   
        }
    })
});




router.get('/edit/:id',isLoggedIn, (req, res)=>{
    connection.query(queries.question(req.params.id),(err, result)=>{
        if(err){
            console.log(err)
        }else{
            // req.app.locals.layout = 'base'; 
            // ,layout: false
            res.render('templates/edit',{question: result });
        }
    })
});

router.get('/edit2/:id',isLoggedIn, (req, res)=>{
    connection.query(queries.question2(req.params.id),(err, result)=>{
        if(err){
            console.log(err)
        }else{
            // req.app.locals.layout = 'base'; 
            // ,layout: false
            res.render('templates/edit2',{question: result });
        }
    })
});

router.get('/edit3/:id',isLoggedIn, (req, res)=>{
    connection.query(queries.user(req.params.id),(err, result)=>{
        if(err){
            console.log(err)
        }else{
            // req.app.locals.layout = 'base'; 
            // ,layout: false
            res.render('templates/edit3',{user: result });
        }
    })
});



router.post('/edit/:id',isLoggedIn, (req, res)=>{
    // idname: req.params.idname,
    let data={                      

        id: req.params.id,
        main_question: req.body.main_question,
        sub_question: req.body.sub_question,
        question: req.body.question,
        question_num: req.body.question_num,

        category: req.body.category

        
    }

    connection.query(queries.edit(data),(err, result)=>{
        if(err){
            console.log(err)
        }else{
            req.app.locals.layout = 'main'; 

            res.redirect('/question/cmmc')
        }
    })
});


router.post('/edit2/:id',isLoggedIn, (req, res)=>{
    // idname: req.params.idname,
    let data={                      

        id: req.params.id,
        main_question: req.body.main_question,
        sub_question: req.body.sub_question,
        question: req.body.question,
        question_num: req.body.question_num,

        category: req.body.category

        
    }

    connection.query(queries.edit2(data),(err, result)=>{
        if(err){
            console.log(err)
        }else{
            req.app.locals.layout = 'main'; 

            res.redirect('/question/nist')
        }
    })
});


router.post('/edit3/:id',isLoggedIn, (req, res)=>{
    // idname: req.params.idname,

    let id={                      

        id: req.params.id,
        

        
    }
   
    connection.query("SELECT password FROM pros WHERE id = ?",[id.id], async (err, info, fields)  =>{
        let data={                      

            id: req.params.id,
            username: req.body.username,
            password: req.body.password,
    
    
            fullname: req.body.fullname,
            mail: req.body.mail,
            phone: req.body.phone,
    
            adress: req.body.adress
    
            
        }
    console.log("hello");
    console.log(data.id)

    pass = await helpers.encryptPassword( data.password);

    console.log(pass);

    connection.query(queries.edit3(data,pass),(err, result)=>{
        if(err){
            console.log(err)
        }else{
            req.app.locals.layout = 'main'; 

            res.redirect('/question/users')
        }
    })
});
});



router.get('/delete/:id',isLoggedIn, (req, res)=>{
    connection.query(queries.delete(req.params.id),(err, result)=>{
        if(err){
            console.log(err)
        }else{
            req.app.locals.layout = 'main'; 

            res.redirect('/question/cmmc')
        }
    })
});

router.get('/delete2/:id',isLoggedIn, (req, res)=>{
    connection.query(queries.delete2(req.params.id),(err, result)=>{
        if(err){
            console.log(err)
        }else{
            req.app.locals.layout = 'main'; 

            res.redirect('/question/nist')
        }
    })
});

router.get('/delete3/:id',isLoggedIn, (req, res)=>{
    connection.query(queries.delete3(req.params.id),(err, result)=>{
        if(err){
            console.log(err)
        }else{
            req.app.locals.layout = 'main'; 

            res.redirect('/question/users')
        }
    })
});
// give admin
router.get('/give_admin/:id',isLoggedIn, (req, res)=>{
    connection.query(queries.give_admin(req.params.id),(err, result)=>{
        if(err){
            console.log(err)
        }else{
            req.app.locals.layout = 'main'; 

            res.redirect('/question/users')
        }
    })
});
// revoke_admin

router.get('/revoke_admin/:id',isLoggedIn, (req, res)=>{
    connection.query(queries.revoke_admin(req.params.id),(err, result)=>{
        if(err){
            console.log(err)
        }else{
            req.app.locals.layout = 'main'; 

            res.redirect('/question/users')
        }
    })
});

router.get('/add',isLoggedIn, (req, res)=>{
    req.app.locals.layout = 'base'; 

    res.render('templates/add');
});
router.get('/add2',isLoggedIn, (req, res)=>{
    req.app.locals.layout = 'base'; 

    res.render('templates/add2');
});

router.get('/add3',isLoggedIn, (req, res)=>{
    req.app.locals.layout = 'base'; 

    res.render('templates/add3');
});


router.post('/add',isLoggedIn, (req, res)=>{

    let data={ 
       
        id: req.body.id,
        main_question: req.body.main_question,
        sub_question: req.body.sub_question,

        question: req.body.question,
        question_num: req.body.question_num,

        category: req.body.category,

    }

    connection.query(queries.add(data),(err, result)=>{
        if(err){
            console.log(err)
        }else{
            req.app.locals.layout = 'base'; 

            // res.redirect('/question/cmmc')
            // questions
                        res.redirect('/questions/'+req.body.category)

            
        }
    })
})

router.post('/add2',isLoggedIn, (req, res)=>{

    let data={ 
       
        id: req.body.id,
        main_question: req.body.main_question,
        sub_question: req.body.sub_question,

        question: req.body.question,
        question_num: req.body.question_num,

        category: req.body.category,

    }

    connection.query(queries.add2(data),(err, result)=>{
        if(err){
            console.log(err)
        }else{
            req.app.locals.layout = 'base'; 

            res.redirect('/question/nist')
        }
    })
})


router.post('/add3',isLoggedIn, (req, res)=>{

    let data={ 
       
        id: req.body.id,
        username: req.body.username,
        fullname: req.body.fullname,

        password: req.body.password,
        mail: req.body.mail,

        phone: req.body.phone,
        adress: req.body.adress

    }

    connection.query(queries.add3(data),(err, result)=>{
        if(err){
            console.log(err)
        }else{
            req.app.locals.layout = 'base'; 

            res.redirect('/question/users')
        }
    })
})
router.get('/cmmc',isLoggedIn, (req, res)=>{
    connection.query(queries.listNist + '; '+ queries.list,(err, result)=>{
        if(err){
            console.log(result[2])
        }else{
            console.log("-------------------------------- here")

            req.app.locals.layout = 'main'; 
            console.log(result)
            res.render('templates/question',{question: result[0] , question2 : result[1]});

        }
    })
   
});
//  admin user tasks

router.get('/user_tasks/:id',isLoggedIn, (req, res)=>{
    connection.query(queries.count_all(req.params.id) + '; '+ queries. count_completed(req.params.id) + '; '+ queries.count_Notcompleted(req.params.id),(err, result)=>{
        // connection.query(queries.count_completed(req.body.ids,req.body.q3)  + '; '+ queries.count_all(req.body.ids,req.body.q3),(err, data)=>{

        if(err){
            console.log(err)
        }else{
            // const merged = mergePackages(packages);
            /**
             * Function that merges packages into 1 dictionary.
             * @param packages Packages that should be merged.
             * @returns Merged packages.
             */
            // function mergePackages(packages) {
            //     /**
            //      * Variable that contains the merged packages.
            //      */
            //     const mergedPackages = {};
            //     // outer loop
            //     for (let i = 0; i < packages.length; ++i) {
            //         // get the array containing the packages
            //         const packagesArr = packages[i];
            //         // inner loop
            //         for (let j = 0; j < packagesArr.length; ++j) {
            //             // get package
            //             const instance = packagesArr[j];
            //             // get the merged package if it exists
            //             const mergedInstance = mergedPackages[instance.ids];
            //             // check for existence
            //             if (mergedInstance) {
            //                 var1 =  mergedInstance.nb_all ;
            //                 var2 =  mergedInstance.nb_nc ;
            //                 if (instance.nb_all)
            //                     mergedInstance.nb_all = instance.nb_all;
            //                     // condition about answered questions 
            //                 if (instance.nb_c){
            //                     mergedInstance.nb_c = instance.nb_c;
            //                 //    console.log(   mergedInstance.nb_c)
            //                 //    console.log(   instance.nb_c)
                             
            //                 }
            //                 if (mergedInstance.nb_c == null){
            //                     mergedInstance.nb_c = 0;
                           
                             
            //                 }
            //                 if (instance.nb_nc)
            //                     mergedInstance.nb_nc = instance.nb_nc;
            //                 if(var1 -instance.nb_nc){
            //                     mergedInstance.nb=0 
            //                 }
            //                      else {
            //                         mergedInstance.nb=1                                 }
            //             }
            //             else {
            //                 mergedPackages[instance.ids] = { ...instance };
            //             }
            //         }
            //     }
            //     // returning the merged packages
            //     return mergedPackages;
            // }
            function mergePackages(packages) {
                /**
                 * Variable that contains the merged packages.
                 */
                const mergedPackages = {};
                // outer loop
                for (let i = 0; i < packages.length; ++i) {
                    // get the array containing the packages
                    const packagesArr = packages[i];
                    // inner loop
                    for (let j = 0; j < packagesArr.length; ++j) {
                        // get package
                        const instance = packagesArr[j];
                        // get the merged package if it exists
                        const mergedInstance = mergedPackages[instance.ids];
                        // check for existence
                        if (mergedInstance) {
                            var1 =  mergedInstance.nb_all ;
                            var2 =  mergedInstance.nb_nc ;
                            if (instance.nb_all)
                                mergedInstance.nb_all = instance.nb_all;
                                // condition about answered questions 
                            if (instance.nb_c){
                                mergedInstance.nb_c = instance.nb_c;
                            //    console.log(   mergedInstance.nb_c)
                            //    console.log(   instance.nb_c)
                             
                            }
                            if (mergedInstance.nb_c == null){
                                mergedInstance.nb_c = 0;
                           
                             
                            }
                            if (instance.nb_nc)
                                mergedInstance.nb_nc = instance.nb_nc;

                                else {
                                    mergedInstance.nb_nc = 0
                                    mergedInstance.nb= 1
                                }
                            // if(var1 - instance.nb_nc){
                            //     mergedInstance.nb=0 

                            // }
                            
                            //      else {
                            //         console.log(var1 - instance.nb_nc)

                            //         mergedInstance.nb=1                                 }

                            // if(var1 - instance.nb_nc)
                        }
                        else {
                            mergedPackages[instance.ids] = { ...instance };
                        }
                    }
                }
                // returning the merged packages
                return mergedPackages;
            }
          data =  mergePackages(result)
            console.log(data)
            console.log(result[0][1])




            res.render('templates/user_tasks',{question: data });



        }
    // })

    })
});



//   personal user tasks dashborad

router.get('/user_personal_tasks/:id',isLoggedIn, (req, res,next)=>{
    connection.query(queries.count_all(req.params.id) + '; '+ queries. count_completed(req.params.id) + '; '+ queries.count_Notcompleted(req.params.id),(err, result)=>{
        // connection.query(queries.count_completed(req.body.ids,req.body.q3)  + '; '+ queries.count_all(req.body.ids,req.body.q3),(err, data)=>{

        if(err){
            console.log(err)
        }else{

            // const merged = mergePackages(packages);
            /**
             * Function that merges packages into 1 dictionary.
             * @param packages Packages that should be merged.
             * @returns Merged packages.
             */
            function mergePackages(packages) {
                /**
                 * Variable that contains the merged packages.
                 */
                const mergedPackages = {};
                // outer loop
                for (let i = 0; i < packages.length; ++i) {
                    // get the array containing the packages
                    const packagesArr = packages[i];
                    // inner loop
                    // console.log(packages[i])

                    for (let j = 0; j < packagesArr.length; ++j) {
                        // get package
                        // console.log(packages[i][j])

                        const instance = packagesArr[j];
                        // get the merged package if it exists
                        const mergedInstance = mergedPackages[instance.ids];
                        // check for existence
                        if (mergedInstance) {
                            var1 =  mergedInstance.nb_all ;
                            var2 =  mergedInstance.nb_nc ;
                            if (instance.nb_all)
                                mergedInstance.nb_all = instance.nb_all;
                                // condition about answered questions 
                            if (instance.nb_c){
                                mergedInstance.nb_c = instance.nb_c;
                            //    console.log(   mergedInstance.nb_c)
                            //    console.log(   instance.nb_c)
                             
                            }
                            if (mergedInstance.nb_c == null){
                                mergedInstance.nb_c = 0;
                           
                             
                            }
                            if (instance.nb_nc){
                                mergedInstance.nb_nc = instance.nb_nc;
                                mergedInstance.nb= 0;
                                // console.log(mergedInstance.nb)
                                // var   idies = packagesArr[j].ids
                                // console.log(idies)
                            }
                                else {
                                    mergedInstance.nb_nc = 0
                                    mergedInstance.nb= 1
                                    // console.log(mergedInstance.nb)
                                 var   idies = packagesArr[j].ids
                                 if(req.user.admin){
                                    if(mergedInstance.nb_c == mergedInstance.nb_all){
                                    // console.log(req.user.admin)
                                    // console.log(mergedInstance.nb_all)
                                    // console.log(mergedInstance.nb_c == mergedInstance.nb_all)
                                    // console.log(idies)


                                    // console.log(req.user.username)
                                    db.query(' UPDATE info SET status= 1 WHERE id_ass= ?  ', [idies]);
                                }
                                else{                                     console.log(idies)

                                    db.query(' UPDATE info SET status= 0 WHERE id_ass= ?  ', [idies]); }
                                }


                                }
                            // if(var1 - instance.nb_nc){
                            //     mergedInstance.nb=0 

                            // }
                            
                            //      else {
                            //         console.log(var1 - instance.nb_nc)

                            //         mergedInstance.nb=1                                 }

                            // if(var1 - instance.nb_nc)
                        }
                        else {
                            mergedPackages[instance.ids] = { ...instance };
                        }
                    }
                }
                // returning the merged packages
                return mergedPackages;
            }
          data =  mergePackages(result)
        //   console.log(data[91].nb)

            // console.log(data)
            // console.log(result[0][1])



            // ,{ title: 'my other page', layout: 'base' }
            res.render('templates/user_tasks',{question: data , title: 'my other page', layout: 'base' });



        }
    // })

    })
});


router.get('/user_quest/:id/:id1',isLoggedIn, (req, res)=>{
    connection.query(queries.user_quest(req.params.id,req.params.id1),(err, result)=>{
        if(err){
            console.log(err)
        }else{
            console.log(  "id"+ req.params.id)
            console.log(  "id2 "+ req.params.id1)
          

            console.log(result)

         
            // req.app.locals.layout = 'base'; 
            // ,layout: false
            res.render('templates/user_quest',{question: result });
        }
    })
});

router.get('/finish_tasks/:id/:id1',isLoggedIn, (req, res)=>{
    connection.query(queries.finish_tasks(req.params.id,req.params.id1)+';'+queries.user_list   ,(err, result)=>{
        if(err){
            console.log(err)
        }else{
            console.log(  "id"+ req.params.id)
            console.log(  "id "+ req.params.id1)
            // console.log( result)

            console.log(result)


         
            // req.app.locals.layout = 'base'; 
            // ,layout: false
            res.render('templates/user_personal_quest',{question: result[0] ,list: result[1],identifier: req.params.id });
        }
    })
});


// check summary  the report 

router.get('/report/:id',isLoggedIn, (req, res)=>{
    connection.query(report_queries.report(req.params.id)  +';'+ report_queries.report_bars(req.params.id)  +';'+ report_queries.report_bars_vul(req.params.id),(err, result)=>{
        if(err){
            console.log(err) 
            //
        }else{
            console.log(  "id"+ req.params.id)
            console.log(  req.params.id)




         
            // req.app.locals.layout = 'base'; 
            // ,layout: false
            res.render('report',{data: result[0][0] , bar : result[1]  , bar1 : result[2]  , id: req.params.id});
        }
    })
});

// check full  the report 




router.get('/full_report/:id',isLoggedIn, (req, res)=>{  
    connection.query(report_queries.report(req.params.id)  +';'+ report_queries.report_bars(req.params.id)  +';'+ report_queries.report_bars_vul(req.params.id)+';'+ report_queries.company(req.params.id) +';'+ report_queries.creator(req.params.id)+';'+ report_queries.industry(req.params.id) 
    +';'+ report_queries.ass_name(req.params.id)  +';'+ report_queries.report_bars_full(req.params.id) +';'+ report_queries.report_bars_vul_full(req.params.id) +';'+ report_queries.report_full(req.params.id)    ,(err, result)=>{
        if(err){ 
            console.log(err) 
            //
        }else{
            console.log(  "id"+ req.params.id)


var date =  new Date().toISOString().slice(0, 10)
 

console.log(  result[9])

            // req.app.locals.layout = 'base'; 
            // ,layout: false
            res.render('report_full',{data: result[0][0] , bar : result[1]  , bar1 : result[2]  , id: req.params.id,date :date 
           ,company : result[3] , creator: result[4], industry : result[5] , ass_name:  result[6][0] , r1 : result[7] , r2 : result[8], r3: result[9] });
        }
    })
});


// set as finished task
router.get('/finished/:id',isLoggedIn, (req, res)=>{
    connection.query(queries.finished(req.params.id),(err, result)=>{
        if(err){
            console.log(err)
        }else{
            req.app.locals.layout = 'main'; 
            res.redirect('back');

            // res.redirect('.')
        }
    })
});

router.get('/Notfinished/:id',isLoggedIn, (req, res)=>{
    connection.query(queries.Notfinished(req.params.id),(err, result)=>{
        if(err){
            console.log(err)
        }else{
            req.app.locals.layout = 'main'; 
            res.redirect('back');

            // res.redirect('/question/user_quest')
        }
    })
});
// ------------
// ---------requiement-------

app.use(express.static("./public"))
// body-parser middleware use
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({
    extended: true
}))




//! Use of Multer
var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './routes/uploads/')    
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
var upload = multer({
    storage: storage
});
// upload csv to database
router.post('/upload', upload.single("uploadfile"), (req, res) =>{
    UploadCsvDataToMySQL(__dirname + '/uploads/' + req.file.filename);
    console.log('CSV file data has been uploaded in mysql database ' );
});
router.post('/upload2', upload.single("uploadfile"), (req, res) =>{
    UploadCsvDataToMySQL2(__dirname + '/uploads/' + req.file.filename);
    console.log('CSV file data has been uploaded in mysql database ' );
});
// -----------insert into sql----------

function UploadCsvDataToMySQL(filePath){
let stream = fs.createReadStream(filePath);
let csvData = [];





let csvStream = 
fastcsv.parse().on("data", function(data) {
  csvData.push(data); })
  .on("end", function() { csvData.shift();
    connection.connect(error => {    
        
        

      let query =  "INSERT INTO questions (id, main_question, sub_question, question , question_num, category) VALUES ?";
        connection.query(query, [csvData], (error, response) => {
          console.log(error || response); });
      
    });
  });

  stream.pipe(csvStream); 

}

function UploadCsvDataToMySQL(filePath){
    let stream = fs.createReadStream(filePath);
    let csvData = [];
    
    
    
    
    
    let csvStream = 
    fastcsv.parse().on("data", function(data) {
      csvData.push(data); })
      .on("end", function() { csvData.shift();
        connection.connect(error => {    
            
            
    
          let query =  "INSERT INTO questions1 (id, main_question, sub_question, question , question_num, category) VALUES ?";
            connection.query(query, [csvData], (error, response) => {
              console.log(error || response); });
          
        });
      });
    
      stream.pipe(csvStream); 
    
    }
    





module.exports =router;