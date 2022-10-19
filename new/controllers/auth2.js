const mysql = require("mysql");
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST ,
    user : process.env.DATABASE_USER,
    password : process.env.DATABASE_PASSWORD,
    database : process.env.DATABASE
});

exports.register = (req,res ) => {
    console.log("ji");

    console.log(req.body);
    console.log("ji");


    const {sector,industry,protect,effort,org,unit,type} = req.body;

    
    var id_ass='select id_ass from info ORDER BY `id_ass` DESC LIMIT 1';
    db.query(id_ass, function (err, dat, fields) {
     
       
       
        //  console.log(dat[0].id_ass);
        //  console.log(req.body);

    
         id_ass =dat[0].id_ass ;



db.query('INSERT INTO demo SET ?',{ sector: sector , industry: industry ,protect : protect ,effort : effort , org: org , unit: unit ,type:type,id_assess:id_ass},(error,results)=>{

    if (error){
        console.log(error);

    }else {

        res.redirect('../page3');

    }
});

});
}

