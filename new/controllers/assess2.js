const mysql = require("mysql");
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST ,
    user : process.env.DATABASE_USER,
    password : process.env.DATABASE_PASSWORD,
    database : process.env.DATABASE
});

exports.register = (req,res ) => {
  
const answer=req.body;
const id=req.body.id;
// console.log(id)
console.log(answer)




    // var num='SELECT a.num , i.id_ass from answer a , info i ORDER BY a.id_an and i.id_ass   DESC LIMIT 1';
        // db.query(num ,(err, dat)=>{

        
        //  console.log(dat)

    // ids= dat[0].id_ass;
    // num =dat[0].num ;
    // num ++;

// console.log(answer);

 var nan = 0 ;
 var ya =0 ;

 var na = 0 ;
 var min= 0 ;

    for (var key of Object.keys(answer)) {
     if(key != "id"){

       ans = answer[key][0]
       comment = answer[key][1]
       file = answer[key][2]
        idds = answer.id
        // console.log("key  "+key)

        // console.log("answer  "+ans)
        // console.log("comment  "+comment)
        // console.log("file  "+file)
        // console.log("id main  "+idds)
        if(ans== "idk"){
            nan++

        }
        if(ans== "no"){
            na++
            // db.query('UPDATE ans SET  noo=noo + 1 , idkk=idkk - 1  where id_ans = ?  ', [na , idds   ]);

        }
        if(ans== "yes"){
            ya++
            // db.query('UPDATE ans SET yess=yess + 1, idkk=idkk - 1 where id_ans = ?  ', [ya , idds   ]);

        }
    }

     if(ans== "idk"){
        var completed = 0;
    // db.query('INSERT INTO  answer SET ?', {num:num , q1:key , q2:p ,q3:q , comment:comment , file:file ,completed:completed, ids: ids   });
    db.query('UPDATE answer SET q2=?, comment=? , file=? ,  completed=? where q1 =? and ids = ?  ', [ans ,comment,file , completed ,key , idds   ]);
    // {q2:ans ,comment:comment,file:file , completed:completed ,q1:key , ids:idds   }
    }else{

          var completed = 1;
    // db.query('INSERT INTO  answer SET ?', {num:num , q1:key , q2:p ,q3:q , comment:comment , file:file ,completed:completed, ids: ids   });
    db.query('UPDATE answer SET q2=?, comment=? , file=? ,  completed=? where q1 =? and ids = ?  ', [ans ,comment,file , completed ,key , idds   ]);
    // {q2:ans ,comment:comment,file:file , completed:completed ,q1:key , ids:idds   }
    }
}
    // db.query('INSERT INTO ans SET ?',{yess:ya , noo: na  , idkk: nan});
min = ya + na ;
idds = answer.id ;
    // db.query('INSERT INTO ans SET ?',{yess:ya , noo: na  , idkk: nan, id_ans:ids , num_ans:num});ete
    db.query('UPDATE ans SET yess=yess + ?, noo=noo + ? , idkk=idkk - ? where id_ans = ?  ', [ya ,na,min , idds   ]);
console.log(min)
console.log(idds)
// console.log(nan)
// console.log(ya)
// console.log(na)
let data={
    yess : ya,
    noo : na ,
    idk : nan
    
}
// console.log(data)
res.redirect('../question/user_personal_tasks/'+req.user.username);
// });




 




}


        // if(p== "idk"){
        //     nan++
          
        // }
        // if(p== "no"){
        //     na++
          
        // }
        // if(p== "yes"){
        //     ya++
          
        // }

      

// var completed = 0;

// if(p== "idk"){
//     completed = 0;
// }
// if(p== "no"){
//     completed = 1;
// }
// if(p== "yes"){
//     completed = 1;
// }