const mysql = require("mysql");
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST ,
    user : process.env.DATABASE_USER,
    password : process.env.DATABASE_PASSWORD,
    database : process.env.DATABASE
});

exports.alert = (req,res ) => {
    // console.log("body");

    // console.log(req.body);
    const {sender,sepcific_user,subject,message} = req.body;

    // console.log(as);
    console.log(req.body);
    db.query('INSERT INTO mail SET creation_time = CURRENT_Time(), ? ', {user:sender , sepcific_user:sepcific_user, subject:subject ,message:message });
    res.redirect('../profile');

  

}

