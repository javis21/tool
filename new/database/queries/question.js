// const question = {
//     list: `SELECT * FROM question`,
// };



const question = {
    questions: (id)=>{
        return `SELECT * FROM questions1 WHERE category='${id}'`
    },
    listNist: `SELECT * FROM questions2 `,
    listUsers: `SELECT * FROM pros `,
    questionNist: (id)=>{
        return `SELECT * FROM questions2 WHERE questions2.id=${id}`
    },
    editNist: (data)=>{
        console.log(data);

        return `UPDATE questions2 SET 
        main_question='${data.main_question}',
        sub_question='${data.sub_question}',
        question='${data.question}',
        question_num='${data.question_num}',
        category='${data.category}'
        
        WHERE questions2.id=${data.id}`
    },

    deleteNist: (id)=>{
        return `DELETE FROM questions2  WHERE questions2.id=${id}`
    },

    addNist: (data)=>{
        return `INSERT INTO questions2
        (  id,main_question,sub_question,question,question_num,category) VALUES
        (NULL, '${data.main_question}', '${data.sub_question}', '${data.question}', '${data.question_num}', '${data.category}')`
    },

    list: `SELECT * FROM questions `,
    question: (id)=>{
        return `SELECT * FROM questions WHERE questions.id=${id}`
    },

    question2: (id)=>{
        return `SELECT * FROM questions2 WHERE questions2.id=${id}`
    },
    user: (id)=>{
        return `SELECT * FROM pros WHERE pros.id=${id}`
    },
    user_list:`SELECT fullname FROM pros where admin=0 `,





    edit: (data)=>{
        console.log(data);

        return `UPDATE questions SET 
        main_question='${data.main_question}',
        sub_question='${data.sub_question}',
        question='${data.question}',
        question_num='${data.question_num}',
        category='${data.category}'
        
        WHERE questions.id=${data.id}`
    },


    edit2: (data)=>{
        console.log(data);

        return `UPDATE questions2 SET 
        main_question='${data.main_question}',
        sub_question='${data.sub_question}',
        question='${data.question}',
        question_num='${data.question_num}',
        category='${data.category}'
        
        WHERE questions2.id=${data.id}`
    },

    

    edit3: (data,pass)=>{
        console.log(data);
        return `UPDATE pros SET 
        username='${data.username}',
        password='${pass}',

        fullname='${data.fullname}',
        mail='${data.mail}',
        phone='${data.phone}',
        adress='${data.adress}'
        
        WHERE pros.id=${data.id}`
    },

    delete: (id)=>{
        return `DELETE FROM questions  WHERE questions.id=${id}`
    },

    delete2: (id)=>{
        return `DELETE FROM questions2  WHERE questions2.id=${id}`
    },

    delete3: (id)=>{
        return `DELETE FROM pros  WHERE pros.id=${id}`
    },
    
    give_admin: (id)=>{
        return `update  pros  set admin='1' WHERE pros.id=${id}`
    },
    revoke_admin: (id)=>{
        return `update  pros  set admin='0' WHERE pros.id=${id}`
    },

    add: (data)=>{
        return `INSERT INTO questions1
        (  id,main_question,sub_question,question,question_num,category) VALUES
        (NULL, '${data.main_question}', '${data.sub_question}', '${data.question}', '${data.question_num}', '${data.category}')`
    },

    add2: (data)=>{
        return `INSERT INTO questions2
        (  id,main_question,sub_question,question,question_num,category) VALUES
        (NULL, '${data.main_question}', '${data.sub_question}', '${data.question}', '${data.question_num}', '${data.category}')`
    },
    

    add3: (data)=>{
        return `INSERT INTO pros
        (  id,username,fullname,password,mail,phone, adress) VALUES
        (NULL, '${data.username}', '${data.fullname}', '${data.password}', '${data.mail}', '${data.phone}', '${data.adress}')`
    }
    ,

    ass: (id)=>{
        return `select  DISTINCT q3 ,ids from answer where q3= "${id}"`
    },
    user_quest: (id,user)=>{
        return `select * from answer where q3= "${user}" and ids =${id} `
    },
    
    finished: (id)=>{
        return `update  answer  set completed='1' WHERE id_an=${id}`
    },
    Notfinished: (id)=>{
        return `update  answer  set completed='0' WHERE id_an=${id}`
    },
    count_completed: (user)=>{
        return ` select  a1.q3 ,a1.ids , count(a2.completed) as nb_c   from answer a1 , answer a2 where a1.q3 = "${user}" and a2.q3 = "${user}" and a2.ids=a1.ids and a1.id_an=a2.id_an  and a2.completed=1  GROUP BY a1.q3 ,a1.ids`
    },
    
    count_Notcompleted: (user)=>{
        return ` select  a1.q3 ,a1.ids , count(a2.completed) as nb_nc   from answer a1 , answer a2 where a1.q3 = "${user}" and a2.q3 = "${user}" and a2.ids=a1.ids and a1.id_an=a2.id_an  and a2.completed=0  GROUP BY a1.q3 ,a1.ids`
    },
    
     
    
    count_all: (user)=>{
        return ` select  a1.q3 ,a1.ids , count(a2.completed) as nb_all from answer a1 , answer a2 where a1.q3 = "${user}" and a2.q3 = "${user}" and a2.ids=a1.ids and a1.id_an=a2.id_an   GROUP BY a1.q3 ,a1.ids`
    },
    finish_tasks : (id,user)=>{
        return ` SELECT * FROM questions WHERE question_num in (select q1 from answer where q3 ="${user}"  and ids = ${id} and completed= 0 )`
    },
    report : (id)=>{
        return ` SELECT * FROM ans where  id_ans = ${id}  `
    },
    category: `SELECT DISTINCT category FROM questions1  where category!= "category" and  category!= "" `

}
module.exports = question;



