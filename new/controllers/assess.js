const mysql = require("mysql");
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST ,
    user : process.env.DATABASE_USER,
    password : process.env.DATABASE_PASSWORD,
    database : process.env.DATABASE
});

exports.register = (req,res ) => {
    // console.log(req.body);
    

//     const {    noo ,yess, idkk   } = req.body;


//     db.query('INSERT INTO ans SET ?',{noo:noo , yess: yess  , idkk: idkk},(error,results)=>{

//     if (error){
//         console.log(error);

//     }else {
      
//     }
// });

// -----------
// const answer= req.body;


// db.query('INSERT INTO ans SET ?',answer,(error,results)=>{

// if (error){

// }else {
  
// }
// });




// inserting  answers into db with users
  
const answer=req.body;
console.log(answer);


// db.query('INSERT INTO answer SET ?',answer,(error,results)=>{
    // db.query('SELECT a.num , i.id_ass from answer a , info i ORDER BY ID  DESC LIMIT 1' ,(err, result)=>{
    //     if(err){
    //         console.log(result[2])
    //     }else{
    //         console.log("-------------------------------- here")

    //         console.log(result.num)

    //     }
    // });
   
        // const list= `SELECT num FROM answer    ORDER BY ID DESC LIMIT 3   `;
        // var id_ass= 'select id_ass from info ORDER BY `id_ass` DESC LIMIT 1';
        // queries.listNist + '; '+ queries.list, [1,2],
    var num='SELECT a.num , i.id_ass from answer a , info i ORDER BY a.id_an and i.id_ass   DESC LIMIT 1';
        db.query(num ,(err, dat)=>{

            //  console.log(result.num[1]);

        //  console.log(dat[0].num);
        //  console.log("here");

        //  console.log(dat[1].id_ass);

        //  console.log(dat[1])

        //  console.log(dat[1])
        //  console.log(dat[2])
         console.log(dat)

    ids= dat[0].id_ass;
    num =dat[0].num ;
    num ++;

console.log(num);
// console.log(list);
// console.log(dat);

 // answer vars 
 var nan = 0 ;
 var ya =0 ;

 var na = 0 ;

    for (var key of Object.keys(answer)) {
        // counter to  q = answer[key][1]
       

        // getting objects from body
       p = answer[key][0]
       q = answer[key][1]
       comment = answer[key][2]
        file = answer[key][3]
        sub = answer[key][4]

        console.log(p)
        if(p== "idk"){
            nan++
          
        }
        if(p== "no"){
            na++
          
        }
        if(p== "yes"){
            ya++
          
        }

        // var id_ass='select id_ass from info ORDER BY `id_ass` DESC LIMIT 1';
        // db.query(id_ass, function (err, dat, fields) {
         
           
           
            //  console.log(dat[0].id_ass);
        
            // //  ids =dat[0].id_ass ;
    
            //  console.log("answer list "+ p +q +key + comment + file  );
            //  console.log("answers "+ answer  );

// -------------- completed conditions

var completed = 0;

if(p== "idk"){
    completed = 0;
}
if(p== "no"){
    completed = 1;
}
if(p== "yes"){
    completed = 1;
}

    db.query('INSERT INTO answer SET creation_time = CURRENT_TIMESTAMP() , ?', {num:num , q1:key , q2:p ,q3:q , comment:comment , file:file ,completed:completed, ids: ids ,sub:sub });
// });

    }
console.log("ids"+ids)
    db.query('INSERT INTO ans SET ?',{yess:ya , noo: na  , idkk: nan, id_ans:ids , num_ans:num});

console.log(nan)
console.log(ya)
console.log(na)
let data={
    yess : ya,
    noo : na ,
    idk : nan
    
}
console.log(data)
res.redirect('../profile');
// res.render('page5', {  data: data});
});

// });
// var sql='SELECT yess,noo,idkk FROM ans ORDER BY ID DESC LIMIT 1';
//     db.query(sql, function (err, data, fields) {
//     if (err) throw err;
//     // req.app.locals.layout = 'base'; 

//     res.render('page5', {  data: data});

//   });
 


 




}

