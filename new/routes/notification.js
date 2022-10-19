let router = require('express').Router();
let connection = require('../database/conn');
let queries = require('../database/queries/notif');
const { isLoggedIn } = require('../lib/auth');


// router.post('/register',authController.register)

router.get('/bi',isLoggedIn, (req, res,next)=>{
    connection.query(queries.count_Notcompleted("user1"),(err, result)=>{
        // connection.query(queries.notification, '; '+ queries.count_Notcompleted(req.user.username),(err, result)=>{

        // if(err){
        //     // console.log(err)
        // }else{
            // console.log(result)
            console.log(result)

            // req.app.locals.layout = 'base'; 
            // ,layout: false
            res.render('partials/topbar',{notifs: result });
            // res.render('partials/topbar');

        // }

    })
});



// router.get('/user_personal_tasks/:id',isLoggedIn, (req, res)=>{
//     connection.query(queries.count_all(req.params.id) + '; '+ queries. count_completed(req.params.id) + '; '+ queries.count_Notcompleted(req.params.id),(err, result)=>{
//         // connection.query(queries.count_completed(req.body.ids,req.body.q3)  + '; '+ queries.count_all(req.body.ids,req.body.q3),(err, data)=>{

//         if(err){
//             console.log(err)
//         }else{

//             // const merged = mergePackages(packages);
//             /**
//              * Function that merges packages into 1 dictionary.
//              * @param packages Packages that should be merged.
//              * @returns Merged packages.
//              */
//             function mergePackages(packages) {
//                 /**
//                  * Variable that contains the merged packages.
//                  */
//                 const mergedPackages = {};
//                 // outer loop
//                 for (let i = 0; i < packages.length; ++i) {
//                     // get the array containing the packages
//                     const packagesArr = packages[i];
//                     // inner loop
//                     // console.log(packages[i])

//                     for (let j = 0; j < packagesArr.length; ++j) {
//                         // get package
//                         // console.log(packages[i][j])

//                         const instance = packagesArr[j];
//                         // get the merged package if it exists
//                         const mergedInstance = mergedPackages[instance.ids];
//                         // check for existence
//                         if (mergedInstance) {
//                             var1 =  mergedInstance.nb_all ;
//                             var2 =  mergedInstance.nb_nc ;
//                             if (instance.nb_all)
//                                 mergedInstance.nb_all = instance.nb_all;
//                                 // condition about answered questions 
//                             if (instance.nb_c){
//                                 mergedInstance.nb_c = instance.nb_c;
//                             //    console.log(   mergedInstance.nb_c)
//                             //    console.log(   instance.nb_c)
                             
//                             }
//                             if (mergedInstance.nb_c == null){
//                                 mergedInstance.nb_c = 0;
                           
                             
//                             }
//                             if (instance.nb_nc){
//                                 mergedInstance.nb_nc = instance.nb_nc;
//                                 mergedInstance.nb= 0;
//                                 console.log(mergedInstance.nb)
//                                 // var   idies = packagesArr[j].ids
//                                 // console.log(idies)
//                             }
//                                 else {
//                                     mergedInstance.nb_nc = 0
//                                     mergedInstance.nb= 1
//                                     console.log(mergedInstance.nb)
//                                  var   idies = packagesArr[j].ids
//                                  if(req.user.admin){
//                                     console.log(req.user.admin)

//                                     console.log(req.user.username)
//                                     db.query(' UPDATE info SET status= 1 WHERE id_ass= ?  ', [idies]);
//                                 }


//                                 }
//                             // if(var1 - instance.nb_nc){
//                             //     mergedInstance.nb=0 

//                             // }
                            
//                             //      else {
//                             //         console.log(var1 - instance.nb_nc)

//                             //         mergedInstance.nb=1                                 }

//                             // if(var1 - instance.nb_nc)
//                         }
//                         else {
//                             mergedPackages[instance.ids] = { ...instance };
//                         }
//                     }
//                 }
//                 // returning the merged packages
//                 return mergedPackages;
//             }
//           data =  mergePackages(result)
//         //   console.log(data[91].nb)

//             // console.log(data)
//             // console.log(result[0][1])



//             // ,{ title: 'my other page', layout: 'base' }
//             res.render('templates/user_tasks',{question: data , title: 'my other page', layout: 'base' });



//         }
//     // })

//     })
// });


module.exports = router ; 