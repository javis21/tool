const admin = {
    list: `SELECT date FROM info
    where info.date!=""
      ORDER BY ID DESC LIMIT 3   `,
    ass_total  : `select COUNT(*) as count from info `
    ,
    member_total  : `select COUNT(*) as count from pros where admin = 0 `
    ,
    admin_total  : `select COUNT(*) as count from pros where admin = 1 `
    ,
    report_total  : `select COUNT(*) as count from info where status = 1 `
    ,
//     ass_finished  : (id)=>{
//       return `select COUNT(*) as count from info where created_by="${id}" and status="1"`
//   },
//   ass_missing  : (id)=>{
//     return `select COUNT(*) as count from info where created_by="${id}" and status="0"`
// },
//   total_tasks  : (id)=>{
//     return `select count(*) as count from answer where q3="${id}"
//     `
// }
// ,
//   total_answered  : (id)=>{
//     return `select count(*) as count  from answer where q3="${id}"  and completed = 1
//     `
// },
// total_missing  : (id)=>{
//   return `select count(*) as count  from answer where q3="${id}"  and completed = 1
//   `
// }
// ,
categories  : `select count(DISTINCT sub) as count from answer `
,
total_protected : `SELECT SUM(protect) as sum from demo `,
total_tasks  : `select count(*) as count from answer where q2="yes" or  q2="no" or q2="idk"  `
,
total_yes  : `select count(*) as count from answer where q2="yes" `
,
total_no: `select count(*) as count from answer where q2="no" ` ,

ass_date : `SELECT DATE_FORMAT(creation_time, '%Y-%m-%d') as date,COUNT(*) as count 
FROM answer 
where creation_time != "" and date(creation_time)  != ""
GROUP BY date(creation_time) 
ORDER BY count DESC `
  
,ass_date_filled : `SELECT DATE_FORMAT(creation_time, '%Y-%m-%d') as date,COUNT(*) as count 
FROM answer 
where creation_time != "" and date(creation_time)  != "" and (q2 = "no" or q2 = "yes" )
GROUP BY date(creation_time) 
ORDER BY count DESC `
  

// ,
// ass_date : `SELECT DATE_FORMAT(creation_time, '%Y-%m-%d') as date,COUNT(*) as count 
// FROM answer 
// where creation_time != "" and date(creation_time)  != ""
// GROUP BY date(creation_time) 
// ORDER BY count DESC `
  
 }

    module.exports = admin;
    