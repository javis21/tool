let router = require('express').Router();
let connection = require('../database/conn');
let queries = require('../database/queries/task');
let querie_question = require('../database/queries/question');

const { isLoggedIn } = require('../lib/auth');
// const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');

// -----
const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const multer = require('multer')
const path = require('path')
const fs = require("fs");
const mysql = require("mysql");
const fastcsv = require("fast-csv");
// ----- ecryption
const bcrypt = require('bcryptjs');
const helpers = require('../lib/helpers');



router.get('/user_personal_tasks/:id',isLoggedIn, (req, res)=>{
    connection.query(queries.count_all(req.params.id) + '; '+ queries. count_completed(req.params.id) + '; '+ queries.count_Notcompleted(req.params.id),(err, result)=>{
        // connection.query(queries.count_completed(req.body.ids,req.body.q3)  + '; '+ queries.count_all(req.body.ids,req.body.q3),(err, data)=>{

        if(err){
            console.log(err)
        }else{
            console.log(result)

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
                            }
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
        //   console.log(data[91].nb)

            // console.log(data)
            // console.log(result[0][1])



            // ,{ title: 'my other page', layout: 'base' }
            res.render('templates/user_tasks',{question: data , title: 'my other page', layout: 'base' });



        }
    // })

    })
});

router.get('/task',isLoggedIn, (req, res)=>{
   
    connection.query(queries.list,(err, result)=>{
        if(err){
            console.log(err)
        }else{
           

console.log(result.id_ass)
                   
            // connection.query(querie_question.count_all(req.params.id) + '; '+ queries. count_completed(req.params.id) + '; '+ queries.count_Notcompleted(req.params.id),(err, result)=>{
            //     // connection.query(queries.count_completed(req.body.ids,req.body.q3)  + '; '+ queries.count_all(req.body.ids,req.body.q3),(err, data)=>{
        
            //     if(err){
            //         console.log(err)
            //     }else{
            //         console.log(result)
        
            //         // const merged = mergePackages(packages);
            //         /**
            //          * Function that merges packages into 1 dictionary.
            //          * @param packages Packages that should be merged.
            //          * @returns Merged packages.
            //          */
            //         function mergePackages(packages) {
            //             /**
            //              * Variable that contains the merged packages.
            //              */
            //             const mergedPackages = {};
            //             // outer loop
            //             for (let i = 0; i < packages.length; ++i) {
            //                 // get the array containing the packages
            //                 const packagesArr = packages[i];
            //                 // inner loop
            //                 // console.log(packages[i])
        
            //                 for (let j = 0; j < packagesArr.length; ++j) {
            //                     // get package
            //                     // console.log(packages[i][j])
        
            //                     const instance = packagesArr[j];
            //                     // get the merged package if it exists
            //                     const mergedInstance = mergedPackages[instance.ids];
            //                     // check for existence
            //                     if (mergedInstance) {
            //                         var1 =  mergedInstance.nb_all ;
            //                         var2 =  mergedInstance.nb_nc ;
            //                         if (instance.nb_all)
            //                             mergedInstance.nb_all = instance.nb_all;
            //                             // condition about answered questions 
            //                         if (instance.nb_c){
            //                             mergedInstance.nb_c = instance.nb_c;
            //                         //    console.log(   mergedInstance.nb_c)
            //                         //    console.log(   instance.nb_c)
                                     
            //                         }
            //                         if (mergedInstance.nb_c == null){
            //                             mergedInstance.nb_c = 0;
                                   
                                     
            //                         }
            //                         if (instance.nb_nc){
            //                             mergedInstance.nb_nc = instance.nb_nc;
            //                             mergedInstance.nb= 0;
            //                         }
            //                             else {
            //                                 mergedInstance.nb_nc = 0
            //                                 mergedInstance.nb= 1
            //                             }
            //                         // if(var1 - instance.nb_nc){
            //                         //     mergedInstance.nb=0 
        
            //                         // }
                                    
            //                         //      else {
            //                         //         console.log(var1 - instance.nb_nc)
        
            //                         //         mergedInstance.nb=1                                 }
        
            //                         // if(var1 - instance.nb_nc)
            //                     }
            //                     else {
            //                         mergedPackages[instance.ids] = { ...instance };
            //                     }
            //                 }
            //             }
            //             // returning the merged packages
            //             return mergedPackages;
            //         }
            //       data =  mergePackages(result)
            //     //   console.log(data[91].nb)
        
            //         // console.log(data)
            //         // console.log(result[0][1])
        
        
        
            //         // ,{ title: 'my other page', layout: 'base' }
            //         res.render('templates/user_tasks',{question: data , title: 'my other page', layout: 'base' });
        
        
        
            //     }
            // // })
        
            // })











            req.app.locals.layout = 'main'; 

            res.render('tasks/task',{task: result});
        }
    })
});
// router.get('/task',isLoggedIn, (req, res)=>{
//     connection.query(queries.listNist + '; '+ queries.list, [1,2],(err, result)=>{
//         if(err){
//             console.log(result[2])
//         }else{
//             req.app.locals.layout = 'main'; 
//             console.log(result[1])
//             res.render('templates/question',{question: result[0] , question2 : result[1]});

//         }
//     })
   
// });


router.get('/edit3/:id',isLoggedIn, (req, res)=>{
    connection.query(queries.user(req.params.id),(err, result)=>{
        if(err){
            console.log(err)
        }else{
            // req.app.locals.layout = 'base'; 
            // ,layout: false
            res.render('tasks/edit',{task: result });
        }
    })
});





router.post('/edit3/:id',isLoggedIn, (req, res)=>{
    // idname: req.params.idname,
    let data={                      
        // title date company city state create_by 

        id_ass: req.body.id_ass,
        title: req.body.title,
        date: req.body.date,
        company: req.body.company,
        city: req.body.city,
        state: req.body.state,
        created_by: req.body.created_by,

        id_demo: req.body.id_demo,
        sector: req.body.sector,
        industry: req.body.industry,
        protect: req.body.protect,
        effort: req.body.effort,
        org: req.body.org,
        unit: req.body.unit,
        type: req.body.type,

        id_types: req.body.id_types,
        types: req.body.types,

        

        
    }
    console.log(data)

    connection.query(queries.edit1(data)+ '; '+ queries.edit2(data)+ '; '+ queries.edit3(data),(err, result)=>{
        if(err){
            console.log(err)
        }else{
            req.app.locals.layout = 'main'; 

            res.redirect('/assessments/task')
        }
    })
});

// router.get('/cmmc',isLoggedIn, (req, res)=>{
//     connection.query(queries.listNist + '; '+ queries.list, [1,2],(err, result)=>{
//         if(err){
//             console.log(result[2])
//         }else{
//             req.app.locals.layout = 'main'; 
//             console.log(result[1])
//             res.render('templates/question',{question: result[0] , question2 : result[1]});

//         }
//     })
   
// });





router.get('/delete3/:id',isLoggedIn, (req, res)=>{
    console.log(req.params.id);
    connection.query(queries.delete1(req.params.id) + '; ' + queries.delete2(req.params.id)+ '; ' + queries.delete3(req.params.id),(err, result)=>{
        if(err){
            console.log(err)
        }else{
            req.app.locals.layout = 'main'; 

            res.redirect('/assessments/task')
        }
    })
});
// set as finished 
router.get('/finish/:id',isLoggedIn, (req, res)=>{
    connection.query(queries.finish(req.params.id),(err, result)=>{
        if(err){
            console.log(err)
        }else{
            req.app.locals.layout = 'main'; 

            res.redirect('/assessments/task')
        }
    })
});
// set as missing

router.get('/missing/:id',isLoggedIn, (req, res)=>{
    connection.query(queries.missing(req.params.id),(err, result)=>{
        if(err){
            console.log(err)
        }else{
            
            req.app.locals.layout = 'main'; 

            res.redirect('/assessments/task')
        }
    })
});
// router.get('/cmmc',isLoggedIn, (req, res)=>{
//     connection.query(queries.listNist + '; '+ queries.list,(err, result)=>{
//         if(err){
//             console.log(result[2])
//         }else{
//             console.log("-------------------------------- here")

//             req.app.locals.layout = 'main'; 
//             console.log(result)
//             res.render('templates/question',{question: result[0] , question2 : result[1]});

//         }
//     })
   
// });
router.get('/view/:id',isLoggedIn, (req, res)=>{
    connection.query(queries.team(req.params.id) + '; '+queries.members(req.params.id),(err, result)=>{
        if(err){
            console.log(err)
        }else{
            // console.log(result);

            // req.app.locals.layout = 'base'; 
            // ,layout: false
            console.log(result)

            res.render('tasks/team',{team: result[0] , memebers : result[1]});
        }
    })
});


router.get('/question/:id',isLoggedIn, (req, res)=>{
    connection.query(queries.question(req.params.id),(err, result)=>{
        if(err){
            console.log(err)
        }else{
            // req.app.locals.layout = 'base'; 
            // ,layout: false
            res.render('tasks/question',{question: result });
        }
    })
});
router.get('/question1/:id/:id1',isLoggedIn, (req, res)=>{
    connection.query(queries.question1(req.params.id,req.params.id1),(err, result)=>{
        if(err){
            console.log(err)
        }else{
            console.log(  "id"+ req.params.id)
            console.log(  "id2 "+ req.params.id1)
          


         
            // req.app.locals.layout = 'base'; 
            // ,layout: false
            res.render('tasks/question',{question: result });
        }
    })
});

// ------------

// ---------requiement-------





    





module.exports =router;