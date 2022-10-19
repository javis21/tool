const page1 = {
    list: `SELECT date FROM info
    where info.date!=""
      ORDER BY ID DESC LIMIT 3   `,
    ass_total : (id)=>{
        return `select COUNT(*) as count from info where created_by="${id}"`
    },
    ass_finished  : (id)=>{
      return `select COUNT(*) as count from info where created_by="${id}" and status="1"`
  },
  ass_missing  : (id)=>{
    return `select COUNT(*) as count from info where created_by="${id}" and status="0"`
},
  total_tasks  : (id)=>{
    return `select count(*) as count from answer where q3="${id}"
    `
}
,
  total_answered  : (id)=>{
    return `select count(*) as count  from answer where q3="${id}"  and completed = 1
    `
},
total_missing  : (id)=>{
  return `select count(*) as count  from answer where q3="${id}"  and completed = 1
  `
}
,
categories : `select count(DISTINCT sub) as count from answer `
,
ass_date : `SELECT DATE_FORMAT(creation_time, '%Y-%m-%d') as date,COUNT(*) as count 
FROM answer 
where creation_time != "" and date(creation_time)  != ""
GROUP BY date(creation_time) 
ORDER BY count DESC `
  


 }

    module.exports = page1;
    