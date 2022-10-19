



const report = {

    report : (id)=>{
        return ` SELECT * FROM ans where  id_ans = ${id}  `
    },
    report_bars: (id)=>{
        return ` SELECT sub,COUNT(*) as count 
        FROM answer 
        where ids = ${id}  and q2 = "yes"
        GROUP BY sub
        ORDER BY COUNT(*) DESC
        LIMIT 4`
    }
    ,
    report_bars_vul: (id)=>{
        return ` SELECT sub,COUNT(*) as count 
        FROM answer 
        where ids = ${id}  and q2 = "no"
        GROUP BY sub
        ORDER BY COUNT(*) DESC
        LIMIT 4 `
    },
    date: `SELECT CURDATE() as date `,
    company: (id)=>{
        return ` select * from  info where  id_ass = ${id}`
    },
    creator: (id)=>{
        return ` select * from  pros where username=(select created_by from  info where  id_ass = ${id}  )`
    },
    ass_name: (id)=>{
        return ` select title from  info where  id_ass = ${id} `
    },
    industry: (id)=>{
        return ` select * from  demo where  id_assess = ${id} `
    },
    report_bars_full: (id)=>{
        return ` SELECT sub,COUNT(*) as count 
        FROM answer 
        where ids = ${id}  and q2 = "yes"
        GROUP BY sub
        ORDER BY COUNT(*) DESC`
    }
    ,
    report_bars_vul_full : (id)=>{
            return ` SELECT sub,COUNT(*) as count 
            FROM answer 
            where ids = ${id}  and q2 = "no"
            GROUP BY sub
            ORDER BY COUNT(*) DESC`
    },
    report_full : (id)=>{
        return ` SELECT sub,COUNT(*) as count 
        FROM answer 
        where ids = ${id}  
        GROUP BY sub
        ORDER BY COUNT(*) DESC`
},
}
module.exports = report;

