// const question = {
//     list: `SELECT * FROM question`,
// };



const notif = {
   
 

   
    list: `SELECT * FROM info `,
    notification: (id)=>{
        return `SELECT * FROM notifications  WHERE i.id_ass=${id} and d.id_assess=${id} and  t.id_as=${id}`
    },
  
    count_Notcompleted: (user)=>{
        return ` select  a1.q3 ,a1.ids , count(a2.completed) as nb_nc  , a1.creation_time , TIMESTAMPDIFF(MINUTE,a1.creation_time,(select CURRENT_TIMESTAMP)) as time from answer a1 , answer a2 where a1.q3 = "${user}" and a2.q3 = "${user}" and a2.ids=a1.ids and a1.id_an=a2.id_an  and a2.completed=0  GROUP BY a1.q3 ,a1.ids DESC;`
    },
    alert: (user)=>{
        return ` select  * from mail where sepcific_user= "${user}" `
    }
    ,
    alerts:
        ` select  * from mail where sepcific_user= "all" `
   

    // select  a1.q3 ,a1.ids , count(a2.completed) as nb_nc   from answer a1 , answer a2 where a1.q3 = "${user}" and a2.q3 = "${user}" and a2.ids=a1.ids and a1.id_an=a2.id_an  and a2.completed=0  GROUP BY a1.q3 ,a1.ids
                        
}
module.exports = notif;

