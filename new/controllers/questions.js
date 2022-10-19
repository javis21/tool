const mysql = require("mysql");
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST ,
    user : process.env.DATABASE_USER,
    password : process.env.DATABASE_PASSWORD,
    database : process.env.DATABASE
});

exports.category = (req,res ) => {
    // console.log("body");

    // console.log(req.body);
    
    const as = req.body.candidate ;
    // console.log(as);
    console.log(req.body);

    // res.send(req.body.as);

    
     

    console.log(req.body.candidate)
        res.redirect('../question/'+req.body.candidate);
// }














}

