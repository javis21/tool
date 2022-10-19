const mysql = require("mysql");
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST ,
    user : process.env.DATABASE_USER,
    password : process.env.DATABASE_PASSWORD,
    database : process.env.DATABASE
});

exports.register = (req,res ) => {
    // console.log("body");

    // console.log(req.body);
    
    const as = req.body.candidate ;
    // console.log(as);
    console.log(req.body);

    // res.send(req.body.as);

    
    var id_ass='select id_ass from info ORDER BY `id_ass` DESC LIMIT 1';
    db.query(id_ass, function (err, dat, fields) {
     
       
       
         console.log(dat[0].id_ass);
    
         id_ass =dat[0].id_ass ;



db.query('INSERT INTO type SET ?',{ types:as,id_as:id_ass},(error,results)=>{
    console.log("as here ");

    console.log(as);

    // if (as = "nist"){
    //     res.redirect('../page41');

    // }
    // else if (as = "iso"){
    //     res.redirect('../page42');

    // }
    // else if (as = "cmmc"){
    //     res.redirect('../page43');

    // }
    // else {
    //      console.log("errror");

    // }
    //         res.redirect('../page43');
//     if (req.body.candidate == 'nist') {
//         res.redirect('../page41');
// }
//     else if (req.body.candidate == 'iso') {
//         res.redirect('../page42');
// }
//     else if (req.body.candidate == 'cmmc') {
    console.log(req.body.candidate)
        res.redirect('../page43/'+req.body.candidate);
// }


});

});











}

