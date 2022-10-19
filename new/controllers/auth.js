const mysql = require("mysql");
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST ,
    user : process.env.DATABASE_USER,
    password : process.env.DATABASE_PASSWORD,
    database : process.env.DATABASE
});

exports.register = (req,res ) => {
    console.log(req.body);


    const {    title ,date, company ,city ,state    } = req.body;
     user = req.user.username ; 

    db.query('INSERT INTO info SET created_at = CURRENT_Time(), ?',{title: title , date: date  , company: company , city: city , state: state ,created_by:user},(error,results)=>{

    if (error){
        console.log(error);

    }else {
 
        res.redirect('../page31');

    }
})


}

