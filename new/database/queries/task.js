// const question = {
//     list: `SELECT * FROM question`,
// };



const task = {
   
 

   
    list: `SELECT * FROM info `,
    user: (id)=>{
        return `SELECT * FROM info i ,demo d , type t  WHERE i.id_ass=${id} and d.id_assess=${id} and  t.id_as=${id}`
    },




    edit1: (data)=>{
        console.log(data);
        // title date company city state created_by 

        return `UPDATE info  SET 
        title='${data.title}',
        date='${data.date}',
        company='${data.company}',
        city='${data.city}',
        state='${data.state}',
        created_by='${data.created_by}'
        
        
        WHERE id_ass=${data.id_ass}  `
        
    },
    edit2: (data)=>{
        console.log(data);
        // title date company city state created_by 

        return `UPDATE  demo SET 
       
        sector='${data.sector}',
        industry='${data.industry}',
        protect='${data.protect}',
        effort='${data.effort}',
        org='${data.org}',
        unit='${data.unit}',
        type='${data.type}'
        
        
        WHERE  
         id_assess=${data.id_ass} `
        
    },
    edit3: (data)=>{
        console.log(data);
        // title date company city state created_by 

        return `UPDATE  type  SET 
      
        id_types='${data.id_types}',
        types='${data.types}'
        
        WHERE
         id_as =${data.id_ass} `
        
    },


  
    

  
    delete3: (id)=>{
        return `DELETE FROM info   WHERE id_ass=${id} `
    },
    delete2: (id)=>{
        return `DELETE FROM  demo  WHERE id_assess=${id}`
    },

    delete1: (id)=>{
        return `DELETE  FROM type  WHERE id_as =${id} `
    },


   

    finish: (id)=>{
        return `update  info  set status='0' WHERE info.id_ass=${id}`
    },
    missing: (id)=>{
        return `update  info  set status='1' WHERE info.id_ass=${id}`
    },
    

    add: (data)=>{
        return `INSERT INTO questions
        (  id,main_question,sub_question,question,question_num,category) VALUES
        (NULL, '${data.main_question}', '${data.sub_question}', '${data.question}', '${data.question_num}', '${data.category}')`
    },
    team: (id)=>{
        return `SELECT * FROM pros p  , info i   WHERE i.id_ass=${id} and p.username=i.created_by  `
    },
    members    : (id)=>{
        return `SELECT DISTINCT  id,username , fullname , mail,ids FROM pros p  , answer a   WHERE a.ids=${id} and p.username=a.q3  `
    },
    question    : (id)=>{
        return `SELECT  * FROM answer   WHERE ids=${id}  `
    },
    question1    : (username,id)=>{
        return `SELECT  * FROM answer   WHERE q3='${username} ' and ids =${id}   `

    }
    

    
                        
}
module.exports = task;

